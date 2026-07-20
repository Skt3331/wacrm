-- Migration 042: CMS Tables for Marketing Pages and Blog Posts

-- 1. Marketing Pages Table
CREATE TABLE public.marketing_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL, -- e.g., 'feature', 'solution', 'integration', 'resource'
    title TEXT NOT NULL,
    meta_description TEXT,
    content TEXT NOT NULL, -- Storing markdown or HTML content
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Blog Posts Table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'WaCRM Team',
    cover_image_url TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. RLS Policies
ALTER TABLE public.marketing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published marketing pages
CREATE POLICY "Public can read published marketing pages" 
  ON public.marketing_pages FOR SELECT 
  USING (is_published = true);

-- Public can read published blog posts
CREATE POLICY "Public can read published blog posts" 
  ON public.blog_posts FOR SELECT 
  USING (is_published = true);

-- Platform Admins can manage marketing pages
CREATE POLICY "Platform admins can manage marketing pages" 
  ON public.marketing_pages 
  FOR ALL 
  USING (public.is_platform_admin());

-- Platform Admins can manage blog posts
CREATE POLICY "Platform admins can manage blog posts" 
  ON public.blog_posts 
  FOR ALL 
  USING (public.is_platform_admin());

-- 4. Initial Seed Data for Dynamic Marketing Pages
-- (The core pages like Home, Pricing, About, Contact are static. These are the dynamic E-E-A-T pages)
INSERT INTO public.marketing_pages (slug, category, title, meta_description, content) VALUES
('features/shared-inbox', 'feature', 'Multi-Agent Shared Inbox', 'Manage all WhatsApp conversations with a collaborative team inbox.', '# Multi-Agent Shared Inbox\n\nScale your team support with a single WhatsApp number.'),
('features/whatsapp-chatbot-builder', 'feature', 'No-Code Chatbot Builder', 'Build WhatsApp chatbots without writing code.', '# No-Code Chatbot Builder\n\nAutomate replies instantly.'),
('features/whatsapp-broadcast', 'feature', 'Bulk WhatsApp Broadcast', 'Send WhatsApp campaigns to thousands of users.', '# Bulk Broadcast\n\nHigh conversion messaging.'),
('features/lead-automation', 'feature', 'Automated Lead Capture', 'Capture leads automatically on WhatsApp.', '# Lead Automation\n\nNever miss a lead.'),
('features/whatsapp-api-integration', 'feature', 'Official WhatsApp Business API', 'Apply for official WhatsApp WABA API green tick.', '# API Integration\n\nGet verified.'),
('features/analytics-reporting', 'feature', 'Analytics & Reports', 'WhatsApp chat analytics and tracking.', '# Analytics & Reporting\n\nMeasure performance.'),

('solutions/real-estate', 'solution', 'WhatsApp CRM for Real Estate', 'Property inquiries and site visit scheduling.', '# Real Estate Solutions\n\nAutomate property tours.'),
('solutions/ecommerce', 'solution', 'WhatsApp CRM for E-Commerce', 'Abandoned cart recovery and order updates.', '# E-Commerce Solutions\n\nBoost sales.'),
('solutions/education', 'solution', 'WhatsApp CRM for Education', 'Course inquiries and fee reminders.', '# Education Solutions\n\nEngage students.'),
('solutions/automobile', 'solution', 'WhatsApp CRM for Automobile', 'Test drives and service alerts.', '# Automobile Solutions\n\nDrive more sales.'),
('solutions/healthcare', 'solution', 'WhatsApp CRM for Healthcare', 'Appointments and prescriptions.', '# Healthcare Solutions\n\nPatient communication.'),
('solutions/service-businesses', 'solution', 'WhatsApp CRM for Services', 'Service tracking and dispatching.', '# Service Solutions\n\nDispatch faster.'),

('integrations/shopify', 'integration', 'Shopify WhatsApp Integration', 'Sync Shopify orders to WhatsApp.', '# Shopify Integration\n\nConnect your store.'),
('integrations/woocommerce', 'integration', 'WooCommerce Integration', 'Connect WordPress with WhatsApp.', '# WooCommerce Integration\n\nE-commerce automation.'),
('integrations/hubspot-crm', 'integration', 'HubSpot & Salesforce', 'Sync WhatsApp with Enterprise CRMs.', '# Enterprise CRM Integration\n\nBi-directional sync.'),
('integrations/zapier-webhooks', 'integration', 'Zapier & Webhooks', 'Connect to 5,000+ apps.', '# Zapier & Webhooks\n\nInfinite possibilities.'),

('resources/whatsapp-api-pricing-guide', 'resource', 'WhatsApp API Pricing Guide 2026', 'Explanation of Meta conversation charges.', '# WhatsApp Pricing Guide\n\nUnderstand Meta rates.'),
('compare/wacrm-vs-wati', 'resource', 'WaCRM vs Wati', 'Direct feature comparison.', '# WaCRM vs Wati\n\nWhy we are better.'),
('compare/wacrm-vs-interakt', 'resource', 'WaCRM vs Interakt', 'Competitive comparison.', '# WaCRM vs Interakt\n\nFeature showdown.'),
('tools/whatsapp-link-generator', 'resource', 'WhatsApp Link Generator', 'Free utility tool.', '# Link Generator\n\nCreate wa.me links easily.')
ON CONFLICT (slug) DO NOTHING;
