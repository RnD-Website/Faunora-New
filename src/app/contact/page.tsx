import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHero } from "@/components/cards";
import { RequestButton } from "@/components/request-modal";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const cards = [
    { title: "Email", value: site.email, href: `mailto:${site.email}` },
    { title: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
    { title: "LinkedIn", value: "Follow Faunora", href: site.linkedin },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to our team." body="Questions about products, trials or distribution? We usually reply within two working days." />
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <a key={c.title} href={c.href} className="rounded-[var(--radius-card)] bg-paper p-8 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-lg">
              <p className="eyebrow text-navy-500">{c.title}</p>
              <p className="h-md mt-3 break-words">{c.value}</p>
            </a>
          ))}
        </div>
        <div className="container-x mt-10">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] bg-navy p-8 text-white md:flex-row md:items-center md:p-12">
            <div>
              <h2 className="h-lg">Looking for a sample or a quote?</h2>
              <p className="mt-2 text-white/70">Use our request form so we can route you to the right specialist.</p>
            </div>
            <RequestButton>Open request form</RequestButton>
          </div>
        </div>
      </section>
    </>
  );
}
