import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/cards";

export const metadata: Metadata = { title: "About us" };

const values = [
  { title: "Evidence first", body: "We publish trial data openly and only claim what we can measure." },
  { title: "Every species", body: "From a family cat to a 500-cow dairy, nutrition deserves the same care." },
  { title: "Less waste", body: "Better absorption is better for animals, farmers and the planet." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="We exist for the animals." body="Faunora was founded by veterinarians and nutrition scientists who were tired of seeing good nutrition wasted." />
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-sky">
            <Image src="/images/vet-dachshund.jpg" alt="A veterinarian examining a dachshund" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 className="h-xl">Our story</h2>
            <p className="lede mt-5 text-lg text-muted">
              Placeholder story — replace with yours. We started in a small lab with one question: why do animals on &ldquo;complete&rdquo; diets still show deficiencies? The answer was delivery. So we built NutriCore™, and then a range of products around it for pets, livestock and poultry.
            </p>
            <div className="mt-10 space-y-4">
              {values.map((v) => (
                <div key={v.title} className="rounded-3xl bg-paper p-6 ring-1 ring-line">
                  <h3 className="h-md">{v.title}</h3>
                  <p className="mt-1 text-muted">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
