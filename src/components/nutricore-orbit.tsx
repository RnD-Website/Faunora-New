"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { home } from "@/content/site";
import { CountUp } from "./count-up";

const { figures } = home.solution;

/* Card positions around the ring on large screens (% of the stage) */
const spots = [
  { left: "15%", top: "2%" },
  { left: "60%", top: "12%" },
  { left: "2%", top: "38%" },
  { left: "11%", top: "73%" },
  { left: "59%", top: "73%" },
];

/* Ring segments: [start°, end°, colour] — 0° is 12 o'clock, clockwise */
const segments: [number, number, string][] = [
  [-86, -22, "#c1d5a8"],
  [-18, 98, "#e3e296"],
  [102, 186, "#b0bb60"],
  [190, 238, "#8ab862"],
  [242, 270, "#a5df87"],
];

/* Badge + card tones sampled from the reference */
const badgeTones = [
  "bg-[#bdd3a9] text-[#22341f]",
  "bg-[#e5e79d] text-[#22341f]",
  "bg-[#578942] text-[#f1fce1]",
  "bg-[#bdd3a9] text-[#22341f]",
  "bg-[#e5e79d] text-[#22341f]",
];
const HIGHLIGHT = 2; // the card drawn in solid green, like the reference

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

export function NutriCoreOrbit() {
  const [stageRef, seen] = useInView<HTMLDivElement>();

  return (
    <div
      ref={stageRef}
      data-seen={seen || undefined}
      className="orbit relative overflow-hidden rounded-[40px] bg-[#394f36] px-5 py-10 text-white md:px-10 md:py-14"
    >
      <h3 className="relative text-sm font-semibold leading-snug md:text-base">
        {figures.heading[0]}
        <br />
        <span className="text-white/60">{figures.heading[1]}</span>
      </h3>

      {/* Stage */}
      <div className="relative mx-auto mt-6 max-w-[1200px] lg:mt-0 lg:aspect-[1200/900]">
        {/* Ring + globe */}
        <div className="orbit-core relative mx-auto aspect-square w-[min(88vw,460px)] lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[50%] lg:-translate-x-1/2 lg:-translate-y-1/2">
          <svg viewBox="0 0 600 600" className="orbit-ring absolute inset-0 h-full w-full" aria-hidden="true">
            <circle cx="300" cy="300" r="238" fill="none" stroke="rgb(236 253 222 / 0.22)" strokeWidth="1.5" />
            {segments.map(([a0, a1, c], i) => (
              <path
                key={i}
                d={arc(300, 300, 282, a0, a1)}
                fill="none"
                stroke={c}
                strokeWidth="13"
                strokeLinecap="round"
                pathLength={1}
                className="orbit-seg"
                style={{ transitionDelay: `${0.2 + i * 0.12}s` }}
              />
            ))}
          </svg>

          {/* Glass bezel around the globe */}
          <div className="orbit-globe orbit-bezel keep-round absolute inset-[15.5%]" aria-hidden="true" />

          {/* Kibble globe */}
          <div className="orbit-globe keep-round absolute inset-[19%] overflow-hidden shadow-[0_40px_80px_-20px_rgb(10_20_8/0.7)]">
            <Image src="/images/kibble-poster.jpg" alt="" fill sizes="(min-width: 1024px) 380px, 70vw" className="scale-110 object-cover object-[50%_70%]" />
            <video className="absolute inset-0 h-full w-full scale-110 object-cover object-[50%_70%] motion-reduce:hidden" src="/videos/kibble.mp4" poster="/images/kibble-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
            {/* sphere shading: soft key light, dark rim */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgb(20_32_16/0.78)_100%)]" />
            {/* glossy specular highlight */}
            <div className="absolute left-[14%] top-[6%] h-[34%] w-[62%] -rotate-12 keep-ellipse bg-[linear-gradient(180deg,rgb(255_255_255/0.42),rgb(255_255_255/0)_85%)] blur-[2px]" />
            <div className="keep-round absolute inset-0 shadow-[inset_0_2px_0_rgb(255_255_255/0.35),inset_0_-20px_40px_rgb(10_20_8/0.45)]" />
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-[clamp(4.5rem,11vw,8.5rem)] font-light leading-[0.85] tracking-[-0.06em] tabular-nums [text-shadow:0_6px_30px_rgb(10_20_8/0.55)]">
                  <CountUp value={`${figures.center.value}${figures.center.suffix}`} duration={2200} />
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] [text-shadow:0_2px_14px_rgb(10_20_8/0.7)] md:text-base">{figures.center.label}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Glass cards */}
        <ul className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:static lg:mt-0 lg:block">
          {figures.items.map((f, i) => (
            <li
              key={f.title}
              className={`orbit-card glass-card corners relative p-5 lg:absolute lg:w-[27%] ${i === HIGHLIGHT ? "glass-card--tint" : ""}`}
              style={{ ...spotsStyle(i), transitionDelay: `${0.35 + i * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-xs font-semibold tracking-[0.04em]">{f.title}</h4>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-[inset_0_1px_0_rgb(255_255_255/0.5),0_4px_12px_-4px_rgb(10_20_8/0.4)] ${badgeTones[i]}`}>{f.badge}</span>
              </div>
              <div className="mt-4 h-px bg-gradient-to-r from-white/25 via-white/10 to-transparent" />
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="flex items-baseline gap-1.5 leading-none">
                    <span className="text-[clamp(2.6rem,4vw,3.4rem)] font-light tracking-[-0.05em] tabular-nums">
                      <CountUp value={`${"prefix" in f ? f.prefix : ""}${f.value}`} />
                    </span>
                    <span className="text-xs font-semibold">{f.unit}</span>
                  </p>
                  <p className="mt-2 text-[11px] text-white/70">{f.label}</p>
                </div>
                <p className="max-w-[11ch] text-right text-[11px] leading-snug text-white/65">{f.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

function spotsStyle(i: number): React.CSSProperties {
  const s = spots[i];
  return { ["--l" as string]: s.left, ["--t" as string]: s.top };
}
