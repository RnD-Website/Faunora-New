import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/content/site";
import { ProductCard } from "@/components/cards";
import { RequestButton } from "@/components/request-modal";
import { ArrowRight, Check } from "@/components/icons";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.short } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const others = products.filter((x) => x.slug !== p.slug);
  const tone = { beige: "bg-beige", teal: "bg-sand", sage: "bg-sage/15" }[p.accent];

  return (
    <>
      <section className={`${tone} -mt-[var(--header-h)] pt-[var(--header-h)]`}>
        <div className="container-x grid items-center gap-10 py-12 md:py-20 lg:grid-cols-2">
          <div>
            <Link href="/#products" className="text-sm font-semibold text-forest-500 hover:text-forest">← All products</Link>
            <p className="eyebrow mt-6 text-forest-500">{p.category}</p>
            <h1 className="font-display mt-3 text-5xl leading-[1] md:text-6xl">{p.name}</h1>
            <p className="lede mt-6 max-w-xl text-lg text-forest/75">{p.intro}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.forAnimals.map((a) => (
                <span key={a} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium">{a}</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">{p.format}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <RequestButton product={p.name}>Request {p.name.replace("™", "")} <ArrowRight /></RequestButton>
              <Link href="/science" className="btn btn-ghost">The science</Link>
            </div>
          </div>
          <div className="corners relative aspect-[4/5] bg-white">
            <Image src={p.image} alt={p.imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <h2 className="h-xl max-w-2xl">What it does</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.benefits.map((b) => (
              <div key={b.title} className="corners bg-paper p-6 ring-1 ring-line">
                <span className="grid size-10 place-items-center rounded-full bg-sage text-forest"><Check /></span>
                <h3 className="h-md mt-4">{b.title}</h3>
                <p className="mt-2 text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-beige-50 py-20 md:py-28">
        <div className="container-x">
          <h2 className="h-xl">Explore more</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {others.map((o) => <ProductCard key={o.slug} p={o} />)}
          </div>
        </div>
      </section>
    </>
  );
}
