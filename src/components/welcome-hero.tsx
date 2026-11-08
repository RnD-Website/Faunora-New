import Image from "next/image";
import Link from "next/link";
import { home } from "@/content/site";
import { ArrowRight, Leaf, Shield, Sparkle } from "./icons";
import { RequestButton } from "./request-modal";
import { InView } from "./in-view";

/* Small round animal portraits floating between the two cards */
const bubbles = [
  { src: "/images/corgi.jpg", alt: "Corgi", pos: "left-[40%] top-[10%]", size: "size-11", badge: "arrow", delay: "0s" },
  { src: "/images/cat.jpg", alt: "Cat", pos: "left-[43%] top-[42%]", size: "size-12", badge: null, delay: "1.2s" },
  { src: "/images/hen.jpg", alt: "Hen", pos: "left-[39%] top-[76%]", size: "size-10", badge: "arrow", delay: "0.6s" },
  { src: "/images/puppy.jpg", alt: "Puppy", pos: "left-[58%] top-[14%]", size: "size-10", badge: "arrow", delay: "1.8s" },
  { src: "/images/dog-beach.jpg", alt: "Dog on a beach", pos: "left-[56%] top-[62%]", size: "size-12", badge: null, delay: "0.9s" },
];

function Avatar({ src, alt, className = "size-12" }: { src: string; alt: string; className?: string }) {
  return (
    <span className={`keep-round relative block shrink-0 overflow-hidden bg-sand ring-2 ring-white ${className}`}>
      <Image src={src} alt={alt} fill sizes="56px" className="object-cover" />
    </span>
  );
}

function ProfileCard({
  icon,
  label,
  avatar,
  name,
  meta,
  chipLead,
  chipStrong,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  avatar: { src: string; alt: string };
  name: string;
  meta: string;
  chipLead: string;
  chipStrong: string;
  className?: string;
}) {
  return (
    <div className={`welcome-card corners w-[min(88vw,300px)] bg-white p-5 shadow-[0_24px_60px_-24px_rgb(31_37_9/0.35)] ring-1 ring-line ${className}`}>
      <p className="flex items-center gap-2 text-[13px] font-semibold text-forest">
        {icon}
        {label}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <Avatar src={avatar.src} alt={avatar.alt} />
        <div>
          <p className="font-semibold leading-tight">{name}</p>
          <p className="mt-0.5 text-[13px] text-muted">{meta}</p>
        </div>
      </div>
      <p className="mt-4 flex items-center gap-2 bg-beige-50 px-3 py-2.5 text-[14px] text-forest/75 ring-1 ring-line/60">
        <Sparkle className="size-3.5 shrink-0 text-sage" />
        <span>
          {chipLead} <strong className="font-semibold text-forest">{chipStrong}</strong>
        </span>
      </p>
    </div>
  );
}

function Chip({ title, sub, className = "" }: { title: string; sub: string; className?: string }) {
  return (
    <div className={`keep-round flex items-center gap-2 bg-white py-2 pl-3.5 pr-5 shadow-[0_12px_30px_-14px_rgb(31_37_9/0.35)] ring-1 ring-line ${className}`}>
      <ArrowRight className="size-3.5 shrink-0 text-forest" />
      <span className="text-[12px] leading-tight">
        <strong className="block font-semibold text-forest">{title}</strong>
        <span className="text-forest/70">{sub}</span>
      </span>
    </div>
  );
}

