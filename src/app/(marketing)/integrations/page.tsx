import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Workflow, ShoppingCart, Webhook, Box, Globe2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Integrations | Success Digital',
  description: 'Connect Success Digital with the tools you already use like Shopify, WooCommerce, and Zapier.',
};

export default function IntegrationsIndexPage() {
  const integrations = [
    {
      title: 'Shopify',
      description: 'Automatically trigger WhatsApp abandoned cart messages and order confirmations directly from your Shopify store.',
      icon: <ShoppingCart className="h-8 w-8 text-whatsapp" />,
      link: '/integrations/shopify',
    },
    {
      title: 'WooCommerce',
      description: 'Sync your WooCommerce products and send shipping updates to customers via WhatsApp.',
      icon: <Box className="h-8 w-8 text-whatsapp" />,
      link: '/integrations/woocommerce',
    },
    {
      title: 'Zapier',
      description: 'Connect Success Digital to over 5,000+ apps. Trigger WhatsApp messages from any CRM, form, or spreadsheet.',
      icon: <Workflow className="h-8 w-8 text-whatsapp" />,
      link: '/integrations/zapier-webhooks',
    },
    {
      title: 'Make (Integromat)',
      description: 'Build complex visual automations connecting Success Digital with your entire tech stack.',
      icon: <Globe2 className="h-8 w-8 text-whatsapp" />,
      link: '/integrations/zapier-webhooks',
    },
    {
      title: 'Custom Webhooks',
      description: 'Build your own custom integrations using our robust API and developer-friendly webhooks.',
      icon: <Webhook className="h-8 w-8 text-whatsapp" />,
      link: '/integrations/zapier-webhooks',
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 sm:py-32 bg-slate-950">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-whatsapp/30 bg-whatsapp/10 px-4 py-1.5 text-sm font-semibold text-whatsapp mb-8 shadow-[0_0_15px_rgba(37,211,102,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-neon-green mr-2 animate-pulse"></span>
            App Directory
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Connect your <span className="text-whatsapp">stack</span>
          </h1>
          <p className="text-xl leading-8 text-slate-300 max-w-2xl mx-auto">
            Success Digital plugs right into the tools you already use. Automate your workflows without writing any code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {integrations.map((int) => (
            <Link key={int.title} href={int.link} className="group relative flex items-start p-8 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-whatsapp/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.15)] hover:-translate-y-1">
              <div className="mr-6 h-16 w-16 shrink-0 rounded-2xl bg-slate-800/50 flex items-center justify-center border border-white/5 group-hover:bg-whatsapp/10 group-hover:border-whatsapp/30 transition-colors">
                {int.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{int.title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{int.description}</p>
                <div className="flex items-center text-whatsapp text-sm font-bold group-hover:text-neon-green transition-colors">
                  View Integration <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
