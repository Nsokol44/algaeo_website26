"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-algaeo-border bg-white/90 backdrop-blur transition-shadow ${
        scrolled ? "shadow-a-sm" : ""
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label={siteConfig.name}>
          <Image
            src={siteConfig.logo.light}
            alt={siteConfig.name}
            width={400}
            height={120}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {siteConfig.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-algaeo-text-mid transition-colors hover:text-algaeo-green-dark"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/request-demo" className="hidden btn-primary sm:inline-flex">
            Request a Demo
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-btn p-2 hover:bg-algaeo-green-pale md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-algaeo-border bg-white md:hidden">
          <div className="container-x flex flex-col py-2">
            {siteConfig.nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-algaeo-border py-3 text-sm font-medium text-algaeo-text-mid last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/request-demo"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 justify-center"
            >
              Request a Demo
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
    </svg>
  );
}
