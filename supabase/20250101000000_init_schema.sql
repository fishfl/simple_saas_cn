-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create customers table
create table public.customers (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade not null,
    email text not null,
    name text,
    country text,
    credits integer default 0 not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    metadata jsonb default '{}'::jsonb,
    constraint customers_email_match check (email = lower(email)),
    constraint credits_non_negative check (credits >= 0)
);

-- Create credits_history table to track credit transactions
create table public.credits_history (
    id uuid primary key default uuid_generate_v4(),
    customer_id uuid references public.customers(id) on delete cascade not null,
    amount integer not null,
    type text not null check (type in ('add', 'subtract')),
    description text,
    trade_no text,  -- 微信支付商户单号
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    metadata jsonb default '{}'::jsonb
);

-- Create subscriptions table
create table public.subscriptions (
    id uuid primary key default uuid_generate_v4(),
    customer_id uuid references public.customers(id) on delete cascade not null,
    trade_no text not null unique,  -- 微信支付商户单号
    plan_id text not null,           -- 套餐 id，如 tier-starter
    status text not null check (status in ('incomplete', 'expired', 'active', 'past_due', 'canceled', 'unpaid', 'paused', 'trialing')),
    current_period_start timestamp with time zone not null,
    current_period_end timestamp with time zone not null,
    canceled_at timestamp with time zone,
    metadata jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index customers_user_id_idx on public.customers(user_id);
create index subscriptions_customer_id_idx on public.subscriptions(customer_id);
create index subscriptions_status_idx on public.subscriptions(status);
create index credits_history_customer_id_idx on public.credits_history(customer_id);
create index credits_history_created_at_idx on public.credits_history(created_at);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;

-- Create updated_at triggers
create trigger handle_customers_updated_at
    before update on public.customers
    for each row
    execute function public.handle_updated_at();

create trigger handle_subscriptions_updated_at
    before update on public.subscriptions
    for each row
    execute function public.handle_updated_at();

-- Auto-create customer trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- 新用户注册时自动创建 customer 记录，赠送 3 积分
  INSERT INTO public.customers (
    user_id,
    email,
    credits,
    created_at,
    updated_at,
    metadata
  ) VALUES (
    NEW.id,
    NEW.email,
    3,
    NOW(),
    NOW(),
    jsonb_build_object(
      'source', 'auto_registration',
      'initial_credits', 3,
      'registration_date', NOW()
    )
  );

  -- 记录欢迎积分历史
  INSERT INTO public.credits_history (
    customer_id,
    amount,
    type,
    description,
    created_at,
    metadata
  ) VALUES (
    (SELECT id FROM public.customers WHERE user_id = NEW.id),
    3,
    'add',
    '新用户注册赠送积分',
    NOW(),
    jsonb_build_object(
      'source', 'welcome_bonus',
      'user_registration', true
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger for user email update
CREATE OR REPLACE FUNCTION public.handle_user_email_update()
RETURNS trigger AS $$
BEGIN
    UPDATE public.customers
    SET email = NEW.email, updated_at = NOW()
    WHERE user_id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_email_updated
    AFTER UPDATE OF email ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_user_email_update();


-- RLS Policies
alter table public.customers enable row level security;
alter table public.subscriptions enable row level security;
alter table public.credits_history enable row level security;

-- Customers policies
create policy "Users can view their own customer data"
    on public.customers for select
    using (auth.uid() = user_id);

create policy "Users can update their own customer data"
    on public.customers for update
    using (auth.uid() = user_id);

create policy "Service role can manage customer data"
    on public.customers for all
    using (auth.role() = 'service_role');

create policy "Users can view their own subscriptions"
    on public.subscriptions for select
    using (
        exists (
            select 1 from public.customers
            where customers.id = subscriptions.customer_id
            and customers.user_id = auth.uid()
        )
    );

create policy "Service role can manage subscriptions"
    on public.subscriptions for all
    using (auth.role() = 'service_role');

-- Credits history policies
create policy "Users can view their own credits history"
    on public.credits_history for select
    using (
        exists (
            select 1 from public.customers
            where customers.id = credits_history.customer_id
            and customers.user_id = auth.uid()
        )
    );

create policy "Service role can manage credits history"
    on public.credits_history for all
    using (auth.role() = 'service_role');

-- Grants
grant all on public.customers to service_role;
grant all on public.subscriptions to service_role;
grant all on public.credits_history to service_role;