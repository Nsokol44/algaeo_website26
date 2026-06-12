# Algaeo — Next.js 15 + Supabase

A full rebuild of [algaeo.com](https://algaeo.com) migrating off WordPress/WooCommerce to a
serverless stack: **Next.js 15 (App Router) · React 19 · Supabase (Postgres + Auth) · Stripe ·
Tailwind CSS · Zustand**.

Everything from the original site is here — marketing pages, the shop and product pages, cart and
Stripe checkout, the interactive Blend Finder, the full blog — plus a password-protected **admin
dashboard** for writing and publishing articles in Markdown.

---

## What's included

| Area | Route | Notes |
|------|-------|-------|
| Homepage | `/` | Hero, trial data, co-op value, AutoModule, free-sample CTA, Blend Finder, ingredient transparency, latest articles |
| Shop | `/shop`, `/shop/[slug]` | Category filtering, product detail, add-to-cart |
| Cart & checkout | `/cart` → Stripe Checkout → `/checkout/success` | Prices re-validated server-side |
| Blog | `/blog`, `/blog/[slug]` | Markdown rendering, JSON-LD, static generation |
| Marketing | `/about-us`, `/co-op-partners`, `/automodule`, `/contact`, `/privacy-policy` | Contact form writes to `leads` |
| **Admin dashboard** | `/dashboard` | Auth-gated. Create / edit / publish / unpublish / delete posts with live Markdown preview |
| Auth | `/login` | Supabase email + password |
| API | `/api/checkout`, `/api/webhooks/stripe` | Checkout session + order webhook |

Content already migrated from your WordPress export: **30 blog posts** and **10 products**
(`supabase/seed/`).

---

## Prerequisites

- Node.js 18.18+ (or 20+)
- A free [Supabase](https://supabase.com) project
- A [Stripe](https://stripe.com) account (test mode is fine to start)

---

## 1. Install

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...        # Supabase → Project Settings → API
SUPABASE_SERVICE_ROLE_KEY=...            # same page — keep secret, server only
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...          # from `stripe listen` or the dashboard
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 2. Create the database schema

Open the Supabase **SQL Editor** and run the contents of
[`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql).
(Or, with the Supabase CLI: `supabase db push`.)

This creates `products`, `posts`, `orders`, `order_items`, `profiles`, and `leads`, with Row Level
Security policies and an `is_admin()` helper.

## 3. Seed your content

```bash
npm run seed
```

Loads the 30 posts and 10 products into Supabase. Safe to re-run (upserts on `slug`).

## 4. Create your admin user

1. In Supabase → **Authentication → Users → Add user**, create yourself an account
   (email + password). A `profiles` row is created automatically.
2. Promote it to admin in the **SQL Editor**:

   ```sql
   update public.profiles set is_admin = true where email = 'you@example.com';
   ```

Only admins can reach `/dashboard` or write posts — enforced both in middleware and by RLS.

## 5. Run it

```bash
npm run dev          # http://localhost:3000
```

Sign in at `/login`, then head to `/dashboard` to write your first article.

---

## Stripe checkout & order webhook

Test the full payment flow locally with the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# copy the printed whsec_... into STRIPE_WEBHOOK_SECRET
```

On a successful payment, `checkout.session.completed` fires and the webhook records the order in the
`orders` table using the service-role client (which bypasses RLS).

---

## Deploy to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Add every variable from `.env.local` to **Vercel → Settings → Environment Variables**
   (set `NEXT_PUBLIC_SITE_URL` to your production domain).
3. In the **Stripe dashboard**, add a webhook endpoint pointing at
   `https://yourdomain.com/api/webhooks/stripe` and copy its signing secret into Vercel.
4. Deploy.

The old WordPress URLs (`/product/...`, dated blog permalinks, `/contact-us`, `/my-account`) are
301-redirected to their new homes in [`next.config.ts`](next.config.ts) so you keep your SEO
authority.

---

## Project structure

```
src/
  app/
    (marketing)/        about-us · automodule · co-op-partners · contact · privacy-policy
    api/                checkout · webhooks/stripe
    blog/               list + [slug]
    shop/               list + [slug]
    cart/  checkout/    cart page + success
    dashboard/          admin CMS (layout, list, posts/new, posts/[id], actions.ts)
    login/              Supabase auth
    layout.tsx  page.tsx  globals.css
  components/           layout · home · shop · dashboard
  lib/
    supabase/           client · server · middleware helpers
    queries.ts          typed data-access layer
    stripe.ts  types.ts  format.ts
  store/cart.ts         Zustand cart (persisted to localStorage)
supabase/
  migrations/0001_init.sql
  seed/                 posts.json · products.json · seed.ts
middleware.ts           session refresh + dashboard gate
next.config.ts          301 redirects from WordPress
```

## How to manage your blog

The dashboard replaces the WordPress editor. Sign in, click **+ New Article**, write in Markdown with
a live preview, then **Save Draft** or **Publish**. Published posts appear instantly on `/blog`
(paths are revalidated on save). No rebuild or redeploy needed to publish.

## Notes

- Product and post images use neutral placeholders. Upload images to a Supabase Storage bucket and
  set `image_url` / `cover_image` to wire them in.
- Transactional email (receipts beyond Stripe's) isn't included — add [Resend](https://resend.com)
  in the webhook handler when you're ready.
