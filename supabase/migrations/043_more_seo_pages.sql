-- Migration 043: Adding more SEO Pages to the CMS based on Google Search Trends

-- 1. Insert highly targeted Google search queries into marketing pages
INSERT INTO public.marketing_pages (slug, category, title, meta_description, content) VALUES
('solutions/small-business-whatsapp-crm', 'solution', 'WhatsApp CRM for Small Business', 'The perfect WhatsApp CRM software for small businesses to automate sales and support affordably.', '# WhatsApp CRM for Small Business\n\nAutomate your customer interactions without blowing your budget.'),
('resources/whatsapp-green-tick-verification', 'resource', 'How to get WhatsApp Green Tick Verification', 'A step-by-step guide to applying for the official WhatsApp Business API Green Tick.', '# WhatsApp Green Tick Guide\n\nStand out and build trust with the official green badge.'),
('resources/whatsapp-api-pricing-india', 'resource', 'WhatsApp Business API Pricing in India (2026)', 'Complete breakdown of Meta conversation charges and pricing for Indian businesses.', '# WhatsApp API Pricing in India\n\nUnderstand utility, marketing, and service conversation rates.'),
('resources/whatsapp-bulk-message-sender', 'resource', 'WhatsApp Bulk Message Sender Guide', 'How to safely send bulk messages on WhatsApp without getting banned.', '# Bulk WhatsApp Messaging\n\nReach thousands instantly with template campaigns.'),
('features/automated-whatsapp-reminders', 'feature', 'Automated WhatsApp Reminders', 'Send automated payment, appointment, and cart abandonment reminders on WhatsApp.', '# Automated Reminders\n\nReduce no-shows and recover abandoned carts.'),
('compare/successdigital-vs-zendesk', 'resource', 'Success Digital vs Zendesk', 'Why Success Digital is the ultimate WhatsApp-first alternative to Zendesk.', '# Success Digital vs Zendesk\n\nBuilt specifically for the WhatsApp era.'),
('solutions/travel-agency-whatsapp-crm', 'solution', 'WhatsApp CRM for Travel Agencies', 'Automate booking confirmations, itineraries, and customer support for travel agents.', '# Travel Agency CRM\n\nStreamline your bookings on WhatsApp.'),
('solutions/financial-services-crm', 'solution', 'WhatsApp CRM for Financial Services', 'Securely share policy updates, premium reminders, and support for finance companies.', '# Financial Services on WhatsApp\n\nBank-grade security meets instant communication.'),
('resources/whatsapp-chatbot-guide', 'resource', 'The Ultimate Guide to WhatsApp Chatbots', 'Everything you need to know about building AI and rule-based chatbots for WhatsApp.', '# Building a WhatsApp Chatbot\n\nAutomate your first line of support.')
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    meta_description = EXCLUDED.meta_description,
    content = EXCLUDED.content;

-- 2. Insert a top SEO blog post
INSERT INTO public.blog_posts (slug, title, excerpt, content, author, is_published, published_at) VALUES
('whatsapp-marketing-strategies', 'Top 5 WhatsApp Marketing Strategies for 2026', 'Discover the most effective ways to leverage WhatsApp broadcasts and catalogs to 10x your sales.', '# Top 5 WhatsApp Marketing Strategies\n\nIn 2026, conversational commerce is king. Here is how to win.', 'Success Digital Team', true, NOW())
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content;
