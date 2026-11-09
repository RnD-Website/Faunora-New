"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { home } from "@/content/site";
import { LogoMark } from "../logo";
import { ArrowRight } from "../icons";
import { Scene } from "./scene";

type Phase = "loading" | "lighting" | "ready";

const SESSION_KEY = "faunora-intro-seen";
const MIN_LOAD_MS = 2600;
const badges = [
  { src: "/images/puppy.jpg", alt: "" },
  { src: "/images/cat.jpg", alt: "" },
  { src: "/images/hen.jpg", alt: "" },
  { src: "/images/calves.jpg", alt: "" },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function HeroIntro() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Loader: time-based progress that waits for the page to finish loading ── */
  useEffect(() => {
    const skip =
      document.documentElement.classList.contains("intro-skip") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with sessionStorage / OS setting
      setPhase("ready");
      setProgress(100);
      return;
    }

    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    const start = performance.now();
    let raf = 0;
    let shown = 0;
    const timers: number[] = [];

    const tick = (now: number) => {
      const t = clamp((now - start) / MIN_LOAD_MS);
      // ease-out, but hold at 92% until the window load event
      const target = (1 - Math.pow(1 - t, 2.2)) * (loaded ? 100 : 92);
      shown += (target - shown) * 0.18;
      const value = t >= 1 && loaded && shown > 99.4 ? 100 : shown;
      setProgress(value);
      if (value >= 100) {
        timers.push(window.setTimeout(() => setPhase("lighting"), 350));
        timers.push(window.setTimeout(() => setPhase("ready"), 350 + 1500));
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    if (phase !== "ready") return;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    // land at the top after the intro (browsers may restore scroll)
    if (!document.documentElement.classList.contains("intro-skip")) window.scrollTo({ top: 0, behavior: "instant" });
  }, [phase]);

  /* ── Scroll-driven camera push into the chew ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? clamp(-rect.top / travel) : 0;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const pct = Math.round(progress);
  const badge = badges[Math.min(badges.length - 1, Math.floor(progress / (100 / badges.length)))];

  return (
    <section ref={sectionRef} data-intro-phase={phase} className="intro relative -mt-[var(--header-h)] h-[260svh]" aria-label="Faunora introduction">
      <div className="sticky top-0 h-svh overflow-hidden bg-forest">
        {/* camera: scroll zoom (outer) + intro push-in (inner) */}
        <div className="intro-zoom absolute inset-0">
          <div className="intro-scene absolute inset-0">
            <Scene />
          </div>
        </div>
        <div className="intro-dim pointer-events-none absolute inset-0" />

        {/* Headline layer (Farm Minerals layout) */}
        <div className="intro-copy absolute inset-0 pt-[calc(var(--header-h)+48px)] md:pt-[calc(var(--header-h)+80px)]">
          <div className="container-x relative h-full">
            <h1 className="intro-title font-display max-w-[9ch] text-[clamp(2.3rem,5vw,4.4rem)] leading-[0.95] text-[#f4ede6]">
              {home.hero.title}
            </h1>

            {/* Right column: subtitle + primary button */}
            <div className="intro-sub absolute bottom-8 right-[var(--gutter)] flex flex-col items-end gap-5 text-right md:bottom-auto md:top-[44%] md:gap-7">
              <p className="max-w-[16ch] text-[clamp(1.05rem,1.9vw,1.75rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-[#f4ede6] [text-shadow:0_2px_18px_rgb(16_21_10/0.65)]">
                {home.hero.subtitle}
              </p>
              <Link href="#products" className="btn btn-light">
                Explore products <ArrowRight />
              </Link>
            </div>

            {/* Scroll cue, bottom left */}
            <div className="intro-cta absolute bottom-8 left-[var(--gutter)] flex flex-col items-center gap-2 text-[#f4ede6] md:bottom-10" aria-hidden="true">
              <span className="intro-mouse" />
              <span className="eyebrow text-[0.65rem]">Scroll</span>
            </div>
          </div>
        </div>

        {/* Fade into the next section at the end of the zoom */}
        <div className="intro-exit pointer-events-none absolute inset-0 bg-[#f4ede6]" />

        {/* Loader */}
        <div className="intro-loader absolute inset-0 z-10 text-white" role="status" aria-live="polite" aria-label={`Loading ${pct}%`}>
          <div className="absolute inset-x-[8%] top-1/2 md:inset-x-[10%]">
            <div className="flex items-center gap-6">
              <p className="hidden w-28 shrink-0 text-sm font-semibold tracking-tight md:block">
                Loading<span className="intro-dots" />
              </p>
              <div className="relative h-px flex-1 bg-white/35">
                <div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${progress}%` }} />
                <span
                  className="font-display absolute bottom-5 text-4xl tabular-nums md:text-5xl"
                  style={{ left: `${progress}%`, transform: `translateX(-${progress}%)` }}
                >
                  {pct}%
                </span>
                <span className="absolute top-6" style={{ left: `${progress}%`, transform: `translateX(-${progress}%)` }}>
                  <span key={badge.src} className="intro-badge keep-round relative block size-14 overflow-hidden ring-2 ring-sage md:size-16">
                    <Image src={badge.src} alt={badge.alt} fill sizes="64px" className="object-cover" priority />
                  </span>
                </span>
              </div>
              <div className="hidden w-36 shrink-0 items-center justify-end gap-2 md:flex">
                <LogoMark className="h-6 w-auto text-sage-200" />
                <span className="font-display text-2xl">Faunora</span>
              </div>
            </div>
            <div className="mt-28 flex items-center justify-between md:hidden">
              <p className="text-sm font-semibold">
                Loading<span className="intro-dots" />
              </p>
              <span className="flex items-center gap-2">
                <LogoMark className="h-5 w-auto text-sage-200" />
                <span className="font-display text-xl">Faunora</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
