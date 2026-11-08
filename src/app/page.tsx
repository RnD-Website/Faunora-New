import Image from "next/image";
import Link from "next/link";
import { home, posts } from "@/content/site";
import { ProductsShowcase } from "@/components/products-showcase";
import { CommunityCarousel } from "@/components/community-carousel";
import { HeroIntro } from "@/components/intro/hero-intro";
import { WelcomeHero } from "@/components/welcome-hero";
import { Reveal } from "@/components/reveal";
import { RequestButton } from "@/components/request-modal";
import { ArrowRight, Check } from "@/components/icons";
import { NutriCoreOrbit } from "@/components/nutricore-orbit";
import { TrialsMap } from "@/components/trials-map";
import { ScrollProgress } from "@/components/scroll-progress";
import { CountUp } from "@/components/count-up";
import { TestimonialSlider } from "@/components/testimonial-slider";

const partnerLogos = ["/logos/01.svg", "/logos/02.svg", "/logos/03.svg", "/logos/04.svg", "/logos/05.svg", "/logos/06.svg"];

export default function Home() {
  const { problem, solution, stats, sustainability, trials, onRequest, closing } = home;

  return (
    <>
      {/* ── Intro hero: loader, lights-on, scroll zoom ───── */}
      <HeroIntro />

      {/* ── Welcome ──────────────────────────────────────── */}
      <WelcomeHero />

      {/* ── Partner logos: two rows scrolling in opposite directions ── */}
      <section aria-label="Trusted by" className="space-y-8 overflow-hidden pb-24 pt-2 md:space-y-10 md:pb-36 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        {[partnerLogos, [...partnerLogos.slice(3), ...partnerLogos.slice(0, 3)]].map((row, r) => (
          <div key={r} className={`marquee-track flex w-max items-center gap-16 md:gap-24 ${r === 0 ? "marquee-track--reverse" : ""}`}>
            {[...row, ...row, ...row, ...row].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={r === 0 && i < row.length ? "Partner logo" : ""}
                aria-hidden={r > 0 || i >= row.length}
                width={135}
                height={30}
                unoptimized
                loading="eager"
                className="h-7 w-auto shrink-0 opacity-85 transition-opacity duration-300 hover:opacity-100 md:h-8"
              />
            ))}
          </div>
        ))}
      </section>

      {/* ── Problem: full-bleed photo with text on top ──── */}
      <section className="relative isolate flex min-h-[640px] items-end overflow-hidden text-[#f4ede6] lg:min-h-[100svh]">
        <Image src="/images/problem-poster.jpg" alt="A dog beside a bowl of kibble" fill sizes="100vw" className="-z-20 object-cover" />
        <video className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden" src="/videos/problem.mp4" poster="/images/problem-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(31_37_9/0.88)_0%,rgb(31_37_9/0.6)_38%,rgb(31_37_9/0.15)_70%,rgb(31_37_9/0.35)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(31_37_9/0.35)_0%,transparent_30%,transparent_60%,rgb(31_37_9/0.75)_100%)]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgb(31_37_9/0.35)] lg:hidden" />

        <div className="container-x grid w-full gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-[#c9d3a8]">The problem</p>
            <h2 className="h-xl mt-4 max-w-[18ch] text-[#f4ede6]">{problem.title}</h2>
            <p className="mt-6 max-w-lg text-lg text-[#f4ede6]/80">{problem.body}</p>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-4 lg:col-start-9">
            <div className="corners bg-forest-900/55 p-6 ring-1 ring-[#f4ede6]/30 backdrop-blur-md md:p-8" style={{ ["--corner" as string]: "#f4ede6" }}>
              <p className="font-display whitespace-nowrap text-[clamp(2.6rem,3.5vw,4rem)] leading-none">{problem.stat}</p>
              <p className="mt-3 text-lg font-medium tracking-tight text-[#f4ede6]/85">{problem.statLabel}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Solution ─────────────────────────────────────── */}
      <section id="science" className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-lg font-medium tracking-tight text-forest-500">{solution.kicker}</p>
            <h2 className="font-display mt-4 text-5xl leading-[1] md:text-6xl">{solution.title}</h2>
            <p className="lede mx-auto mt-6 max-w-2xl text-lg text-muted">{solution.body}</p>
            <Link href="/science" className="mt-6 inline-flex items-center gap-2 font-semibold underline decoration-sage decoration-2 underline-offset-4">
              How NutriCore™ works <ArrowRight />
            </Link>
          </Reveal>

          <Reveal className="mt-14">
            <NutriCoreOrbit />
          </Reveal>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────── */}
      <section className="py-20 text-forest md:py-24">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-center text-5xl md:text-6xl">{stats.title}</h2>
          </Reveal>
          <dl className="mt-14 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
            {stats.items.map((s) => (
              <div key={s.label} className="corners p-6 text-center ring-1 ring-forest/25 transition hover:bg-forest/[0.04] md:p-10">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp value={s.value} className="block text-5xl font-semibold tracking-[-0.06em] text-sage md:text-6xl" />
                  <span className="mt-2 block text-forest/75">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Sustainability ───────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="lg:order-2">
            <div className="corners relative aspect-[4/3] bg-sand">
              <Image src="/images/cows-poster.jpg" alt="Cows grazing on a summer pasture" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <video className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden" src="/videos/cows.mp4" poster="/images/cows-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow text-forest-500">Sustainability</p>
            <h2 className="h-xl mt-3">{sustainability.title}</h2>
            <p className="lede mt-5 text-lg text-muted">{sustainability.body}</p>
            <ul className="mt-6 space-y-3">
              {["Plant-based capsule shells", "Recyclable packaging", "Concentrated = fewer trucks"].map((t) => (
                <li key={t} className="flex items-center gap-3 font-medium">
                  <span className="grid size-6 place-items-center keep-round bg-sage text-forest"><Check className="size-3.5" /></span>
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/sustainability" className="btn btn-dark mt-8">
              Learn more <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Products: pinned heading, cards fly past ───── */}
      <ProductsShowcase />

      {/* ── Field trials + Aqua on request (split, map + parallax photo) ── */}
      <ScrollProgress id="trials" className="trials grid lg:min-h-[100svh] lg:grid-cols-2">
        {/* Left: map */}
        <div className="flex flex-col justify-between gap-10 bg-[#f4ede6] px-[var(--gutter)] pb-10 pt-20 md:pt-28 lg:pb-16">
          <Reveal>
            <h2 className="font-display max-w-[11ch] text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.95] text-forest">{trials.title}</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-forest/80">
              We&rsquo;re currently testing in {trials.sites.map((s) => s.country).join(", ")} and more.
            </p>
          </Reveal>
          <div className="-mx-[calc(var(--gutter)*0.6)] text-forest lg:-mr-[calc(var(--gutter)-16px)]">
            <TrialsMap sites={trials.sites} />
          </div>
        </div>

        {/* Right: photo with floating notes + Aqua on request */}
        <div className="relative isolate min-h-[88svh] overflow-hidden bg-forest-900 text-[#f4ede6] lg:min-h-0">
          <Image src="/images/fish-farm-poster.jpg" alt="Aerial view of round fish-farm cages on a calm lake" fill sizes="(min-width: 1024px) 50vw, 100vw" className="trials-photo -z-20 object-cover" />
          <video className="trials-photo absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden" src="/videos/fish-farm.mp4" poster="/images/fish-farm-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(31_37_9/0.25)_0%,rgb(31_37_9/0.15)_45%,rgb(31_37_9/0.75)_100%)]" />

          {/* floating notes, stacked edge to edge */}
          <div className="trials-notes absolute inset-x-0 top-6 flex flex-col items-end gap-4 md:top-10 md:gap-5">
            <div className="corners w-[46%] min-w-[170px] max-w-[300px] bg-[#f4ede6] p-4 text-forest md:p-5" style={{ ["--corner" as string]: "#f4ede6" }}>
              <p className="text-lg font-semibold leading-tight tracking-[-0.02em] md:text-xl">Next update</p>
              <p className="mt-10 text-[11px] font-medium uppercase leading-snug tracking-[0.04em] text-forest/80 md:mt-14">{trials.next}</p>
            </div>
            <div className="corners mr-[30%] w-[40%] min-w-[160px] max-w-[260px] bg-[#f4ede6] p-4 text-forest md:p-5" style={{ ["--corner" as string]: "#f4ede6" }}>
              <p className="text-lg font-semibold leading-tight tracking-[-0.02em] md:text-xl">Why we share this</p>
              <p className="mt-10 text-[11px] font-medium uppercase leading-snug tracking-[0.04em] text-forest/80 md:mt-14">{trials.why}</p>
            </div>
          </div>

          <div className="absolute inset-x-6 bottom-14 md:inset-x-10 md:bottom-20 lg:inset-x-12">
            <h3 className="font-display max-w-[22ch] text-[clamp(2rem,3.4vw,3.2rem)] leading-[0.98]">{onRequest.title}</h3>
            <p className="mt-4 max-w-md text-[#f4ede6]/80">{onRequest.body}</p>
            <RequestButton product="Faunora Aqua™" className="btn btn-light mt-6">
              Request product <ArrowRight />
            </RequestButton>
          </div>
        </div>
      </ScrollProgress>

      {/* ── Testimonials ─────────────────────────────── */}
      <TestimonialSlider />

      {/* ── Community: carousel over a full-bleed landscape ─ */}
      <section className="relative isolate overflow-hidden bg-forest-900 py-16 text-[#f4ede6] md:py-20 lg:min-h-[100svh] lg:py-24">
        {/* poster image (also the fallback when motion is reduced) + looping background video */}
        <Image src="/images/pasture-wide.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
          src="/videos/pasture.mp4"
          poster="/images/pasture-wide.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#1f2509_0%,rgb(31_37_9/0.92)_10%,rgb(31_37_9/0.75)_20%,rgb(31_37_9/0.55)_32%,rgb(31_37_9/0.4)_46%,rgb(31_37_9/0.35)_62%,rgb(31_37_9/0.6)_100%)]" />
        <div className="container-x relative flex h-full flex-col lg:min-h-[calc(100svh-12rem)]">
          <div className="flex items-start justify-between gap-6">
            <h2 className="font-display max-w-[17ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95]">Latest from the community</h2>
            <Link href="/blog" className="btn btn-ghost hidden shrink-0 text-[#f4ede6] md:inline-flex [--fill:#f4ede6] [--fill-text:var(--forest)]">
              All articles <ArrowRight />
            </Link>
          </div>
          <div className="relative mt-10 lg:mt-auto lg:pl-[34%]">
            <CommunityCarousel posts={posts} />
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────── */}
      <section className="bg-[linear-gradient(180deg,var(--olive)_0%,var(--olive)_50%,#62723c_60%,#7a8853_69%,#9aa476_78%,#bfc4a0_86%,#d9dbc4_93%,#ebe8d9_100%)] pb-28 pt-20 text-[#f4ede6] md:pb-36 md:pt-28">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="font-display mx-auto max-w-4xl text-5xl leading-[1] md:text-6xl">{closing.title}</h2>
            <p className="lede mx-auto mt-5 max-w-xl text-lg text-[#f4ede6]/80">{closing.body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <RequestButton className="btn btn-light">Request product</RequestButton>
              <Link href="/contact" className="btn btn-ghost">Talk to our team</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
