-- Run once in the Supabase SQL Editor for the LIVE project.
--
-- The repo's seed only contains three positioning-consistent posts, but the
-- live database still has older biofertilizer-era posts that show on the
-- homepage and /blog. This sets them to draft (reversible) instead of deleting.
--
-- Slugs below were read from the live homepage on 2026-09-29. Review the
-- SELECT first; there may be more legacy posts than these three.

-- 1) Review everything currently published
select slug, title, category, published_at
from public.posts
where status = 'published'
order by published_at desc;

-- 2) Unpublish the known legacy posts (sets to draft, keeps the content)
update public.posts
set status = 'draft', updated_at = now()
where slug in (
  'living-biofertilizer-pellets-immediate-nutrition-meets-long-term-soil-biology',
  'algaeo-biofertilizer-application-guide',
  'post-chemical-era-biologicals-market-growing-faster'
);

-- 3) Optional: catch other product-era posts by category, then review before running
-- update public.posts set status = 'draft', updated_at = now()
-- where status = 'published'
--   and category in ('Biofertilizer', 'Regenerative Agriculture', 'Algae Cultivation',
--                    'Marine Aquaculture', 'Carbon Capture', 'Plant Health');
