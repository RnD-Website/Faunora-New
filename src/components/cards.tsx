import Image from "next/image";
import Link from "next/link";
import type { Post, Product } from "@/content/site";
import { ArrowRight } from "./icons";

const accentBg = { beige: "bg-beige", teal: "bg-teal", sage: "bg-sage" } as const;

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className="corners group flex h-full flex-col bg-white ring-1 ring-line transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`relative aspect-[4/3] overflow-hidden ${accentBg[p.accent]}`}>
        <Image
          src={p.image}
          alt={p.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur">
          {p.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="h-md">{p.name}</h3>
        <p className="mt-2 flex-1 text-muted">{p.short}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-semibold">
          Learn more <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <div className="corners">
        <div className="relative aspect-[4/3] overflow-hidden bg-beige">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </div>
      <p className="mt-4 text-sm text-muted">
        {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {post.readTime}
      </p>
      <h3 className="h-md mt-1 group-hover:underline group-hover:decoration-sage group-hover:decoration-2 group-hover:underline-offset-4">
        {post.title}
      </h3>
      <p className="mt-2 text-muted">{post.excerpt}</p>
    </Link>
  );
}

export function PageHero({ eyebrow, title, body, tone = "beige" }: { eyebrow: string; title: string; body?: string; tone?: "beige" | "sand" }) {
  return (
    <section className={`${tone === "beige" ? "bg-beige" : "bg-sand"} -mt-[var(--header-h)] pt-[calc(var(--header-h)+56px)] pb-16 md:pb-24`}>
      <div className="container-x max-w-4xl text-center">
        <p className="eyebrow text-forest-500">{eyebrow}</p>
        <h1 className="font-display mt-4 text-5xl leading-[1] md:text-6xl">{title}</h1>
        {body && <p className="lede mx-auto mt-6 max-w-2xl text-lg text-forest/75">{body}</p>}
      </div>
    </section>
  );
}
