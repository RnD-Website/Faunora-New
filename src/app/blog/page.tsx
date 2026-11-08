import type { Metadata } from "next";
import { posts } from "@/content/site";
import { PageHero, PostCard } from "@/components/cards";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHero eyebrow="Blog" title="Notes from the field" body="Practical nutrition advice for pet owners, vets and farmers." />
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
      </section>
    </>
  );
}
