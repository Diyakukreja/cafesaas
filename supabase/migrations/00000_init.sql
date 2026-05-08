-- Enable UUID extension
create extension if not exists "uuid-ossp";
create extension if not exists "citext";

-- ==========================================
-- 1. CAFES TABLE
-- ==========================================
create table public.cafes (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references auth.users(id) not null,
  name text not null,
  slug citext not null unique,
  description text,
  logo_url text,
  theme_color text,
  is_active boolean default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Index for slug lookups (citext handles case-insensitivity natively, but an index speeds it up)
create index idx_cafes_slug on public.cafes(slug);
create index idx_cafes_owner on public.cafes(owner_id);

alter table public.cafes enable row level security;

-- Policies for cafes
create policy "Public can view active cafes" 
  on public.cafes for select 
  using (is_active = true);

create policy "Owners can view their own cafes" 
  on public.cafes for select 
  to authenticated 
  using (auth.uid() = owner_id);

create policy "Owners can insert their own cafes" 
  on public.cafes for insert 
  to authenticated 
  with check (auth.uid() = owner_id);

create policy "Owners can update their own cafes" 
  on public.cafes for update 
  to authenticated 
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "Owners can delete their own cafes" 
  on public.cafes for delete 
  to authenticated 
  using (auth.uid() = owner_id);


-- ==========================================
-- 2. MENU CATEGORIES TABLE
-- ==========================================
create table public.menu_categories (
  id uuid primary key default uuid_generate_v4(),
  cafe_id uuid references public.cafes(id) on delete cascade not null,
  name text not null,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now() not null
);

create index idx_menu_categories_cafe on public.menu_categories(cafe_id);

alter table public.menu_categories enable row level security;

-- Policies for menu_categories
create policy "Public can view active menu categories" 
  on public.menu_categories for select 
  using (
    is_active = true and 
    cafe_id in (select id from public.cafes where is_active = true)
  );

create policy "Owners can view their cafe categories" 
  on public.menu_categories for select 
  to authenticated 
  using (cafe_id in (select id from public.cafes where owner_id = auth.uid()));

create policy "Owners can insert categories" 
  on public.menu_categories for insert 
  to authenticated 
  with check (cafe_id in (select id from public.cafes where owner_id = auth.uid()));

create policy "Owners can update their categories" 
  on public.menu_categories for update 
  to authenticated 
  using (cafe_id in (select id from public.cafes where owner_id = auth.uid()))
  with check (cafe_id in (select id from public.cafes where owner_id = auth.uid()));

create policy "Owners can delete their categories" 
  on public.menu_categories for delete 
  to authenticated 
  using (cafe_id in (select id from public.cafes where owner_id = auth.uid()));


-- ==========================================
-- 3. MENU ITEMS TABLE
-- ==========================================
create table public.menu_items (
  id uuid primary key default uuid_generate_v4(),
  cafe_id uuid references public.cafes(id) on delete cascade not null,
  category_id uuid references public.menu_categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  is_available boolean default true,
  is_featured boolean default false,
  is_veg boolean default false,
  preparation_time integer,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index idx_menu_items_cafe on public.menu_items(cafe_id);
create index idx_menu_items_category on public.menu_items(category_id);

alter table public.menu_items enable row level security;

-- Policies for menu_items
create policy "Public can view menu items of active cafes" 
  on public.menu_items for select 
  using (cafe_id in (select id from public.cafes where is_active = true));

create policy "Owners can view their cafe items" 
  on public.menu_items for select 
  to authenticated 
  using (cafe_id in (select id from public.cafes where owner_id = auth.uid()));

create policy "Owners can insert items" 
  on public.menu_items for insert 
  to authenticated 
  with check (cafe_id in (select id from public.cafes where owner_id = auth.uid()));

create policy "Owners can update their items" 
  on public.menu_items for update 
  to authenticated 
  using (cafe_id in (select id from public.cafes where owner_id = auth.uid()))
  with check (cafe_id in (select id from public.cafes where owner_id = auth.uid()));

create policy "Owners can delete their items" 
  on public.menu_items for delete 
  to authenticated 
  using (cafe_id in (select id from public.cafes where owner_id = auth.uid()));


-- ==========================================
-- TRIGGERS
-- ==========================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_cafes_updated_at
before update on public.cafes
for each row execute function set_updated_at();

create trigger set_menu_items_updated_at
before update on public.menu_items
for each row execute function set_updated_at();
