"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { home } from "@/content/site";
import { ArrowRight } from "./icons";

type Card = {
  n: string;
  name: string;
  label: string;
  href: string;
  image: string;
  alt: string;
  shape: "portrait" | "landscape";
  speed: number; // extra upward parallax, px over the whole section
  pos: string; // css vars for position (mobile + desktop)
};

const cards: Card[] = [
  {
    n: "01",
    name: "Companion™",
    label: "Pet supplements",
    href: "/products/companion",
    image: "/images/labrador-tulip.jpg",
    alt: "Golden Labrador sitting with a tulip in its mouth",
    shape: "portrait",
    speed: 260,
    pos: "--t:70svh;--l:6%;--w:58vw;--tl:78svh;--ll:20%;--wl:19vw",
  },
  {
    n: "02",
    name: "Herd™",
    label: "Livestock premix",
    href: "/products/herd",
    image: "/images/dairy-herd.jpg",
    alt: "Herd of dairy cattle grazing in a field",
    shape: "landscape",
    speed: 90,
    pos: "--t:135svh;--l:34%;--w:62vw;--tl:140svh;--ll:1.5%;--wl:29vw",
  },
  {
    n: "03",
    name: "Flock™",
    label: "Poultry nutrition",
    href: "/products/flock",
    image: "/images/hen.jpg",
    alt: "Brown hen standing on grass",
    shape: "portrait",
    speed: 380,
    pos: "--t:200svh;--l:8%;--w:56vw;--tl:168svh;--ll:56%;--wl:19vw",
  },
  {
    n: "04",
    name: "Aqua™",
    label: "On request",
    href: "/contact",
    image: "/images/fish-cages.jpg",
    alt: "Fish farm cages on a calm lake",
    shape: "landscape",
    speed: 160,
    pos: "--t:262svh;--l:30%;--w:64vw;--tl:212svh;--ll:65%;--wl:30vw",
  },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function ProductsShowcase() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      el.style.setProperty("--sp", clamp(-r.top / travel).toFixed(4));
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

  return (
    <section ref={ref} id="products" className="showcase relative isolate bg-[#54602f]" aria-labelledby="showcase-title">
      {/* Pinned spacer so the heading and cards share one sticky frame */}
      <div className="sticky top-0 h-svh" aria-hidden="true" />

      {/* Pinned heading — the cards fly over it */}
      <div className="pointer-events-none sticky top-0 -mt-[100svh] grid h-svh place-items-center px-4 text-center">
        <div>
          <p className="mx-auto inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f4ede6]">
            Our products
          </p>
          <h2 id="showcase-title" className="font-display mx-auto mt-5 max-w-[16ch] text-[clamp(2.4rem,6.4vw,6rem)] leading-[0.95] text-[#f4ede6]">
            {home.products.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[#f4ede6]/80 md:whitespace-nowrap">{home.products.body}</p>
          <Link href="/contact" className="btn btn-light pointer-events-auto mt-8">
            Contact Us Now <ArrowRight />
          </Link>
        </div>
      </div>
      {/* Flying product cards */}
      <ul className="absolute inset-0">
        {cards.map((c) => (
          <li
            key={c.n}
            className={`showcase-card absolute ${c.shape === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]"}`}
            style={{ ...cssVars(c.pos), ["--speed" as string]: `${c.speed}px` }}
          >
            <Link href={c.href} className="group relative block h-full w-full overflow-hidden bg-forest">
              <Image
                src={c.image}
                alt={c.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 64vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(31_37_9/0.15),rgb(31_37_9/0.05)_40%,rgb(31_37_9/0.65))]" />
              <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 items-center justify-between text-[#f4ede6] md:inset-x-5">
                <span className="text-xl font-light tabular-nums md:text-2xl">{c.n}</span>
                <span className="text-lg font-medium uppercase tracking-[-0.01em] md:text-2xl">{c.name}</span>
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f4ede6]/85 md:inset-x-5">
                <span>{c.label}</span>
                <span className="flex items-center gap-1.5 transition group-hover:gap-2.5">
                  View <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
            {/* corner markers */}
            <span className="showcase-corner left-0 top-0" />
            <span className="showcase-corner right-0 top-0" />
            <span className="showcase-corner bottom-0 left-0" />
            <span className="showcase-corner bottom-0 right-0" />
          </li>
        ))}
      </ul>

    </section>
  );
}

function cssVars(s: string): React.CSSProperties {
  return Object.fromEntries(s.split(";").map((kv) => kv.split(":") as [string, string]));
}
