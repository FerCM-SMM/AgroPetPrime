-- Fix RLS for WhatsApp-first checkout (guest orders)
-- Permite anon inserir pedidos sem login, mantendo leitura restrita

drop policy if exists "authenticated insert orders" on orders;
drop policy if exists "authenticated read orders" on orders;
drop policy if exists "authenticated manage order_items" on order_items;

-- Public pode inserir pedidos (checkout sem auth) — MVP
create policy "public insert orders" on orders for insert with check (true);
-- Leitura: anon pode ler próprios pedidos? Para MVP, permitir authenticated read
create policy "authenticated read orders" on orders for select using (auth.role() = 'authenticated');
-- Public pode inserir itens ligados ao pedido criado
create policy "public insert order_items" on order_items for insert with check (true);
create policy "authenticated read order_items" on order_items for select using (auth.role() = 'authenticated');
create policy "authenticated manage order_items" on order_items for all using (auth.role() = 'authenticated');

-- Também permitir public read products/categories já existe, mas garantir
do $$ begin
  if not exists (select 1 from pg_policies where policyname='public insert order_items') then
    create policy "public insert order_items" on order_items for insert with check (true);
  end if;
end $$;
