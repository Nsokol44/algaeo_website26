-- ============================================================
-- Migration 0003: shipping labels (Shippo) + product weight/dims
-- Run after 0002_reviews_and_product_extras.sql
-- ============================================================

-- ── Product physical dimensions ──────────────────────────────
-- Needed to quote a real carrier rate. Nullable — a product missing these
-- just can't be quoted yet (the admin UI says so explicitly rather than
-- guessing a weight).
alter table public.products
  add column if not exists weight_oz  numeric(8,2),
  add column if not exists length_in  numeric(6,2),
  add column if not exists width_in   numeric(6,2),
  add column if not exists height_in  numeric(6,2);

-- ── Order fulfillment status ──────────────────────────────────
alter table public.orders
  add column if not exists shipping_status text not null default 'awaiting_fulfillment';
-- Values in use: 'awaiting_fulfillment' | 'label_purchased' | 'shipped' | 'delivered' | 'cancelled'
-- (kept as free text rather than an enum — this is a status a human updates
-- by hand as often as the label flow does, and enums are painful to extend later)

-- ── Shipping labels ───────────────────────────────────────────
-- One row per label purchased, for either direction. An order can have more
-- than one (e.g. a reshipment after a damaged-in-transit claim), so this is
-- a log, not a single column bolted onto `orders`.
create table public.shipping_labels (
  id                    uuid primary key default uuid_generate_v4(),
  order_id              uuid not null references public.orders (id) on delete cascade,
  kind                  text not null check (kind in ('outbound', 'return')),
  carrier               text,
  service_level         text,
  tracking_number       text,
  tracking_url          text,
  label_url             text,
  cost                  numeric(10,2),
  shippo_transaction_id text,
  created_at            timestamptz not null default now()
);
create index shipping_labels_order_idx on public.shipping_labels (order_id);

alter table public.shipping_labels enable row level security;

create policy "shipping_labels admin all" on public.shipping_labels
  for all using (public.is_admin()) with check (public.is_admin());
-- No public read/write policy at all — this table is admin-dashboard-only,
-- there's no storefront page that needs a customer's own label rows (the
-- tracking number/URL customers see comes from the Stripe/order-confirmation
-- email flow, not a direct read of this table).
