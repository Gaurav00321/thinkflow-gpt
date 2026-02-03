-- FINAL ROBUST SETUP SCRIPT (RESET MODE)
-- Run this in your Supabase SQL Editor.
-- WARNING: This will DROP existing tables (users, chats, messages, api_keys) to ensure a clean setup.

-- 0. Extensions
create extension if not exists pgcrypto;
create extension if not exists moddatetime schema extensions;

-- 1. Drop existing tables to fix schema mismatches
drop table if exists public.api_keys;
drop table if exists public.messages;
drop table if exists public.chats;
drop table if exists public.users;

-- 2. Create Tables (Clean Slate)

-- Users Table
create table public.users (
  id uuid primary key,
  email text,
  full_name text,
  avatar_url text,
  message_count int default 0,
  last_reset_date date default current_date,
  plan_tier text default 'free',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Chats Table
create table public.chats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null,
  title text default 'New Chat',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Messages Table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  chat_id uuid not null,
  role text not null,
  content text not null,
  created_at timestamp with time zone default now()
);

-- API Keys Table
create table public.api_keys (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null,
  name text not null,
  key_hash text not null,
  last_used_at timestamp with time zone,
  status text default 'active',
  created_at timestamp with time zone default now()
);

-- 3. Add Foreign Keys (Separately to avoid SQL Editor bugs)

alter table public.users
  add constraint users_id_fkey
  foreign key (id)
  references auth.users(id)
  on delete cascade;

alter table public.chats
  add constraint chats_user_id_fkey
  foreign key (user_id)
  references auth.users(id)
  on delete cascade;

alter table public.messages
  add constraint messages_chat_id_fkey
  foreign key (chat_id)
  references public.chats(id)
  on delete cascade;

alter table public.api_keys
  add constraint api_keys_user_id_fkey
  foreign key (user_id)
  references auth.users(id)
  on delete cascade;


-- 4. Indexes
create index idx_chats_user_id on public.chats(user_id);
create index idx_messages_chat_id on public.messages(chat_id);
create index idx_api_keys_user_id on public.api_keys(user_id);


-- 5. Row Level Security (RLS) & Policies

alter table public.users enable row level security;
alter table public.chats enable row level security;
alter table public.messages enable row level security;
alter table public.api_keys enable row level security;

-- Users Policies
create policy "Users can view own profile" on public.users
  for select to authenticated using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users can insert own profile" on public.users
  for insert to authenticated with check (auth.uid() = id);

-- Chats Policies
create policy "Users can view own chats" on public.chats
  for select to authenticated using (auth.uid() = user_id);

create policy "Users can delete own chats" on public.chats
  for delete to authenticated using (auth.uid() = user_id);

create policy "Users can insert own chats" on public.chats
  for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can update own chats" on public.chats
  for update to authenticated using (auth.uid() = user_id);

-- Messages Policies
create policy "Users can view messages of own chats" on public.messages
  for select to authenticated using (
    exists ( select 1 from public.chats where id = messages.chat_id and user_id = auth.uid() )
  );

create policy "Users can insert messages to own chats" on public.messages
  for insert to authenticated with check (
    exists ( select 1 from public.chats where id = messages.chat_id and user_id = auth.uid() )
  );

-- API Keys Policies
create policy "Users can view own api keys" on public.api_keys
  for select to authenticated using (auth.uid() = user_id);

create policy "Users can insert own api keys" on public.api_keys
  for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can update own api keys" on public.api_keys
  for update to authenticated using (auth.uid() = user_id);
  
create policy "Users can delete own api keys" on public.api_keys
  for delete to authenticated using (auth.uid() = user_id);


-- 6. Utility Functions (RPC) & Triggers

-- Trigger Function: Handle New User
create or replace function public.handle_new_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- Trigger Function: Handle User Update
create or replace function public.handle_user_update()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.users
  set email = new.email,
      full_name = new.raw_user_meta_data->>'full_name',
      avatar_url = new.raw_user_meta_data->>'avatar_url',
      updated_at = now()
  where id = new.id;
  return new;
end;
$$;

-- Attach Triggers to auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_user_update();

-- RPC: Check and Increment Usage
create or replace function public.check_and_increment_usage(user_id_param uuid)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  v_plan text;
  v_count int;
  v_last_reset date;
  v_limit int := 200;
begin
  -- Lock the user row to prevent race conditions
  select plan_tier, message_count, last_reset_date 
  into v_plan, v_count, v_last_reset 
  from public.users 
  where id = user_id_param 
  for update;

  if not found then
    return jsonb_build_object('allowed', false, 'reason', 'no_user');
  end if;

  -- Reset if needed
  if v_last_reset < current_date then
    v_count := 0;
    update public.users 
    set message_count = 0, last_reset_date = current_date 
    where id = user_id_param;
  end if;

  -- Check Limits
  if v_plan = 'free' and v_count >= v_limit then
    return jsonb_build_object('allowed', false, 'reason', 'limit_reached', 'remaining', 0);
  end if;

  -- Increment
  update public.users 
  set message_count = message_count + 1 
  where id = user_id_param;
  
  -- Return result
  if v_plan = 'free' then
    return jsonb_build_object('allowed', true, 'remaining', v_limit - (v_count + 1));
  else
    return jsonb_build_object('allowed', true, 'remaining', -1);
  end if;
end;
$$;

-- Permissions
revoke execute on function public.handle_new_user() from public;
revoke execute on function public.handle_user_update() from public;
revoke execute on function public.check_and_increment_usage(uuid) from public;
grant execute on function public.check_and_increment_usage(uuid) to authenticated;
