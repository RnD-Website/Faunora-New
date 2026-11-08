import Image from "next/image";
import Link from "next/link";
import { home, posts, products } from "@/content/site";
import { ProductCard, PostCard } from "@/components/cards";
import { HeroIntro } from "@/components/intro/hero-intro";
import { Reveal } from "@/components/reveal";
import { RequestButton } from "@/components/request-modal";
import { ArrowRight, Capsule, Check, Pin, Sparkle } from "@/components/icons";
import { NutriCoreOrbit } from "@/components/nutricore-orbit";

export default function Home() {
  const { hero, marquee, problem, solution, stats, sustainability, trials, onRequest, closing } = home;

  return (
    <>
      {/* ── Intro hero: loader, lights-on, scroll zoom ───── */}
      <HeroIntro />

      {/* ── Welcome ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-beige">
        <div className="container-x grid items-center gap-10 pb-16 pt-16 md:pt-24 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
          <div>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-forest">
              <Sparkle className="size-3.5 text-sage" /> Vet-formulated animal nutrition
            </p>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.95]">Made for the animals you love.</h2>
                        <p className="lede mt-6 max-w-xl text-lg text-forest/75">{hero.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#products" className="btn btn-dark">
                Explore products <ArrowRight />
              </Link>
              <RequestButton className="btn btn-ghost">Request a sample</RequestButton>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[48px] rounded-tr-[160px] bg-sand">
              <Image
                src="/images/hero-owner-dog.jpg"
                alt="A woman kissing her happy golden retriever outdoors"
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="float absolute -left-3 top-10 rounded-2xl bg-white px-4 py-3 shadow-xl md:-left-8">
              <p className="text-2xl font-semibold tracking-tight">3×</p>
              <p className="text-xs text-muted">absorption*</p>
            </div>
            <div className="float absolute -right-2 bottom-12 flex items-center gap-3 rounded-2xl bg-forest px-4 py-3 text-white shadow-xl [animation-delay:1.5s] md:-right-6">
              <span className="grid size-9 place-items-center rounded-full bg-sage text-forest">
                <Capsule className="size-5" />
              </span>
              <span className="text-sm font-semibold leading-tight">NutriCore™<br /><span className="font-normal text-white/70">micro-capsules</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────── */}
      <section aria-label="Highlights" className="overflow-hidden border-y border-line bg-white py-5">
        <div className="marquee-track flex w-max gap-12">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap text-lg font-semibold tracking-tight text-forest/80" aria-hidden={i >= marquee.length}>
              {m}
              <Sparkle className="size-4 text-sage" />
            </span>
          ))}
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-card)] bg-beige">
              <Image src="/images/empty-bowl.jpg" alt="A dog standing beside a nearly empty food bowl" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow text-forest-500">The problem</p>
            <h2 className="h-xl mt-3">{problem.title}</h2>
            <p className="lede mt-5 text-lg text-muted">{problem.body}</p>
            <div className="mt-8 rounded-[var(--radius-card)] bg-sage/10 p-6 ring-1 ring-sage/30">
              <p className="font-display text-6xl text-forest">{problem.stat}</p>
              <p className="mt-2 text-lg font-medium tracking-tight">{problem.statLabel}</p>
              <p className="mt-3 text-xs text-muted">{problem.source}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Solution ─────────────────────────────────────── */}
      <section id="science" className="bg-paper py-20 md:py-28">
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
      <section className="bg-forest py-20 text-white md:py-24">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-center text-5xl md:text-6xl">{stats.title}</h2>
          </Reveal>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/15 lg:grid-cols-4">
            {stats.items.map((s) => (
              <div key={s.label} className="bg-forest p-6 text-center md:p-10">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-5xl font-semibold tracking-[-0.06em] text-sage-200 md:text-6xl">{s.value}</span>
                  <span className="mt-2 block text-white/75">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-center text-xs text-white/50">*{stats.footnote}</p>
        </div>
      </section>

      {/* ── Sustainability ───────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] rounded-bl-[120px] bg-sand">
              <Image src="/images/pasture-cows.jpg" alt="Cows grazing on a lush green pasture" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow text-forest-500">Sustainability</p>
            <h2 className="h-xl mt-3">{sustainability.title}</h2>
            <p className="lede mt-5 text-lg text-muted">{sustainability.body}</p>
            <ul className="mt-6 space-y-3">
              {["Plant-based capsule shells", "Recyclable packaging", "Concentrated = fewer trucks"].map((t) => (
                <li key={t} className="flex items-center gap-3 font-medium">
                  <span className="grid size-6 place-items-center rounded-full bg-sage text-forest"><Check className="size-3.5" /></span>
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

      {/* ── Products ─────────────────────────────────────── */}
      <section id="products" className="bg-beige-50 py-20 md:py-28">
        <div className="container-x">
          <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-forest-500">Products</p>
              <h2 className="h-xl mt-3 max-w-2xl">{home.products.title}</h2>
            </div>
            <p className="max-w-sm text-lg text-muted">{home.products.body}</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Field trials ─────────────────────────────────── */}
      <section id="trials" className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-forest-500">Currently testing</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {trials.sites.map((s) => (
                <span key={s.country} className="inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-sm font-medium ring-1 ring-line">
                  <Pin className="size-4 text-sage" /> {s.country}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <h2 className="h-xl">{trials.title}</h2>
              <p className="lede mt-4 max-w-xl text-lg text-muted">{trials.body}</p>
              <ul className="mt-8 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] ring-1 ring-line">
                {trials.sites.map((s) => (
                  <li key={s.country} className="flex items-center justify-between gap-4 bg-white px-5 py-4">
                    <div>
                      <p className="font-semibold tracking-tight">{s.country}</p>
                      <p className="text-sm text-muted">{s.species}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        s.status === "Complete" ? "bg-teal-50 text-forest" : "bg-sage/15 text-forest"
                      }`}
                    >
                      <span className={`size-2 rounded-full ${s.status === "Complete" ? "bg-teal" : "animate-pulse bg-sage"}`} />
                      {s.status}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-6">
              <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-[var(--radius-card)] bg-sand">
                <Image src="/images/farmer-vet.jpg" alt="A dairy farmer and a veterinarian talking beside a truck" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <div className="rounded-[var(--radius-card)] bg-forest p-6 text-white">
                <p className="font-semibold">{trials.next}</p>
                <p className="mt-2 text-white/70">{trials.why}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── On request ───────────────────────────────────── */}
      <section className="px-4 md:px-8">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[40px] bg-forest">
          <Image src="/images/fish-cages.jpg" alt="Fish farm cages on a calm lake" fill sizes="100vw" className="object-cover opacity-45" />
          <div className="relative grid gap-6 p-8 text-white md:p-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <span className="eyebrow rounded-full bg-sage px-3 py-1 text-forest">Limited release</span>
              <h2 className="font-display mt-5 text-4xl leading-[1.02] md:text-6xl">{onRequest.title}</h2>
              <p className="lede mt-4 max-w-xl text-lg text-white/85">{onRequest.body}</p>
            </div>
            <div className="lg:text-right">
              <RequestButton product="Faunora Aqua™" className="btn btn-primary">
                Request product <ArrowRight />
              </RequestButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal className="flex items-end justify-between gap-4">
            <h2 className="h-xl">Latest from the community</h2>
            <Link href="/blog" className="hidden items-center gap-2 font-semibold md:inline-flex">
              All articles <ArrowRight />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 100}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────── */}
      <section className="bg-olive py-20 text-[#f4ede6] md:py-28">
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
