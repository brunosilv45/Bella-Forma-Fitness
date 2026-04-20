create table if not exists public.products (
  id bigserial primary key,
  name text not null,
  category text not null,
  description text,
  image_path text not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

-- category accepts any text value. Common values:
-- plus_size, tactel, top, top_alca, top_bella_shopee, top_dry_fit,
-- top_estampado, top_faixa, top_nadador, short, short_bella_fit,
-- short_com_bolso, short_com_detalhes, short_duplo, short_saia,
-- regata, regata_de_ajuste, macacão, calca_shopee,
-- ciclista_com_bolso, ciclista_lisa, cirre_3d, cropped, gloss,
-- blusa_de_manga, blusa_long, calca_com_bolso, calca_com_detalhes

alter table public.products enable row level security;

create policy "Public read products"
on public.products
for select
to anon
using (true);

create policy "Public insert products"
on public.products
for insert
to anon
with check (true);
