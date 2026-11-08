import Link from "next/link";
import { nav, site } from "@/content/site";
import { Chew, Sphere } from "./props-3d";

const linkCls = "block w-fit text-forest transition hover:text-forest-500";
const labelCls = "mb-2 text-forest/45";

export function Footer() {
  const groups = nav.filter((n) => "items" in n);
  const socials = [
    { label: "LinkedIn", href: site.linkedin, external: true },
    { label: "Instagram", href: site.instagram, external: true },
    { label: "Email", href: `mailto:${site.email}`, external: false },
  ];

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#f4ede6_0%,#ece8da_38%,#d8dfbd_72%,#b3c28f_100%)] text-forest">
      <div className="container-x pt-12 text-[12.5px] font-medium uppercase tracking-[0.05em] md:pt-16">
        {/* Link columns + socials */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-12">
          {groups.map((g) => (
            <nav key={g.label} aria-label={g.label} className="lg:col-span-2">
              <p className={labelCls}>{g.label}</p>
              <ul className="space-y-2">
                {"items" in g &&
                  g.items.map((i) => (
                    <li key={i.href}>
                      <Link href={i.href} className={linkCls}>
                        {i.label.replace("Faunora ", "")}
                      </Link>
                    </li>
                  ))}
                {g.label === "About" && (
                  <>
                    <li><Link href="/blog" className={linkCls}>Blog</Link></li>
                    <li><Link href="/contact" className={linkCls}>Contact</Link></li>
                  </>
                )}
              </ul>
            </nav>
          ))}
          <ul className="col-span-2 flex flex-wrap justify-between gap-x-8 gap-y-3 sm:col-span-3 lg:col-span-6 lg:pt-6">
            {socials.map((s) => (
              <li key={s.label}>
                {s.external ? (
                  <a href={s.href} target="_blank" rel="noreferrer" className={linkCls}>
                    {s.label}
                  </a>
                ) : (
                  <a href={s.href} className={linkCls}>
                    {s.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Legal row */}
        <div className="mt-20 flex flex-col gap-3 md:mt-28 md:flex-row md:items-end md:justify-between">
          <p className="text-forest/55">© {new Date().getFullYear()} Faunora. All rights reserved.</p>
          <div className="flex gap-10 md:gap-24">
            <Link href="/terms" className={linkCls}>Terms of use</Link>
            <Link href="/privacy" className={linkCls}>Privacy policy</Link>
          </div>
        </div>
      </div>

      {/* Giant wordmark with props resting on and around it */}
      <div className="container-x relative mt-6 md:mt-4">
        <svg viewBox="0 0 1000 196" className="block w-full" role="img" aria-label="Faunora">
          <text
            x="0"
            y="190"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fontSize="262"
            fill="currentColor"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700, fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
          >
            FAUNORA
          </text>
        </svg>

        <Chew id="ft-chew-a" rotate={-14} className="pointer-events-none absolute left-[59%] top-[-30%] w-[11%] drop-shadow-xl" />
        <Chew id="ft-chew-b" rotate={22} className="pointer-events-none absolute left-[22%] top-[28%] w-[7%]" />
        <Sphere id="ft-sphere-a" className="pointer-events-none absolute -left-[1.5%] bottom-[-14%] w-[10%]" />
        <Sphere id="ft-sphere-b" tone="cream" className="pointer-events-none absolute -right-[2%] bottom-[-26%] w-[15%]" />
        <Sphere id="ft-pearl-a" tone="cream" className="pointer-events-none absolute left-[46%] top-[-14%] w-[2.2%]" />
        <Sphere id="ft-pearl-b" className="pointer-events-none absolute left-[78%] top-[-6%] w-[1.6%]" />
        <Sphere id="ft-pearl-c" tone="cream" className="pointer-events-none absolute left-[9%] top-[-10%] w-[1.4%]" />
      </div>
    </footer>
  );
}
