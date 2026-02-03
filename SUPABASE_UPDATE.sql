-- Database Update Script for Chat Pinning
-- Run this in Supabase SQL Editor

-- 1. Add is_pinned column to chats table
do $$
begin
  if not exists (select 1 from information_schema.columns where table_name = 'chats' and column_name = 'is_pinned') then
    alter table public.chats add column is_pinned boolean default false;
  end if;
end $$;

-- 2. Ensure RLS policies allow updating is_pinned
-- (The existing "Users can update own chats" policy usually covers all columns, 
-- but we can be explicit if needed. Since we use `using (auth.uid() = user_id)`, 
-- it allows updates to owned rows.)

-- 3. Verify Chats Update Policy (Optional - usually created in setup)
-- If you need to re-create it to be sure:
drop policy if exists "Users can update own chats" on public.chats;
create policy "Users can update own chats" on public.chats
  for update to authenticated using (auth.uid() = user_id);

-- 4. Add index for pinned chats (optional but good for performance if sorting by pin)
create index if not exists idx_chats_is_pinned on public.chats(is_pinned);
