-- AgroPet Pr1me — Seed inicial

-- Settings singleton
insert into settings (store_name, store_phone, store_whatsapp, store_address, whatsapp_number)
values ('AgroPet Pr1me', '(15) 99658-0804', '(15) 99658-0804', 'Rua Exemplo, 123 — São Paulo/SP', '5515996580804')
on conflict do nothing;

-- Categorias
insert into categories (id, name, slug, description, sort_order, active) values
  ('00000000-0000-0000-0000-000000000001', 'Rações', 'racoes', 'Rações premium para cães, gatos, pássaros e cavalos', 1, true),
  ('00000000-0000-0000-0000-000000000002', 'Medicamentos', 'medicamentos', 'Medicamentos e suplementos veterinários', 2, true),
  ('00000000-0000-0000-0000-000000000003', 'Acessórios', 'acessorios', 'Coleiras, guias, camas, casinhas e mais', 3, true),
  ('00000000-0000-0000-0000-000000000004', 'Higiene', 'higiene', 'Shampoos, perfumes e itens de higiene', 4, true),
  ('00000000-0000-0000-0000-000000000005', 'Brinquedos', 'brinquedos', 'Diversão garantida para seu pet', 5, true)
on conflict (slug) do nothing;

-- Produtos (seed dos MOCK_PRODUCTS)
insert into products (id, name, slug, description, short_description, price, compare_at_price, stock, category_id, brand, image_urls, animal_types, featured, active, tags) values
  ('10000000-0000-0000-0000-000000000001', 'Ração Pedigree Adulto', 'racao-pedigree-adulto', 'Ração premium para cães adultos — nutrição completa', 'Ração Pedigree', 129.90, 149.90, 50, '00000000-0000-0000-0000-000000000001', 'Pedigree', '{}', '{dog}', true, true, '{racao}'),
  ('10000000-0000-0000-0000-000000000002', 'Ração Whiskas Adulto', 'racao-whiskas-adulto', 'Ração para gatos adultos — sabor peixe', 'Ração Whiskas', 49.90, null, 100, '00000000-0000-0000-0000-000000000001', 'Whiskas', '{}', '{cat}', true, true, '{racao}'),
  ('10000000-0000-0000-0000-000000000003', 'Coleira Luxo', 'coleira-luxo', 'Coleira premium com acabamento em couro', 'Coleira Luxo', 39.90, null, 30, '00000000-0000-0000-0000-000000000003', 'PetPr1me', '{}', '{dog}', true, true, '{acessorio}'),
  ('10000000-0000-0000-0000-000000000004', 'Ração GranNature Small Breed', 'racao-grannature-small-breed', 'Ração premium para cães pequenos', 'GranNature', 199.90, 219.90, 25, '00000000-0000-0000-0000-000000000001', 'GranNature', '{}', '{dog}', true, true, '{racao}')
on conflict (slug) do nothing;
