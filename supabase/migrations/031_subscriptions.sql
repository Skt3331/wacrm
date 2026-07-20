-- Migration 031: Stripe Subscriptions Integration

-- Create customers table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_customer_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Can read own customer data." ON public.customers FOR SELECT USING (auth.uid() = id);

-- Create products table (synced from Stripe)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY, -- Stripe Product ID
    active BOOLEAN,
    name TEXT,
    description TEXT,
    image TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read products." ON public.products FOR SELECT USING (true);

-- Create prices table (synced from Stripe)
CREATE TABLE IF NOT EXISTS public.prices (
    id TEXT PRIMARY KEY, -- Stripe Price ID
    product_id TEXT REFERENCES public.products(id),
    active BOOLEAN,
    description TEXT,
    unit_amount BIGINT,
    currency TEXT,
    type TEXT,
    interval TEXT,
    interval_count INTEGER,
    trial_period_days INTEGER,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read prices." ON public.prices FOR SELECT USING (true);

-- Create subscriptions table (synced from Stripe)
CREATE TYPE subscription_status AS ENUM (
    'trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid', 'paused'
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
    id TEXT PRIMARY KEY, -- Stripe Subscription ID
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    status subscription_status,
    metadata JSONB,
    price_id TEXT REFERENCES public.prices(id),
    quantity INTEGER,
    cancel_at_period_end BOOLEAN,
    created TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    current_period_start TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    ended_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    cancel_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    canceled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    trial_start TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    trial_end TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Can read own subscription data." ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Optional: Create a view or function to get active subscription limits
