-- ============================================================
-- Algaeo B2B SaaS — Migration 0001: core schema
-- profiles (admin auth), posts (blog CMS), leads (demo requests) + RLS
-- Run via: supabase db push  (or paste into the SQL editor)
--
-- This replaces the earlier e-commerce schema (see
-- supabase/migrations/_deprecated_ecommerce/ — kept for history, not run).
-- Algaeo pivoted from a D2C biofertilizer (regulated substance, state-by-
-- state fertilizer registration) to a B2B precision-ag formulation API/SaaS
-- sold to co-ops and commercial blenders. The co-op does the physical
-- blending and already holds the fertilizer registration as a licensed
-- distributor; Algaeo sells software and agronomic intelligence, so there's
-- no product/order/shipping schema here at all — just content (blog) and
-- lead capture (demo requests), which is what a sales-assisted B2B SaaS
-- marketing site actually needs.
-- ============================================================

-- ── Admin profiles ────────────────────────────────────────
-- One row per auth user. `is_admin` gates the dashboard (blog CMS + leads).
create table public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  full_name  text,
  is_admin   boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles self read" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles self update" on public.profiles
  for update using (auth.uid() = id);

-- Helper used throughout RLS policies below.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Blog / content marketing ─────────────────────────────────
create table public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text,
  content       text not null default '',
  cover_image   text,
  category      text,
  author        text,
  status        text not null default 'draft' check (status in ('draft', 'published')),
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index posts_status_published_idx on public.posts (status, published_at desc);

alter table public.posts enable row level security;

create policy "posts public read published" on public.posts
  for select using (status = 'published');
create policy "posts admin all" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

-- ── Leads (demo requests, pricing inquiries, general contact) ──
-- The whole site's conversion goal is "request a demo" — sales-assisted,
-- not self-serve checkout — so this table (not a subscriptions/billing
-- schema) is the actual core of the site's commercial function.
create table public.leads (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text not null,
  org        text,
  message    text,
  source     text not null default 'contact', -- 'demo-request' | 'pricing' | 'contact' | 'newsletter'
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Public can submit (INSERT only — never read others' leads).
create policy "leads public insert" on public.leads
  for insert with check (true);
create policy "leads admin read" on public.leads
  for select using (public.is_admin());
