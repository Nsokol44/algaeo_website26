import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "algaeo.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  // 301 redirects preserve SEO authority from the old WordPress URL structure.
  async redirects() {
    return [
      // Old WP product permalinks → new /shop/[slug]
      { source: "/product/:slug", destination: "/shop/:slug", permanent: true },
      { source: "/product-category/:slug", destination: "/shop", permanent: true },
      // Old WP blog: dated permalinks /YYYY/MM/DD/slug → /blog/slug
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      // Renamed pages
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/my-account", destination: "/login", permanent: true },
    ];
  },
};

export default nextConfig;
