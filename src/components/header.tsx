"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./logo";
import { ChevronDown, Close, Menu } from "./icons";
import { RequestButton } from "./request-modal";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on navigation (adjust state during render, no effect needed)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
    <header
      data-tone={pathname === "/" && !scrolled && !mobileOpen ? "light" : undefined}
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled || mobileOpen ? "bg-[#f4ede6]/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            "items" in item ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  aria-expanded={openMenu === item.label}
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  className="flex items-center gap-1 rounded-full px-4 py-2 font-medium tracking-tight hover:bg-beige-50"
                >
                  {item.label}
                  <ChevronDown className={`size-4 transition ${openMenu === item.label ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`absolute left-0 top-full pt-2 transition ${
                    openMenu === item.label ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <ul className="corners w-72 border border-line bg-white p-2 shadow-xl">
                    {item.items.map((sub) => (
                      <li key={sub.href}>
                        <Link href={sub.href} className="block rounded-2xl px-4 py-3 hover:bg-beige-50">
                          <span className="block font-semibold tracking-tight">{sub.label}</span>
                          <span className="block text-sm text-muted">{sub.note}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={item.label} href={item.href} className="rounded-full px-4 py-2 font-medium tracking-tight hover:bg-beige-50">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn btn-ghost hidden !py-2.5 md:inline-flex">
            Contact Us
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-forest text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile menu — outside <header> so backdrop-filter doesn't trap position:fixed */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-white transition lg:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x flex flex-col gap-6 py-8">
          {nav.map((item) =>
            "items" in item ? (
              <div key={item.label}>
                <p className="eyebrow mb-2 text-forest-500">{item.label}</p>
                <ul className="space-y-1">
                  {item.items.map((sub) => (
                    <li key={sub.href}>
                      <Link href={sub.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-2xl font-semibold tracking-tight">
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="text-2xl font-semibold tracking-tight">
                {item.label}
              </Link>
            ),
          )}
          <div className="flex flex-col gap-3 pt-4">
            <RequestButton className="btn btn-primary">Request sample</RequestButton>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn btn-ghost">
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