/** Centred welcome: headline, one-line intro, CTA, then a band of floating profile cards. */
export function WelcomeHero() {
  return (
    <section className="welcome relative overflow-hidden pb-14 pt-6 md:pb-24 md:pt-10">
      <div className="container-x relative z-10 text-center">
        <p className="eyebrow text-forest-500">Vet-formulated animal nutrition</p>
        <h2 className="font-display mx-auto mt-5 max-w-[20ch] text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95]">Made for the animals you love.</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-forest/75">{home.hero.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="#products" className="btn btn-dark">
            Explore products <ArrowRight />
          </Link>
          <RequestButton className="btn btn-ghost">Request a sample</RequestButton>
        </div>
      </div>

      {/* Floating cards band */}
      <div className="relative mt-6 md:mt-8 lg:h-[440px]">

        {/* Mobile / tablet: stacked cards */}
        <InView className="welcome-stage container-x relative flex flex-col items-center gap-5 lg:hidden" threshold={0.15}>
          <ProfileCard
            icon={<Leaf className="size-4 text-sage" />}
            label="Daily routine"
            avatar={{ src: "/images/labrador-tulip.jpg", alt: "Golden labrador" }}
            name="Luna"
            meta="Golden retriever, 7 years"
            chipLead="Taking"
            chipStrong="Companion™ chews"
          />
          <ProfileCard
            icon={<Shield className="size-4 text-sage" />}
            label="Herd profile"
            avatar={{ src: "/images/calves.jpg", alt: "Calves in a barn" }}
            name="Meadow Farm"
            meta="120 dairy cows"
            chipLead="Interested in"
            chipStrong="Herd™ premix"
          />
        </InView>

        {/* Desktop: floating composition — pieces fly in on scroll, then float; connectors keep flowing */}
        <InView className="welcome-stage relative mx-auto hidden h-full max-w-[1100px] lg:block" threshold={0.3}>
          <svg viewBox="0 0 1100 440" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            {[
              "M344 158 C 420 158, 440 128, 506 128",
              "M641 128 C 700 128, 700 188, 756 188",
              "M344 205 C 420 205, 450 286, 517 286",
              "M655 286 C 712 286, 712 222, 756 222",
            ].map((d, i) => (
              <path key={d} d={d} className="welcome-link" style={{ ["--i" as string]: i }} vectorEffect="non-scaling-stroke" />
            ))}
          </svg>

          <div className="welcome-enter absolute left-[4%] top-[18%]" style={{ ["--d" as string]: "0ms", ["--x" as string]: "-60px" }}>
            <ProfileCard
              icon={<Leaf className="size-4 text-sage" />}
              label="Daily routine"
              avatar={{ src: "/images/labrador-tulip.jpg", alt: "Golden labrador" }}
              name="Luna"
              meta="Golden retriever, 7 years"
              chipLead="Taking"
              chipStrong="Companion™ chews"
              className="float"
            />
          </div>

          {bubbles.map((b, i) => (
            <div key={b.src} className={`welcome-enter welcome-pop absolute ${b.pos}`} style={{ ["--d" as string]: `${300 + i * 110}ms` }}>
              <div className="float relative" style={{ animationDelay: b.delay }}>
                <Avatar src={b.src} alt={b.alt} className={b.size} />
                {b.badge && (
                  <span className="absolute -bottom-2 -right-2 keep-round grid size-6 place-items-center bg-white text-forest shadow-md ring-1 ring-line">
                    {b.badge === "spark" ? <Sparkle className="size-3 text-sage" /> : <ArrowRight className="size-3" />}
                  </span>
                )}
              </div>
            </div>
          ))}
          <div className="welcome-enter absolute left-[46%] top-[24%]" style={{ ["--d" as string]: "650ms", ["--y" as string]: "18px" }}>
            <Chip title="Shared" sub="Vet's feeding plan" className="float [animation-delay:0.4s]" />
          </div>
          <div className="welcome-enter absolute left-[47%] top-[60%]" style={{ ["--d" as string]: "850ms", ["--y" as string]: "18px" }}>
            <Chip title="Recommended" sub="NutriCore™ dose" className="float [animation-delay:1.4s]" />
          </div>

          <div className="welcome-enter absolute right-[4%] top-[24%]" style={{ ["--d" as string]: "150ms", ["--x" as string]: "60px" }}>
            <ProfileCard
              icon={<Shield className="size-4 text-sage" />}
              label="Herd profile"
              avatar={{ src: "/images/calves.jpg", alt: "Calves in a barn" }}
              name="Meadow Farm"
              meta="120 dairy cows"
              chipLead="Interested in"
              chipStrong="Herd™ premix"
              className="float [animation-delay:2s]"
            />
          </div>
        </InView>
      </div>
    </section>
  );
}
