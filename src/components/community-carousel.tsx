"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Post } from "@/content/site";
import { ArrowRight } from "./icons";

/**
 * Endless card carousel over a full-bleed landscape.
 * The list is rendered three times; we start on the middle copy and
 * silently jump back to it after a transition reaches either edge.
 */
export function CommunityCarousel({ posts }: { posts: Post[] }) {
  const n = posts.length;
  const loop = [...posts, ...posts, ...posts];
  const [index, setIndex] = useState(n);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);
  const busy = useRef(false);
  const drag = useRef<{ x: number; dx: number } | null>(null);

  // measure card width + gap
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const first = track?.children[0] as HTMLElement | undefined;
      const second = track?.children[1] as HTMLElement | undefined;
      if (first && second) setStep(second.offsetLeft - first.offsetLeft);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const DURATION = 800;
  const indexRef = useRef(n);
  const go = useCallback(
    (dir: 1 | -1) => {
      if (busy.current) return;
      busy.current = true;
      setAnimate(true);
      const target = indexRef.current + dir;
      indexRef.current = target;
      setIndex(target);
      window.setTimeout(() => {
        // after the slide, silently recentre onto the middle copy
        if (target < n || target >= 2 * n) {
          const centred = target < n ? target + n : target - n;
          indexRef.current = centred;
          setAnimate(false);
          setIndex(centred);
        }
        busy.current = false;
      }, DURATION + 30);
    },
    [n],
  );

  // re-enable transitions after a silent jump
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  // keyboard support when the section has focus
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  // swipe / drag
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, dx: 0 };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (drag.current) drag.current.dx = e.clientX - drag.current.x;
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (d && Math.abs(d.dx) > 40) go(d.dx < 0 ? 1 : -1);
  };

  return (
    <div onKeyDown={onKey}>
      {/* clip the left edge so cards slide out of view, but keep the right side bleeding off-screen */}
      <div style={{ clipPath: "inset(-12px -100vw -12px -6px)" }}>
        <ul
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="flex touch-pan-y gap-4 md:gap-5"
          style={{
            transform: `translate3d(${-index * step}px,0,0)`,
            transition: animate ? `transform ${DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)` : "none",
          }}
        >
          {loop.map((p, i) => {
            const active = i >= index && i < index + 3;
            return (
              <li
                key={`${p.slug}-${i}`}
                aria-hidden={i < n || i >= 2 * n ? true : undefined}
                className="community-card corners relative aspect-[3/4] w-[72vw] shrink-0 sm:w-[46vw] lg:w-[min(22vw,320px)]"
                style={{ ["--corner" as string]: "#f4ede6" }}
              >
                <Link
                  href={`/blog/${p.slug}`}
                  tabIndex={i < n || i >= 2 * n ? -1 : undefined}
                  draggable={false}
                  className="group relative block h-full w-full overflow-hidden bg-forest"
                >
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 72vw"
                    className={`object-cover transition duration-[1.2s] ease-out group-hover:scale-105 ${active ? "" : "brightness-90"}`}
                  />
                  <div className="absolute bottom-0 right-0 flex h-[64%] w-[74%] flex-col justify-between bg-[#f4ede6] p-4 text-forest transition duration-500 group-hover:h-[68%] md:p-5">
                    <h3 className="text-[15px] font-semibold leading-[1.15] tracking-[-0.01em] md:text-base">{p.title}</h3>
                    <div>
                      <p className="text-[10.5px] font-medium uppercase leading-snug tracking-[0.02em] text-forest/80 md:text-[11px]">
                        {p.excerpt}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-forest-500 transition group-hover:gap-2.5">
                        Read <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Controls */}
      <div className="mt-8 flex gap-3 lg:absolute lg:bottom-0 lg:left-0 lg:mt-0">
        <button type="button" onClick={() => go(-1)} aria-label="Previous article" className="btn btn-light size-12 !p-0">
          <ArrowRight className="size-4 rotate-180" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next article" className="btn btn-light size-12 !p-0">
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
