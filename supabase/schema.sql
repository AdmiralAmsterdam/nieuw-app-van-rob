create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  company_name text,
  contact_name text,
  phone text,
  language text not null default 'nl' check (language in ('nl', 'en')),
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name_nl text not null,
  name_en text not null,
  description_nl text not null,
  description_en text not null,
  unit text not null,
  min_order_qty numeric not null default 1,
  price_per_unit numeric,
  category text not null,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'in_production', 'shipped', 'delivered')),
  total_amount numeric not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity numeric not null,
  unit_price numeric not null,
  subtotal numeric not null
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "profiles read own" on public.profiles
for select using (auth.uid() = id);

create policy "profiles update own" on public.profiles
for update using (auth.uid() = id);

create policy "products read all authenticated" on public.products
for select using (auth.role() = 'authenticated');

create policy "orders read own or admin" on public.orders
for select using (
  auth.uid() = profile_id
  or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "orders create own" on public.orders
for insert with check (auth.uid() = profile_id);

create policy "orders update admin only" on public.orders
for update using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

create policy "order_items read own or admin" on public.order_items
for select using (
  exists (
    select 1
    from public.orders o
    join public.profiles p on p.id = auth.uid()
    where o.id = order_id and (o.profile_id = auth.uid() or p.role = 'admin')
  )
);

create policy "order_items insert own" on public.order_items
for insert with check (
  exists (
    select 1 from public.orders o where o.id = order_id and o.profile_id = auth.uid()
  )
);

alter publication supabase_realtime add table public.orders;
