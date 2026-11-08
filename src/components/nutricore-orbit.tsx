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
      className="orbit relative overflow-hidden rounded-[40px] bg-[#394f36] px-5 py-10 text-white md:px-10 md:py-14"
    >
      {/* blurred warm light, like a defocused photo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image src="/images/meadow.jpg" alt="" fill sizes="60vw" className="left-[35%] top-[-20%] !h-[110%] !w-[75%] object-cover opacity-45 blur-[70px]" />
        <div className="absolute -right-20 -top-28 size-[620px] rounded-full bg-[#8f9c4c]/45 blur-[120px]" />
        <div className="absolute right-[18%] top-[4%] size-[360px] rounded-full bg-[#a6b45a]/30 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_10%,transparent_35%,rgb(57_79_54/0.9)_70%)]" />
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
            <circle cx="300" cy="300" r="238" fill="none" stroke="rgb(236 253 222 / 0.22)" strokeWidth="1.5" />
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
            <Image src="/images/meadow.jpg" alt="Dense green grass dotted with tiny wildflowers" fill sizes="(min-width: 1024px) 380px, 70vw" className="scale-125 object-cover brightness-[1.3] saturate-[1.15]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_28%,rgb(236_253_222/0.35),transparent_40%),radial-gradient(circle_at_50%_50%,transparent_48%,rgb(20_38_18/0.6)_100%)]" />
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
              className={`orbit-card rounded-2xl border p-5 ${i === HIGHLIGHT ? "border-[#8ab862]/35 bg-[#4b704c]/90" : "border-white/15 bg-[#31482e]/70"} shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)] backdrop-blur-md lg:absolute lg:w-[27%]`}
              style={{ ...spotsStyle(i), transitionDelay: `${0.35 + i * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-xs font-semibold tracking-[0.04em]">{f.title}</h4>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${badgeTones[i]}`}>{f.badge}</span>
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
