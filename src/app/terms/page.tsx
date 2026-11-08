import type { Metadata } from "next";
import { PageHero } from "@/components/cards";

export const metadata: Metadata = { title: "Terms of use" };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of use" />
      <section className="py-16">
        <div className="container-x max-w-3xl space-y-4 text-lg text-forest/80">
          <p>Placeholder — replace with your Terms of use text, reviewed by a lawyer for your markets.</p>
        </div>
      </section>
    </>
  );
}
