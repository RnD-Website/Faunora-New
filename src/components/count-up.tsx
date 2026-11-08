"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to the number inside `value` the first time it scrolls into view.
 * Any text around the number ("≥", "×", "%", "<") is kept as-is.
 */
export function CountUp({ value, duration = 1800, className }: { value: string | number; duration?: number; className?: string }) {
  const text = String(value);
  const m = text.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = m?.[1] ?? "";
  const target = m ? parseFloat(m[2]) : 0;
  const decimals = m?.[2].includes(".") ? m[2].split(".")[1].length : 0;
  const suffix = m?.[3] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- show the final value straight away
      setN(target);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setN(target * (1 - Math.pow(1 - t, 3)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  if (!m) return <span className={className}>{text}</span>;
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
