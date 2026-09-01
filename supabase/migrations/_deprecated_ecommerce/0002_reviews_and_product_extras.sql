-- ============================================================
-- Migration 0002: product reviews + extra product fields
-- (application rate, shelf life, growth guarantee window)
-- Run after 0001_init.sql via: supabase db push (or paste into SQL editor)
-- ============================================================

-- ── Extra product fields ─────────────────────────────────────
-- These surface on the product detail page to close the #1 objection
-- customers raise in this category ("does this even do anything?") and
-- the #2 ("how much do I actually need, and will it still be good when
-- it arrives?"). Nullable + additive — existing rows are unaffected.
alter table public.products
  add column if not exists application_rate text,   -- e.g. "2–5 fl oz per gallon, applied every 2–3 weeks"
  add column if not exists shelf_life       text,    -- e.g. "18 months unrefrigerated, sealed"
  add column if not exists guarantee_days   integer; -- e.g. 30 — null means "no guarantee copy shown"

-- ── Reviews ───────────────────────────────────────────────────
create table public.reviews (
  id           uuid primary key default uuid_generate_v4(),
  product_id   uuid not null references public.products (id) on delete cascade,
  author_name  text not null,        -- first name only is shown publicly (enforced in the UI layer,
                                      -- not here, so the admin can still see full context if it's ever entered)
  rating       integer not null check (rating between 1 and 5),
  body         text,
  source       text not null default 'submitted',  -- 'submitted' (via the on-site form) | 'imported'
  approved     boolean not null default false,
  created_at   timestamptz not null default now()
);
create index reviews_product_approved_idx on public.reviews (product_id, approved);

alter table public.reviews enable row level security;

-- Public can read only approved reviews.
create policy "reviews public read approved" on public.reviews
  for select using (approved = true);

-- Admins can read/write everything (moderation queue, imports, edits).
create policy "reviews admin write" on public.reviews
  for all using (public.is_admin()) with check (public.is_admin());

-- No public INSERT policy on purpose: new reviews go through the
-- `submitReview` server action, which uses the service-role client and
-- always forces approved=false server-side — a visitor can never write an
-- approved review directly, and can never write to this table at all
-- through the anon key.
