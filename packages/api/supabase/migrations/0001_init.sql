-- Create tables
create table if not exists public.keys (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    value text not null,
    description text,
    tags text[] default array[]::text[],
    revoked boolean default false,
    user_id uuid references auth.users(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.solutions (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    user_id uuid references auth.users(id) on delete cascade not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.solution_keys (
    solution_id uuid references public.solutions(id) on delete cascade not null,
    key_id uuid references public.keys(id) on delete cascade not null,
    primary key (solution_id, key_id)
);

-- Create indexes
create index if not exists keys_user_id_idx on public.keys(user_id);
create index if not exists solutions_user_id_idx on public.solutions(user_id);
create index if not exists solution_keys_solution_id_idx on public.solution_keys(solution_id);
create index if not exists solution_keys_key_id_idx on public.solution_keys(key_id);

-- Enable RLS
alter table public.keys enable row level security;
alter table public.solutions enable row level security;
alter table public.solution_keys enable row level security;

-- Create policies for keys table
create policy "Users can view their own keys"
    on public.keys for select
    using (auth.uid() = user_id);

create policy "Users can insert their own keys"
    on public.keys for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own keys"
    on public.keys for update
    using (auth.uid() = user_id);

create policy "Users can delete their own keys"
    on public.keys for delete
    using (auth.uid() = user_id);

-- Create policies for solutions table
create policy "Users can view their own solutions"
    on public.solutions for select
    using (auth.uid() = user_id);

create policy "Users can insert their own solutions"
    on public.solutions for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own solutions"
    on public.solutions for update
    using (auth.uid() = user_id);

create policy "Users can delete their own solutions"
    on public.solutions for delete
    using (auth.uid() = user_id);

-- Create policies for solution_keys table
create policy "Users can view solution_keys through their solutions"
    on public.solution_keys for select
    using (
        exists (
            select 1 from public.solutions
            where id = solution_keys.solution_id
            and user_id = auth.uid()
        )
    );

create policy "Users can insert solution_keys through their solutions"
    on public.solution_keys for insert
    with check (
        exists (
            select 1 from public.solutions
            where id = solution_keys.solution_id
            and user_id = auth.uid()
        )
    );

create policy "Users can delete solution_keys through their solutions"
    on public.solution_keys for delete
    using (
        exists (
            select 1 from public.solutions
            where id = solution_keys.solution_id
            and user_id = auth.uid()
        )
    );

-- Create functions
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;

-- Create triggers
create trigger handle_updated_at_keys
    before update on public.keys
    for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at_solutions
    before update on public.solutions
    for each row execute procedure public.handle_updated_at();
