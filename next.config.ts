import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "algaeo.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  // Redirects for routes that existed under the old D2C e-commerce model —
  // preserves any existing inbound links/SEO authority rather than 404ing.
  async redirects() {
    return [
      { source: "/shop", destination: "/pricing", permanent: true },
      { source: "/shop/:slug", destination: "/platform", permanent: true },
      { source: "/cart", destination: "/pricing", permanent: true },
      { source: "/checkout/success", destination: "/", permanent: false },
      { source: "/co-op-partners", destination: "/platform", permanent: true },
      { source: "/automodule", destination: "/platform", permanent: true },
      { source: "/shipping-policy", destination: "/terms-of-service", permanent: true },
      { source: "/returns-policy", destination: "/terms-of-service", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/my-account", destination: "/login", permanent: true },
    ];
  },
};

export default nextConfig;
