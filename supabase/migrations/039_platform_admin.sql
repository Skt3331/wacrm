-- Migration 039: Platform Admin and Subscription Bypass

-- Add platform admin flag to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_platform_admin BOOLEAN DEFAULT false;

-- Add subscription bypass flag to accounts
ALTER TABLE public.accounts ADD COLUMN IF NOT EXISTS has_lifetime_access BOOLEAN DEFAULT false;

-- Allow platform admins to view all profiles (needed for the admin dashboard)
CREATE POLICY "Platform admins can read all profiles" 
  ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p2 
      WHERE p2.user_id = auth.uid() AND p2.is_platform_admin = true
    )
  );

-- Allow platform admins to view all accounts
CREATE POLICY "Platform admins can read all accounts" 
  ON public.accounts FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p2 
      WHERE p2.user_id = auth.uid() AND p2.is_platform_admin = true
    )
  );

-- Add platform admin policy to subscriptions
CREATE POLICY "Platform admins can read all subscriptions" 
  ON public.subscriptions FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p2 
      WHERE p2.user_id = auth.uid() AND p2.is_platform_admin = true
    )
  );
