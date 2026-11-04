-- Plant-e website schema. All reads and writes go through the server (service role);
-- RLS is enabled with no public policies, so the anon key cannot read or write anything directly.

create extension if not exists pgcrypto;

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  kind text not null default 'news' check (kind in ('news','project')),
  is_news boolean not null default true,
  date date not null default current_date,
  image text,
  tags text[] not null default '{}',
  lang text not null default 'nl',
  title jsonb not null default '{}',
  excerpt jsonb not null default '{}',
  body jsonb not null default '{}',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title jsonb not null default '{}',
  short jsonb not null default '{}',
  body jsonb not null default '{}',
  price_cents integer not null check (price_cents >= 0),
  categories text[] not null default '{}',
  images text[] not null default '{}',
  stock text not null default 'in_stock' check (stock in ('in_stock','out_of_stock','backorder')),
  pickup_only boolean not null default false,
  active boolean not null default true,
  sort integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  date date not null default current_date,
  title jsonb not null default '{}',
  body jsonb not null default '{}',
  location text,
  hours text,
  published boolean not null default true
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null check (type in ('contact','brochure','newsletter')),
  locale text,
  name text, email text not null, phone text, company text, message text, product text,
  consent boolean not null default false
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  stripe_session_id text unique not null,
  status text,
  fulfilment text not null default 'new',
  email text, name text, phone text,
  amount_total integer,
  pickup boolean not null default false,
  items jsonb, shipping jsonb, billing jsonb
);

create table if not exists settings (key text primary key, value jsonb not null);

alter table posts enable row level security;
alter table products enable row level security;
alter table jobs enable row level security;
alter table leads enable row level security;
alter table orders enable row level security;
alter table settings enable row level security;

insert into storage.buckets (id, name, public) values ('media', 'media', false) on conflict (id) do nothing;
