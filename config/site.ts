/**
 * Centralized brand/site configuration. Every UI component reads from here —
 * never hardcode brand name, copy, links, colors, or metadata in components.
 * To re-skin this template for a new brand, edit only .env (and this file's
 * static fallbacks/content blocks below).
 */

const env = (key: string, fallback = "") => process.env[key] ?? fallback;

export const siteConfig = {
  name: env("NEXT_PUBLIC_SITE_NAME", "Algaeo"),
  tagline: env("NEXT_PUBLIC_SITE_TAGLINE", "Live Microbial Biology for Regenerative Agriculture"),
  description: env(
    "NEXT_PUBLIC_SITE_DESCRIPTION",
    "GrowForce is a 12-strain live microbial consortia that unlocks bound nitrogen, solubilizes phosphorus, and improves moisture retention at $2–5 per acre. Lab grown in Knoxville, TN.",
  ),
  url: env("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),

  // Contact / footer
  supportEmail: env("NEXT_PUBLIC_SUPPORT_EMAIL", "hello@algaeo.com"),
  locationLabel: env("NEXT_PUBLIC_LOCATION_LABEL", "Knoxville, TN"),

  // Theme tokens — map to CSS variables in globals.css
  theme: {
    fontDisplay: env("NEXT_PUBLIC_FONT_DISPLAY", "DM Serif Display"),
    fontBody: env("NEXT_PUBLIC_FONT_BODY", "Geist"),
    colorPrimary: env("NEXT_PUBLIC_COLOR_PRIMARY", "#2F6D64"),
    colorPrimaryMid: env("NEXT_PUBLIC_COLOR_PRIMARY_MID", "#3d8c82"),
    colorAccent: env("NEXT_PUBLIC_COLOR_ACCENT", "#5BCC4A"),
    colorAccentPale: env("NEXT_PUBLIC_COLOR_ACCENT_PALE", "#e8f5e4"),
    colorBg: env("NEXT_PUBLIC_COLOR_BG", "#F7F8F5"),
    colorTextDark: env("NEXT_PUBLIC_COLOR_TEXT_DARK", "#1a1f1e"),
    colorTextMid: env("NEXT_PUBLIC_COLOR_TEXT_MID", "#4a5552"),
    colorBorder: env("NEXT_PUBLIC_COLOR_BORDER", "#e2e8e6"),
    radiusCard: env("NEXT_PUBLIC_RADIUS_CARD", "12px"),
    radiusBtn: env("NEXT_PUBLIC_RADIUS_BTN", "6px"),
  },

  // Logo assets in /public. Use the light logo on light backgrounds, dark on dark.
  logo: {
    light: env("NEXT_PUBLIC_LOGO_LIGHT", "/logo.png"),
    dark: env("NEXT_PUBLIC_LOGO_DARK", "/logo-dark.png"),
  },

  // Primary nav — edit per brand
  nav: [
    { label: "Shop", href: "/shop" },
    { label: "News", href: "/blog" },
    { label: "For Co-Ops", href: "/co-op-partners" },
    { label: "AutoModule", href: "/automodule" },
    { label: "About", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ],

  // Commerce
  commerce: {
    freeShippingThreshold: Number(env("NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD", "75")),
    currency: env("NEXT_PUBLIC_CURRENCY", "usd"),
  },

  social: {
    twitter: env("NEXT_PUBLIC_SOCIAL_TWITTER", ""),
    instagram: env("NEXT_PUBLIC_SOCIAL_INSTAGRAM", ""),
  },
} as const;

export type SiteConfig = typeof siteConfig;
