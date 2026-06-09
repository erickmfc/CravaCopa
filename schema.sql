-- ========================================================
-- Schema Oficial do CravaCopa para Supabase
-- Cole e execute no Editor SQL do seu painel do Supabase
-- ========================================================

-- 1. Tabela de Perfis de Usuários (Profiles)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  points integer default 0,
  zicas_used integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Configurando RLS para perfis
alter table public.profiles enable row level security;

create policy "Perfis publicos sao visiveis por todos" on public.profiles
  for select using (true);

create policy "Usuarios podem atualizar o proprio perfil" on public.profiles
  for update using ((select auth.uid()) = id);

-- 2. Gatilho (Trigger) para criar perfil automaticamente no SignUp do Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url, points, zicas_used, updated_at)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'),
    0,
    0,
    now()
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Tabela de Partidas (Matches)
create table public.matches (
  id text not null primary key,
  home_team text not null,
  home_flag text not null,
  away_team text not null,
  away_flag text not null,
  date_str text not null,
  stadium text not null,
  home_score integer,
  away_score integer,
  phase text default 'grupo',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Configurando RLS para partidas
alter table public.matches enable row level security;

create policy "Partidas sao visiveis por todos" on public.matches
  for select using (true);

-- Inserindo partidas reais da abertura da Copa do Mundo 2026
insert into public.matches (id, home_team, home_flag, away_team, away_flag, date_str, stadium, phase) values
('match-1', 'MÉXICO', '🇲🇽', 'ÁFRICA DO SUL', '🇿🇦', '11/06 - 18:00', 'Estádio Azteca (Cidade do México)', 'grupo'),
('match-2', 'CANADÁ', '🇨🇦', 'BÓSNIA E HERZEGOVINA', '🇧🇦', '12/06 - 19:00', 'Toronto Stadium (Toronto)', 'grupo'),
('match-3', 'EUA', '🇺🇸', 'PARAGUAI', '🇵🇾', '12/06 - 21:00', 'Los Angeles Stadium (SoFi Stadium)', 'grupo'),
('match-4', 'BRASIL', '🇧🇷', 'MARROCOS', '🇲🇦', '13/06 - 19:00', 'New York New Jersey Stadium (MetLife Stadium)', 'grupo'),
('match-5', 'AUSTRÁLIA', '🇦🇺', 'TURQUIA', '🇹🇷', '13/06 - 21:00', 'BC Place (Vancouver)', 'grupo'),
('match-6', 'CATAR', '🇶🇦', 'SUÍÇA', '🇨🇭', '13/06 - 18:00', 'San Francisco Bay Area Stadium', 'grupo');

-- 4. Tabela de Bolões (Pools)
create table public.pools (
  id text not null primary key,
  name text not null,
  description text,
  shield_color text default 'green',
  created_by uuid references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Configurando RLS para bolões
alter table public.pools enable row level security;

create policy "Boloes sao visiveis por todos" on public.pools
  for select using (true);

create policy "Usuarios autenticados podem criar boloes" on public.pools
  for insert to authenticated with check ((select auth.uid()) = created_by);

-- 5. Tabela de Membros dos Bolões (Pool Members)
create table public.pool_members (
  pool_id text references public.pools(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (pool_id, profile_id)
);

-- Configurando RLS para membros dos bolões
alter table public.pool_members enable row level security;

create policy "Membros dos boloes sao visiveis por todos" on public.pool_members
  for select using (true);

create policy "Usuarios podem entrar em boloes" on public.pool_members
  for insert to authenticated with check ((select auth.uid()) = profile_id);

create policy "Usuarios podem sair de boloes" on public.pool_members
  for delete to authenticated using ((select auth.uid()) = profile_id);

-- 6. Tabela de Palpites (Guesses)
create table public.guesses (
  id uuid default gen_random_uuid() not null primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  match_id text references public.matches(id) on delete cascade not null,
  home_score integer not null,
  away_score integer not null,
  zica_target_profile_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (profile_id, match_id)
);

-- Configurando RLS para palpites
alter table public.guesses enable row level security;

create policy "Palpites sao visiveis por todos" on public.guesses
  for select using (true);

create policy "Usuarios podem criar o proprio palpite" on public.guesses
  for insert to authenticated with check ((select auth.uid()) = profile_id);

create policy "Usuarios podem editar o proprio palpite" on public.guesses
  for update to authenticated using ((select auth.uid()) = profile_id) with check ((select auth.uid()) = profile_id);

-- 7. Tabela de Mensagens do Chat (Chat Messages)
create table public.chat_messages (
  id uuid default gen_random_uuid() not null primary key,
  pool_id text references public.pools(id) on delete cascade not null,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  message_text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Configurando RLS para mensagens do chat
alter table public.chat_messages enable row level security;

create policy "Mensagens do chat sao visiveis por todos" on public.chat_messages
  for select using (true);

create policy "Usuarios autenticados podem enviar mensagens" on public.chat_messages
  for insert to authenticated with check ((select auth.uid()) = profile_id);
