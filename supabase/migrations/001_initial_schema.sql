-- AgroPet Pr1me — Schema inicial MVP
-- Baseado em types/schema.ts e PLAN.md

-- Extensions
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  phone text,
  role text not null default 'customer' check (role in ('customer','admin')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Addresses
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  street text not null,
  number text not null,
  complement text,
  zip_code text not null,
  city text not null,
  state text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

-- Categories
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  image_url text,
  parent_id uuid references categories(id) on delete set null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  short_description text,
  price numeric(10,2) not null check (price >= 0),
  compare_at_price numeric(10,2) check (compare_at_price is null or compare_at_price >= price),
  stock integer not null default 0 check (stock >= 0),
  category_id uuid not null references categories(id) on delete restrict,
  brand text,
  image_urls text[] not null default '{}',
  animal_types text[] not null default '{}',
  featured boolean not null default false,
  active boolean not null default true,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  status text not null default 'pending' check (status in ('pending','confirmed','delivered','cancelled')),
  total numeric(10,2) not null check (total >= 0),
  observation text,
  whatsapp_message_id text,
  requested_at timestamptz not null default now(),
  scheduled_date date,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Order Items
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null check (unit_price >= 0),
  subtotal numeric(10,2) not null check (subtotal >= 0)
);

-- Leads
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  source text,
  consent_marketing boolean not null default false,
  consent_terms boolean not null default false,
  created_at timestamptz not null default now(),
  last_order_at timestamptz,
  total_orders integer not null default 0,
  total_spent numeric(10,2) not null default 0
);

-- Notifications (log de envio WhatsApp/email)
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete set null,
  type text not null,
  channel text not null,
  content text not null,
  recipient text not null,
  sent_at timestamptz not null default now(),
  status text not null default 'sent'
);

-- Settings (singleton)
create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  store_name text not null default 'AgroPet Pr1me',
  store_phone text,
  store_whatsapp text,
  store_address text,
  whatsapp_number text not null default '5511999999999',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Updated_at trigger
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated on profiles;
create trigger trg_profiles_updated before update on profiles for each row execute function set_updated_at();
drop trigger if exists trg_products_updated on products;
create trigger trg_products_updated before update on products for each row execute function set_updated_at();
drop trigger if exists trg_orders_updated on orders;
create trigger trg_orders_updated before update on orders for each row execute function set_updated_at();
drop trigger if exists trg_settings_updated on settings;
create trigger trg_settings_updated before update on settings for each row execute function set_updated_at();

-- RLS enable (políticas permissivas para MVP; endurecer antes de produção)
alter table profiles enable row level security;
alter table addresses enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table leads enable row level security;
alter table notifications enable row level security;
alter table settings enable row level security;

-- Permite leitura pública de categorias/produtos/settings (catálogo aberto)
create policy "public read categories" on categories for select using (true);
create policy "public read products" on products for select using (active = true);
create policy "public read settings" on settings for select using (true);

-- Usuários autenticados podem gerenciar próprio perfil/endereço
create policy "user manage own profile" on profiles for all using (auth.uid() = id);
create policy "user manage own addresses" on addresses for all using (auth.uid() = profile_id);

-- Pedidos: cliente cria, admin vê tudo (policy simplificada MVP: autenticado pode inserir/ler)
create policy "authenticated insert orders" on orders for insert with check (auth.role() = 'authenticated');
create policy "authenticated read orders" on orders for select using (auth.role() = 'authenticated');
create policy "authenticated manage order_items" on order_items for all using (auth.role() = 'authenticated');

-- Leads: inserção pública (checkout sem login), leitura só admin/service_role
create policy "public insert leads" on leads for insert with check (true);

-- Indexes
create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_products_featured on products(featured) where featured = true;
create index if not exists idx_categories_slug on categories(slug);
create index if not exists idx_orders_profile on orders(profile_id);
create index if not exists idx_order_items_order on order_items(order_id);
