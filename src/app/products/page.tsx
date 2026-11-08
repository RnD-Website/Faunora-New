import type { Metadata } from "next";
import { products } from "@/content/site";
import { PageHero, ProductCard } from "@/components/cards";

export const metadata: Metadata = {
  title: "Products",
  description: "Faunora supplements for pets, livestock and poultry — all built on NutriCore™ micro-encapsulation.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Our products" title="For happier pets. For healthier herds." body="One technology, tuned for every species we care for." />
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </>
  );
}
