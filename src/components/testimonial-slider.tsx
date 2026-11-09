"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/content/site";
import { home } from "@/content/site";
import { ArrowRight } from "./icons";

const items = home.testimonials;
const AUTOPLAY_MS = 7000;

/** Quote slider: portrait on a textured offset block, quote inside a corner-marked frame. */
export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);
  const n = items.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + n) % n), [n]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current && document.visibilityState === "visible") go(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [go]);

  // swipe
  const startX = useRef<number | null>(null);

  return (
    <section
      className="testimonials relative overflow-hidden bg-[#54602f] pb-32 pt-20 text-[#f4ede6] md:pb-44 md:pt-28"
      aria-roledescription="carousel"
      aria-label="What vets, farmers and owners say"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >

      <div className="container-x relative text-center">
        <p className="eyebrow text-[#c9d3a8]">{home.testimonialsIntro.eyebrow}</p>
        <h2 className="font-display mx-auto mt-4 max-w-[26ch] text-[clamp(2rem,3.8vw,3.6rem)] leading-[0.98]">{home.testimonialsIntro.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-[#f4ede6]/75">{home.testimonialsIntro.body}</p>
      </div>

      <div className="container-x relative mt-14 grid items-center gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
        {/* Portrait */}
        <div className="relative lg:col-span-5">
          <div aria-hidden="true" className="absolute -left-[var(--gutter)] bottom-[-8%] h-[58%] w-[62%] overflow-hidden">
            <Image src="/images/kibble.jpg" alt="" fill sizes="30vw" className="scale-125 object-cover saturate-[1.15]" />
          </div>
          <div className="relative ml-[12%] aspect-[4/5] overflow-hidden bg-forest">
            {items.map((t, i) => (
              <TestimonialVideo key={t.name} item={t} active={i === index} />
            ))}
          </div>
        </div>

        {/* Quote frame */}
        <div className="corners relative flex min-h-[380px] flex-col justify-between p-6 md:min-h-[440px] md:p-12 lg:col-span-7" style={{ ["--corner" as string]: "#f4ede6" }}>
          <div className="relative grid">
            {items.map((t, i) => (
              <blockquote
                key={t.name}
                aria-hidden={i !== index}
                className={`col-start-1 row-start-1 transition-[opacity,transform] duration-700 ease-out ${i === index ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
              >
                <p className="text-[clamp(1.25rem,2.1vw,1.9rem)] font-medium leading-[1.3] tracking-[-0.015em]">{t.quote}</p>
              </blockquote>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <div className="relative grid">
              {items.map((t, i) => (
                <div key={t.name} aria-hidden={i !== index} className={`col-start-1 row-start-1 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#f4ede6]/60">{t.role}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] font-semibold tabular-nums tracking-[0.12em] text-[#f4ede6]/70" aria-live="polite">
                {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="btn btn-light size-12 !p-0">
                <ArrowRight className="size-4 rotate-180" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="btn btn-light size-12 !p-0">
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* progress bars */}
          <div className="mt-6 flex gap-2" aria-hidden="true">
            {items.map((t, i) => (
              <span key={t.name} className="h-px flex-1 bg-[#f4ede6]/20">
                <span key={i === index ? `on-${index}` : "off"} className={`testimonial-bar block h-full bg-[#f4ede6] ${i === index ? "is-active" : i < index ? "w-full" : "w-0"}`} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Only the active clip plays; the others pause and fade out. Poster shows while loading / with reduced motion. */
function TestimonialVideo({ item, active }: { item: Testimonial; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (active && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);
  return (
    <video
      ref={ref}
      src={item.video}
      poster={item.poster}
      muted
      loop
      playsInline
      preload={active ? "auto" : "metadata"}
      aria-label={item.alt}
      aria-hidden={!active}
      style={{ objectPosition: item.focus }}
      className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-out ${active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
    />
  );
}
