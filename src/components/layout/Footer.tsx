import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-algaeo-border bg-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Image src={siteConfig.logo.light} alt={siteConfig.name} width={400} height={120} className="h-9 w-auto" />
          <p className="mt-3 max-w-xs text-sm text-algaeo-text-mid">{siteConfig.description}</p>
        </div>

        <FooterCol
          title="Shop"
          links={[
            ["All Products", "/shop"],
            ["Blog", "/blog"],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ["About Us", "/about-us"],
            ["Contact", "/contact"],
          ]}
        />

        <div>
          <h4 className="mb-3 font-semibold">Get in Touch</h4>
          <p className="text-sm text-algaeo-text-mid">{siteConfig.supportEmail}</p>
          <p className="text-sm text-algaeo-text-mid">{siteConfig.locationLabel}</p>
          <Link href="/shop" className="btn-primary mt-4">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="border-t border-algaeo-border">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-algaeo-text-light md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. {siteConfig.locationLabel}.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-3 font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={href + label}>
            <Link href={href} className="text-algaeo-text-mid hover:text-algaeo-green-dark">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
