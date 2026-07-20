-- Add meta_app_secret column to whatsapp_config table
ALTER TABLE public.whatsapp_config ADD COLUMN IF NOT EXISTS meta_app_secret TEXT;
