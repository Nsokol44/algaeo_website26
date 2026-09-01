-- ============================================================
-- Migration 0004: explicit live-culture / consortium flags
--
-- Replaces category-based inference (a product's categories describe which
-- crops it's marketed for, not whether it's biologically alive) with two
-- explicit, honest flags:
--
--   is_live_culture      — true if this product is a living organism.
--                           Drives: return ineligibility (can't be
--                           restocked/resold — see returns-policy), and
--                           hot-weather shipping guidance relevance.
--   contains_consortium  — true if this product carries the GrowForce
--                           12-strain consortium specifically. Drives:
--                           whether the trial-data/strain-list section
--                           renders on its product page. Bentonite Clay is
--                           inert (neither flag). The raw algae cultures
--                           (Nannochloropsis/Chlorella/Scenedesmus) are
--                           alive but are single-species — not the 12-strain
--                           blend — so is_live_culture=true,
--                           contains_consortium=false for those.
-- ============================================================

alter table public.products
  add column if not exists is_live_culture     boolean not null default false,
  add column if not exists contains_consortium boolean not null default false;
