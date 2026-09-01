-- ============================================================
-- Migration 0002: storage bucket for blog post cover images
-- (product-images bucket dropped — no products in the SaaS model)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

create policy "public read post images" on storage.objects
  for select using (bucket_id = 'post-images');
create policy "admin write post images" on storage.objects
  for all using (bucket_id = 'post-images' and public.is_admin())
  with check (bucket_id = 'post-images' and public.is_admin());
