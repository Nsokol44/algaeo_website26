import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Bubbles } from "@/components/layout/Bubbles";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: { siteName: siteConfig.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

// Brand theme tokens, exposed as CSS variables so globals.css and Tailwind
// utilities resolve to the values configured in /config/site.ts (env-driven).
const themeStyle = {
  "--brand-font-display": `"${siteConfig.theme.fontDisplay}"`,
  "--brand-font-body": `"${siteConfig.theme.fontBody}"`,
  "--brand-primary": siteConfig.theme.colorPrimary,
  "--brand-primary-mid": siteConfig.theme.colorPrimaryMid,
  "--brand-accent": siteConfig.theme.colorAccent,
  "--brand-accent-pale": siteConfig.theme.colorAccentPale,
  "--brand-bg": siteConfig.theme.colorBg,
  "--brand-text-dark": siteConfig.theme.colorTextDark,
  "--brand-text-mid": siteConfig.theme.colorTextMid,
  "--brand-border": siteConfig.theme.colorBorder,
} as React.CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={themeStyle}>
      <body>
        <Bubbles />
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
