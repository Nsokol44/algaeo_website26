# Algaeo — Next.js 15 + Supabase (B2B SaaS)

Marketing + blog CMS site for Algaeo, a **subscription formulation-intelligence platform** sold to
co-ops and commercial fertilizer blenders: **Next.js 15 (App Router) · React 19 · Supabase (Postgres +
Auth) · Tailwind CSS**.

---

## This is a pivot, not the original site

Algaeo started as a direct-to-consumer biofertilizer liquid — a physical, regulated product requiring
state-by-state fertilizer registration. It's now repositioned entirely as **B2B software**: a
digital-twin model that takes soil type, crop type, and field data and generates fertilizer blend
recommendations, sold as a subscription to co-ops and commercial blenders. The co-op does the actual
physical blending and already holds the fertilizer registration as a licensed distributor — Algaeo
sells software and agronomic intelligence, never touching a regulated substance.

**Everything commerce-related has been removed**, not just hidden: shop, cart, checkout, Stripe,
webhooks, shipping labels, product/order dashboards, and product reviews are all gone. The earlier
e-commerce database migrations are preserved for history in
`supabase/migrations/_deprecated_ecommerce/` but are not run — this project runs on a fresh schema
(`0001_saas_init.sql`) with just three tables: `profiles` (admin auth), `posts` (blog CMS), and `leads`
(demo requests — now the entire site's conversion goal, replacing "add to cart").

## What's here now

- **Marketing pages**: homepage, `/platform` (how the digital-twin model works), `/pricing` (3 tiers,
  all demo-gated — sales motion is direct outreach, not self-serve billing, per the actual go-to-market
  strategy), `/request-demo`, `/about-us`, `/contact`
- **Blog**: 3 launch posts on the actual repositioning (manufacturer-rep conflict of interest, what the
  model does with soil/crop data, why no fertilizer registration is needed) — replacing the 30 old
  consumer GrowForce articles
- **Dashboard**: blog CMS (unchanged) + a new `/dashboard/leads` page to view demo requests, which
  didn't exist before since the old site's conversion goal was checkout, not a form submission
- **Pilot offer**: a paid-pilot section on the homepage, `/pricing`, and `/platform`, routed to
  `/contact?topic=pilot` (stored as `source = 'pilot'` in `leads`)
- **Legal**: privacy policy and terms of service rewritten for a software/data context — no more
  shipping/returns policies, since there's no physical product
- **The ambient bubble/algae-drift visual motif is unchanged** — still genuinely fits an algae-biology
  brand even as a SaaS company, so unlike the sibling brand sites forked from this codebase, it was
  kept rather than removed

## What's NOT here (by design)

No self-serve subscription billing (Stripe Billing, etc.) — the stated go-to-market is direct outreach
to co-ops, extension-service relationships, and industry conferences, not instant sign-up. Every
pricing tier routes to `/request-demo`. Add real billing once the sales motion is proven and a co-op
actually needs to self-serve upgrade/downgrade.

No product-recommendation engine itself — this repo is the marketing/content/lead-gen site around the
platform, not the digital-twin model or its API. That's a separate application.

---

## After deploying: two things the code can't fix

The live site can show older positioning than this repo, for two reasons:

1. **Environment variables override `config/site.ts`.** If `NEXT_PUBLIC_SITE_TAGLINE`,
   `NEXT_PUBLIC_SITE_DESCRIPTION`, or `NEXT_PUBLIC_SUPPORT_EMAIL` are set in Vercel with older values,
   the page title, social title, footer text, and contact email will keep showing them. Update or
   delete them in Vercel → Settings → Environment Variables, then redeploy.
2. **Blog posts live in the database, not the repo.** Run
   `supabase/maintenance/unpublish-legacy-posts.sql` in the Supabase SQL Editor to draft the old
   biofertilizer-era posts.

## Prerequisites

- Node.js 18.18+ (or 20+)
- A free [Supabase](https://supabase.com) project

## 1. Install

```bash
npm install
cp .env.example .env.local
```

## 2. Create the database schema

Run `supabase/migrations/0001_saas_init.sql` then `0002_storage.sql` in the Supabase SQL Editor, or
`supabase db push`. Do **not** run anything in `_deprecated_ecommerce/` — kept for historical reference
only.

## 3. Seed the blog

```bash
npm run seed
```

## 4. Create your admin user

In Supabase → **Authentication → Users → Add user**, then in the SQL Editor:

```sql
update public.profiles set is_admin = true where email = 'you@example.com';
```

## 5. Run it

```bash
npm run dev          # http://localhost:3000
```

## Deploy to Vercel

Push to GitHub, import in Vercel, add every variable from `.env.local` to Vercel's environment
variables, deploy. No Stripe webhook to register — there's nothing to bill yet.
