import type { Metadata } from "next";
import { PageHero } from "@/components/cards";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16">
        <div className="container-x max-w-3xl space-y-4 text-lg text-navy/80">
          <p>Placeholder — replace with your Privacy Policy text, reviewed by a lawyer for your markets.</p>
        </div>
      </section>
    </>
  );
}
