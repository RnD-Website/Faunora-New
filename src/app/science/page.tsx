import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/cards";
import { RequestButton } from "@/components/request-modal";

export const metadata: Metadata = { title: "Science", description: "How NutriCore™ micro-encapsulation protects nutrients until they are absorbed." };

const steps = [
  { n: "01", title: "Encapsulate", body: "Each active — vitamins, trace minerals, probiotics, omega-3s — is coated in a plant-fibre micro-shell." },
  { n: "02", title: "Protect", body: "The shell shields nutrients from heat, oxygen and moisture during processing and storage." },
  { n: "03", title: "Survive", body: "It resists stomach acid (and rumen breakdown in cattle) so nutrients are not lost early." },
  { n: "04", title: "Release", body: "In the intestine the shell dissolves, releasing nutrients exactly where they are absorbed." },
];

export default function SciencePage() {
  return (
    <>
      <PageHero eyebrow="Science" title="NutriCore™ technology" body="A micro-capsule smaller than a grain of salt, designed to deliver more of every nutrient to the animal." />
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="corners bg-paper p-7 ring-1 ring-line">
              <p className="font-display text-5xl text-sage">{s.n}</p>
              <h2 className="h-md mt-4">{s.title}</h2>
              <p className="mt-2 text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="safety" className="bg-forest py-20 text-white md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="corners relative aspect-[4/3]">
            <Image src="/images/lab.jpg" alt="Scientist working in a laboratory" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow text-sage-200">Safety & quality</p>
            <h2 className="h-xl mt-3">Tested batch by batch.</h2>
            <p className="lede mt-5 text-lg text-white/75">
              Every batch is tested for potency, heavy metals and microbial safety before release. Formulas are developed with veterinary nutritionists and manufactured in GMP-certified facilities.
            </p>
            <p className="mt-4 text-sm text-white/50">Placeholder — list your actual certifications (e.g. GMP, ISO 22000, NASC) here.</p>
            <RequestButton className="btn btn-primary mt-8">Request technical data sheet</RequestButton>
          </div>
        </div>
      </section>
    </>
  );
}
