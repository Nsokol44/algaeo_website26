-- ============================================================
-- Migration 0005: product bundles (single vs. multi-pack)
--
-- Bundles are modeled as ordinary, separate product rows (their own slug,
-- price, weight/dims) rather than a variant system bolted onto one row.
-- That keeps cart, Stripe line items, order_items, and the shipping-label
-- weight calculation completely unchanged — a bundle is just a product,
-- the same way a 3-pack is a different ASIN on Amazon rather than a
-- dropdown on one listing. These two columns are what link a single and
-- its bundle together for the on-page toggle and savings math.
-- ============================================================

alter table public.products
  add column if not exists bundle_quantity     integer not null default 1,
  add column if not exists bundle_partner_slug text;

-- bundle_quantity: how many units this specific SKU represents (1 for a
-- single, 3 for a 3-pack). Used to compute the effective per-unit bundle
-- price and the savings percentage shown in the toggle, rather than
-- hardcoding a savings string that would drift out of sync if either
-- price changes later.
--
-- bundle_partner_slug: the *other* SKU for the same underlying product
-- (single → its bundle's slug, and vice versa). Nullable — most products
-- (Bentonite Clay, hardware, algae cultures) have no bundle and this stays
-- null.
