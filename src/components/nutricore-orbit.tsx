"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { home } from "@/content/site";

const { figures } = home.solution;

/* Card positions around the ring on large screens (% of the stage) */
const spots = [
  { left: "15%", top: "3%" },
  { left: "60%", top: "13%" },
  { left: "2%", top: "39%" },
  { left: "11%", top: "71%" },
  { left: "59%", top: "71%" },
];

/* Ring segments: [start°, end°, colour] — 0° is 12 o'clock, clockwise */
const segments: [number, number, string][] = [
  [-86, -22, "rgb(244 237 230 / 0.3)"],
  [-18, 58, "#c9d3a8"],
  [62, 138, "#eef0de"],
  [142, 214, "#7c914c"],
  [218, 270, "#a9b98a"],
];

function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => {
    const rad = ((a - 90) * Math.PI) / 180;
    return `${(cx + r * Math.cos(rad)).toFixed(2)} ${(cy + r * Math.sin(rad)).toFixed(2)}`;
  };
  return `M ${p(a0)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(a1)}`;
}

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function CountUp({ to, run, duration = 1400 }: { to: number; run: boolean; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- jump straight to the final value
      setV(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setV(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, duration]);
  return <>{v}</>;
}

export function NutriCoreOrbit() {
  const [stageRef, seen] = useInView<HTMLDivElement>();

  return (
    <div
      ref={stageRef}
      data-seen={seen || undefined}
      className="orbit relative overflow-hidden rounded-[40px] bg-forest-900 px-5 py-10 text-white md:px-10 md:py-14"
    >
      {/* blurred warm light, like a defocused photo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image src="/images/kibble.jpg" alt="" fill sizes="60vw" className="scale-125 object-cover opacity-30 blur-3xl" />
        <div className="absolute -right-24 -top-32 size-[640px] rounded-full bg-sage/50 blur-[120px]" />
        <div className="absolute -bottom-40 -left-32 size-[520px] rounded-full bg-[#596a33]/70 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,transparent_30%,rgb(31_37_9/0.88)_100%)]" />
      </div>

      <h3 className="relative text-sm font-semibold leading-snug md:text-base">
        {figures.heading[0]}
        <br />
        <span className="text-white/60">{figures.heading[1]}</span>
      </h3>

      {/* Stage */}
      <div className="relative mx-auto mt-6 max-w-[1200px] lg:mt-0 lg:aspect-[1200/820]">
        {/* Ring + globe */}
        <div className="orbit-core relative mx-auto aspect-square w-[min(88vw,460px)] lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[50%] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <svg viewBox="0 0 600 600" className="orbit-ring absolute inset-0 h-full w-full" aria-hidden="true">
            <circle cx="300" cy="300" r="238" fill="none" stroke="rgb(255 255 255 / 0.14)" strokeWidth="1.5" />
            {segments.map(([a0, a1, c], i) => (
              <path
                key={i}
                d={arc(300, 300, 282, a0, a1)}
                fill="none"
                stroke={c}
                strokeWidth="13"
                pathLength={1}
                className="orbit-seg"
                style={{ transitionDelay: `${0.2 + i * 0.12}s` }}
              />
            ))}
          </svg>

          {/* Kibble globe */}
          <div className="orbit-globe absolute inset-[19%] overflow-hidden rounded-full shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6)]">
            <Image src="/images/kibble.jpg" alt="Close-up of nutrient-rich kibble" fill sizes="(min-width: 1024px) 380px, 70vw" className="scale-110 object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_28%,rgb(240_235_210/0.4),transparent_42%),radial-gradient(circle_at_50%_50%,transparent_45%,rgb(16_21_10/0.75)_100%)]" />
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-[clamp(4.5rem,11vw,8.5rem)] font-light leading-[0.85] tracking-[-0.06em] tabular-nums">
                  <CountUp to={figures.center.value} run={seen} />
                  {figures.center.suffix}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] md:text-base">{figures.center.label}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Glass cards */}
        <ul className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:static lg:mt-0 lg:block">
          {figures.items.map((f, i) => (
            <li
              key={f.title}
              className="orbit-card rounded-2xl border border-white/15 bg-white/[0.07] p-5 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)] backdrop-blur-md lg:absolute lg:w-[27%]"
              style={{ ...spotsStyle(i), transitionDelay: `${0.35 + i * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-xs font-semibold tracking-[0.04em]">{f.title}</h4>
                <span className="shrink-0 rounded-full bg-sage-200 px-2.5 py-1 text-[11px] font-semibold text-forest-900">{f.badge}</span>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="flex items-baseline gap-1.5 leading-none">
                    <span className="text-[clamp(2.6rem,4vw,3.4rem)] font-light tracking-[-0.05em] tabular-nums">
                      {"prefix" in f && f.prefix}
                      <CountUp to={f.value} run={seen} />
                    </span>
                    <span className="text-xs font-semibold">{f.unit}</span>
                  </p>
                  <p className="mt-2 text-[11px] text-white/60">{f.label}</p>
                </div>
                <p className="max-w-[11ch] text-right text-[11px] leading-snug text-white/60">{f.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="relative mt-8 text-center text-xs text-white/45 lg:mt-0">*{figures.footnote}</p>
    </div>
  );
}

function spotsStyle(i: number): React.CSSProperties {
  const s = spots[i];
  return { ["--l" as string]: s.left, ["--t" as string]: s.top };
}
