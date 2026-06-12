-- ============================================================
-- White-Label Starter — Migration 0001: core schema
-- profiles, products, posts, orders/order_items, leads + RLS
-- Run via: supabase db push  (or paste into the SQL editor)
-- ============================================================
-- ── Admin profiles ────────────────────────────────────────
-- One row per auth user. `is_admin` gates the blog dashboard.
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Auto-create a profile row whenever a user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Products ──────────────────────────────────────────────
create table public.products (
  id                uuid primary key default uuid_generate_v4(),
  slug              text unique not null,
  title             text not null,
  short_description text,
  description       text,                       -- long-form markdown
  price             numeric(10,2) not null default 0,
  sku               text,
  in_stock          boolean not null default true,
  categories        text[] not null default '{}',
  image_url         text,
  featured          boolean not null default false,
  created_at        timestamptz not null default now()
);
create index products_categories_idx on public.products using gin (categories);

-- ── Blog posts ────────────────────────────────────────────
create type post_status as enum ('draft', 'published');

create table public.posts (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  title         text not null,
  excerpt       text,
  content       text not null default '',       -- markdown
  cover_image   text,
  category      text,
  author        text,
  status        post_status not null default 'draft',
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index posts_status_published_idx on public.posts (status, published_at desc);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger posts_touch before update on public.posts
  for each row execute function public.touch_updated_at();

-- ── Orders ────────────────────────────────────────────────
create type order_status as enum ('pending', 'paid', 'fulfilled', 'cancelled');

create table public.orders (
  id                 uuid primary key default uuid_generate_v4(),
  stripe_session_id  text unique,
  email              text,
  status             order_status not null default 'pending',
  total              numeric(10,2) not null default 0,
  shipping_address   jsonb,
  created_at         timestamptz not null default now()
);

create table public.order_items (
  id          uuid primary key default uuid_generate_v4(),
  order_id    uuid not null references public.orders (id) on delete cascade,
  product_id  uuid references public.products (id),
  title       text not null,
  unit_price  numeric(10,2) not null,
  quantity    integer not null check (quantity > 0)
);

-- ── Contact / co-op leads ─────────────────────────────────
create table public.leads (
  id          uuid primary key default uuid_generate_v4(),
  name        text,
  email       text not null,
  org         text,
  message     text,
  source      text default 'contact',   -- 'contact' | 'co-op' | 'free-sample'
  created_at  timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles    enable row level security;
alter table public.products    enable row level security;
alter table public.posts       enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;
alter table public.leads       enable row level security;

-- helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean language sql security definer stable set search_path = public as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- Profiles: a user sees/edits their own row; admins see all.
create policy "own profile" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

-- Products: public read; admin write.
create policy "products public read" on public.products
  for select using (true);
create policy "products admin write" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

-- Posts: public reads only PUBLISHED; admins read/write everything.
create policy "posts public read published" on public.posts
  for select using (status = 'published' or public.is_admin());
create policy "posts admin write" on public.posts
  for all using (public.is_admin()) with check (public.is_admin());

-- Orders: admin-only via the dashboard; the webhook uses the service-role key
-- which bypasses RLS entirely.
create policy "orders admin read" on public.orders
  for select using (public.is_admin());
create policy "order_items admin read" on public.order_items
  for select using (public.is_admin());

-- Leads: anyone may submit; admins read.
create policy "leads insert" on public.leads for insert with check (true);
create policy "leads admin read" on public.leads for select using (public.is_admin());
