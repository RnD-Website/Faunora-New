import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/content/site";
import { RequestButton } from "@/components/request-modal";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((x) => x.slug === slug);
  if (!post) notFound();
  return (
    <article className="pb-20 md:pb-28">
      <div className="container-x max-w-3xl pt-10 md:pt-16">
        <Link href="/blog" className="text-sm font-semibold text-navy-500 hover:text-navy">← All articles</Link>
        <p className="mt-6 text-sm text-muted">
          {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {post.readTime}
        </p>
        <h1 className="font-display mt-3 text-4xl leading-[1.02] md:text-6xl">{post.title}</h1>
        <p className="lede mt-5 text-xl text-muted">{post.excerpt}</p>
      </div>
      <div className="container-x mt-10 max-w-5xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-sky">
          <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
      </div>
      <div className="container-x mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-navy/85">
        {post.body.map((para, i) => <p key={i}>{para}</p>)}
        <div className="!mt-12 rounded-[var(--radius-card)] bg-sky p-8">
          <p className="h-md">Want to try Faunora?</p>
          <p className="mt-2 text-base text-muted">Request a sample tailored to your animals.</p>
          <RequestButton className="btn btn-dark mt-5">Request a sample</RequestButton>
        </div>
      </div>
    </article>
  );
}
