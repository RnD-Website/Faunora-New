import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/cards";

export const metadata: Metadata = { title: "Sustainability" };

const pillars = [
  { title: "Less nutrient runoff", body: "Higher absorption means fewer minerals excreted into soil and waterways." },
  { title: "Plant-based capsules", body: "Our micro-shells are made from food-grade plant fibres, fully digestible." },
  { title: "Concentrated shipping", body: "Smaller doses mean lighter loads and lower freight emissions per animal." },
  { title: "Recyclable packaging", body: "Pouches, tubs and bags designed for local recycling streams." },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero tone="sand" eyebrow="Sustainability" title="Healthier animals, lighter footprint." body="Wasted nutrition is wasted resources. Fixing absorption is one of the simplest ways to make animal care more sustainable." />
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-6 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="corners bg-paper p-8 ring-1 ring-line">
              <h2 className="h-md">{p.title}</h2>
              <p className="mt-2 text-muted">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="container-x mt-10">
          <div className="corners relative aspect-[21/9] bg-sand">
            <Image src="/images/calves.jpg" alt="Three young calves standing together" fill sizes="100vw" className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
