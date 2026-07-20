-- Migration 039: Platform Admin and Subscription Bypass

-- Add platform admin flag to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_platform_admin BOOLEAN DEFAULT false;

-- Add subscription bypass flag to accounts
ALTER TABLE public.accounts ADD COLUMN IF NOT EXISTS has_lifetime_access BOOLEAN DEFAULT false;

-- Create a security definer function to check admin status without recursing
CREATE OR REPLACE FUNCTION public.is_platform_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT is_platform_admin FROM profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- Allow platform admins to view all profiles (needed for the admin dashboard)
DROP POLICY IF EXISTS "Platform admins can read all profiles" ON public.profiles;
CREATE POLICY "Platform admins can read all profiles" 
  ON public.profiles FOR SELECT 
  USING (
    public.is_platform_admin()
  );

-- Allow platform admins to view all accounts
DROP POLICY IF EXISTS "Platform admins can read all accounts" ON public.accounts;
CREATE POLICY "Platform admins can read all accounts" 
  ON public.accounts FOR SELECT 
  USING (
    public.is_platform_admin()
  );

-- Add platform admin policy to subscriptions
DROP POLICY IF EXISTS "Platform admins can read all subscriptions" ON public.subscriptions;
CREATE POLICY "Platform admins can read all subscriptions" 
  ON public.subscriptions FOR SELECT 
  USING (
    public.is_platform_admin()
  );
