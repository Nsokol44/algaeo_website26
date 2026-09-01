/**
 * Centralized brand/site configuration. Every UI component reads from here —
 * never hardcode brand name, copy, links, colors, or metadata in components.
 */

const env = (key: string, fallback = "") => process.env[key] ?? fallback;

export const siteConfig = {
  name: env("NEXT_PUBLIC_SITE_NAME", "Algaeo"),
  tagline: env("NEXT_PUBLIC_SITE_TAGLINE", "Independent Formulation Guidance for Co-Ops"),
  description: env(
    "NEXT_PUBLIC_SITE_DESCRIPTION",
    "Algaeo turns soil type, crop type, and field data into fertilizer blend recommendations for co-op agronomists and commercial blenders — independent of any manufacturer, so the advice isn't tied to a sale.",
  ),
  url: env("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),

  // Contact / footer
  supportEmail: env("NEXT_PUBLIC_SUPPORT_EMAIL", "hello@algaeo.com"),
  locationLabel: env("NEXT_PUBLIC_LOCATION_LABEL", "Knoxville, TN"),

  // Theme tokens — map to CSS variables in globals.css. Unchanged from the
  // consumer-product era: still an algae/water-biology brand, just selling
  // the formulation intelligence behind it rather than a bottle.
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

  // Primary nav — no /shop, /cart, /co-op-partners, or /automodule anymore.
  // Sales motion is direct outreach + demo request, not self-serve checkout.
  nav: [
    { label: "Platform", href: "/platform" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ],

  social: {
    twitter: env("NEXT_PUBLIC_SOCIAL_TWITTER", ""),
    instagram: env("NEXT_PUBLIC_SOCIAL_INSTAGRAM", ""),
  },
} as const;

export type SiteConfig = typeof siteConfig;
