import Link from "next/link";
import { nav, site } from "@/content/site";
import { LogoMark } from "./logo";

export function Footer() {
  const groups = nav.filter((n) => "items" in n);
  return (
    <footer className="bg-navy text-white">
      <div className="container-x pt-16 pb-8 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <LogoMark className="h-12 w-auto text-orange" />
            <p className="font-display mt-6 text-4xl leading-[1.05] md:text-5xl">{site.footerTagline}</p>
            <p className="mt-6 text-white/70">If you have any questions, feel free to contact us.</p>
            <a href={`mailto:${site.email}`} className="mt-2 inline-block text-lg font-semibold underline decoration-orange decoration-2 underline-offset-4">
              {site.email}
            </a>
            <div className="mt-6 flex gap-3">
              <a href={site.linkedin} className="rounded-full border border-white/25 px-4 py-2 text-sm hover:bg-white/10" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={site.instagram} className="rounded-full border border-white/25 px-4 py-2 text-sm hover:bg-white/10" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {groups.map((g) => (
              <div key={g.label}>
                <p className="eyebrow text-orange">{g.label}</p>
                <ul className="mt-4 space-y-3">
                  {"items" in g &&
                    g.items.map((i) => (
                      <li key={i.href}>
                        <Link href={i.href} className="text-white/80 hover:text-white">{i.label}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="eyebrow text-orange">More</p>
              <ul className="mt-4 space-y-3">
                <li><Link href="/blog" className="text-white/80 hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="text-white/80 hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Faunora. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
