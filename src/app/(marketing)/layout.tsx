import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquareShare } from 'lucide-react';
import { WhatsAppWidget } from '@/components/marketing/whatsapp-widget';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50 selection:bg-whatsapp/30">
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-whatsapp/10 border border-whatsapp/20 group-hover:border-whatsapp/50 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all">
                <MessageSquareShare className="h-5 w-5 text-whatsapp" />
              </div>
              <span className="hidden font-bold text-white sm:inline-block">
                Success Digital
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/features" className="text-sm font-medium text-slate-300 hover:text-whatsapp transition-colors">Product</Link>
              <Link href="/solutions" className="text-sm font-medium text-slate-300 hover:text-whatsapp transition-colors">Solutions</Link>
              <Link href="/integrations" className="text-sm font-medium text-slate-300 hover:text-whatsapp transition-colors">Integrations</Link>
              <Link href="/resources" className="text-sm font-medium text-slate-300 hover:text-whatsapp transition-colors">Resources</Link>
              <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-whatsapp transition-colors">Pricing</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-whatsapp text-slate-950 hover:bg-neon-green font-semibold shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:shadow-[0_0_25px_rgba(57,255,20,0.6)] transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">{children}</main>
      
      <WhatsAppWidget />
      
      <footer className="border-t border-white/10 bg-slate-950 py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-whatsapp/10 border border-whatsapp/20 group-hover:border-whatsapp/50 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all">
                  <MessageSquareShare className="h-5 w-5 text-whatsapp" />
                </div>
                <span className="text-xl font-bold text-white group-hover:text-whatsapp transition-colors">Success Digital</span>
              </Link>
              <p className="text-slate-400 text-sm mb-4">
                Automate sales, manage customer conversations, and scale support on WhatsApp with successdigital.online.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/features/shared-inbox" className="hover:text-whatsapp transition-colors">Shared Team Inbox</Link></li>
                <li><Link href="/features/whatsapp-chatbot-builder" className="hover:text-whatsapp transition-colors">Chatbot Builder</Link></li>
                <li><Link href="/features/whatsapp-broadcast" className="hover:text-whatsapp transition-colors">Bulk Broadcasts</Link></li>
                <li><Link href="/features/whatsapp-api-integration" className="hover:text-whatsapp transition-colors">API Integration</Link></li>
                <li><Link href="/features/analytics-reporting" className="hover:text-whatsapp transition-colors">Analytics</Link></li>
                <li><Link href="/features/automated-whatsapp-reminders" className="hover:text-whatsapp transition-colors">Automated Reminders</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Solutions</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/solutions/small-business-whatsapp-crm" className="hover:text-whatsapp transition-colors">Small Business CRM</Link></li>
                <li><Link href="/solutions/real-estate" className="hover:text-whatsapp transition-colors">Real Estate</Link></li>
                <li><Link href="/solutions/ecommerce" className="hover:text-whatsapp transition-colors">E-Commerce & D2C</Link></li>
                <li><Link href="/solutions/education" className="hover:text-whatsapp transition-colors">Education & Classes</Link></li>
                <li><Link href="/solutions/travel-agency-whatsapp-crm" className="hover:text-whatsapp transition-colors">Travel Agencies</Link></li>
                <li><Link href="/solutions/financial-services-crm" className="hover:text-whatsapp transition-colors">Financial Services</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Integrations & Resources</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/integrations/shopify" className="hover:text-whatsapp transition-colors">Shopify Integration</Link></li>
                <li><Link href="/integrations/woocommerce" className="hover:text-whatsapp transition-colors">WooCommerce</Link></li>
                <li><Link href="/resources/whatsapp-messages-from-excel" className="hover:text-whatsapp transition-colors">WhatsApp from Excel</Link></li>
                <li><Link href="/resources/whatsapp-api-pricing-india" className="hover:text-whatsapp transition-colors">API Pricing Guide</Link></li>
                <li><Link href="/resources/whatsapp-green-tick-verification" className="hover:text-whatsapp transition-colors">Get Green Tick</Link></li>
                <li><Link href="/resources/avoid-whatsapp-ban" className="hover:text-whatsapp transition-colors">Avoid WhatsApp Ban</Link></li>
                <li><Link href="/compare/whatsapp-api-vs-business-app" className="hover:text-whatsapp transition-colors">API vs Business App</Link></li>
                <li><Link href="/compare/successdigital-vs-zendesk" className="hover:text-whatsapp transition-colors">Vs Zendesk</Link></li>
                <li><Link href="/compare/success-digital-vs-wati" className="hover:text-whatsapp transition-colors">Vs Wati</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company & Legal</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-whatsapp transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-whatsapp transition-colors">Contact Us</Link></li>
                <li><Link href="/pricing" className="hover:text-whatsapp transition-colors">Pricing Plans</Link></li>
                <li><Link href="/blog" className="hover:text-whatsapp transition-colors">Blog & Guides</Link></li>
                <li><Link href="/privacy" className="hover:text-whatsapp transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-whatsapp transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center md:text-left text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1">
              <p>📍 HEADQUARTERS: Shikrapur, Pune, Maharashtra, India - 412208</p>
              <p>📞 Phone/WhatsApp: +91 7507408461 | ✉️ Email: sauravtemgire@gmail.com</p>
            </div>
            <div className="text-right">
              <p>© {new Date().getFullYear()} Success Digital. All rights reserved.</p>
              <p className="mt-1">Built for modern & intelligent communication on successdigital.online.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
