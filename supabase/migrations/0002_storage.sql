-- ============================================================
-- Migration 0002: storage buckets for product/post images
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true),
       ('post-images', 'post-images', true)
on conflict (id) do nothing;

create policy "public read product images" on storage.objects
  for select using (bucket_id = 'product-images');
create policy "admin write product images" on storage.objects
  for all using (bucket_id = 'product-images' and public.is_admin())
  with check (bucket_id = 'product-images' and public.is_admin());

create policy "public read post images" on storage.objects
  for select using (bucket_id = 'post-images');
create policy "admin write post images" on storage.objects
  for all using (bucket_id = 'post-images' and public.is_admin())
  with check (bucket_id = 'post-images' and public.is_admin());
