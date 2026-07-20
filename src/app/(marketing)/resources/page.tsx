import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowRight, FileText, Zap, BookOpen, MessageCircle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources | Success Digital',
  description: 'Guides, tutorials, and deep-dives into WhatsApp marketing and API features.',
};

export const revalidate = 60; // Revalidate every minute

export default async function ResourcesIndexPage() {
  const supabase = await createClient();
  
  // Fetch all published resources from the CMS
  const { data: resources } = await supabase
    .from('marketing_pages')
    .select('slug, title, meta_description')
    .eq('category', 'resource')
    .eq('is_published', true);

  const getIcon = (slug: string) => {
    if (slug.includes('api')) return <Zap className="h-8 w-8 text-whatsapp" />;
    if (slug.includes('ban') || slug.includes('security')) return <ShieldCheck className="h-8 w-8 text-whatsapp" />;
    if (slug.includes('guide') || slug.includes('how-to')) return <BookOpen className="h-8 w-8 text-whatsapp" />;
    if (slug.includes('message') || slug.includes('chat')) return <MessageCircle className="h-8 w-8 text-whatsapp" />;
    return <FileText className="h-8 w-8 text-whatsapp" />;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 sm:py-32 bg-slate-950">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-whatsapp/30 bg-whatsapp/10 px-4 py-1.5 text-sm font-semibold text-whatsapp mb-8 shadow-[0_0_15px_rgba(37,211,102,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-neon-green mr-2 animate-pulse"></span>
            Knowledge Base
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Success Digital <span className="text-whatsapp">Resources</span>
          </h1>
          <p className="text-xl leading-8 text-slate-300 max-w-2xl mx-auto">
            Everything you need to know about the WhatsApp Business API, green tick verification, pricing, and scaling your support.
          </p>
        </div>

        {(!resources || resources.length === 0) ? (
          <div className="text-center py-20 bg-slate-900/20 border border-white/5 rounded-3xl">
            <h3 className="text-xl text-slate-400">Loading resources...</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res) => (
              <Link key={res.slug} href={`/${res.slug}`} className="group relative flex flex-col p-8 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-whatsapp/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.15)] hover:-translate-y-1">
                <div className="mb-6 h-14 w-14 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/5 group-hover:bg-whatsapp/10 group-hover:border-whatsapp/30 transition-colors">
                  {getIcon(res.slug)}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-whatsapp transition-colors">{res.title}</h3>
                <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">{res.meta_description}</p>
                <div className="flex items-center text-slate-300 text-sm font-semibold mt-auto group-hover:text-white transition-colors">
                  Read Guide <ArrowRight className="h-4 w-4 ml-2 text-whatsapp group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
