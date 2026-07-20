import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowRight, Building2, Stethoscope, ShoppingBag, Car, GraduationCap, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industry Solutions | Success Digital',
  description: 'Discover how Success Digital helps specific industries scale their WhatsApp communication.',
};

export const revalidate = 60; // Revalidate every minute

export default async function SolutionsIndexPage() {
  const supabase = await createClient();
  
  // Fetch all published solutions from the CMS
  const { data: solutions } = await supabase
    .from('marketing_pages')
    .select('slug, title, meta_description')
    .eq('category', 'solution')
    .eq('is_published', true);

  // A mapping to assign some nice icons based on keywords in the slug
  const getIcon = (slug: string) => {
    if (slug.includes('real-estate')) return <Building2 className="h-8 w-8 text-whatsapp" />;
    if (slug.includes('health') || slug.includes('clinic')) return <Stethoscope className="h-8 w-8 text-whatsapp" />;
    if (slug.includes('ecommerce') || slug.includes('retail')) return <ShoppingBag className="h-8 w-8 text-whatsapp" />;
    if (slug.includes('auto') || slug.includes('dealership')) return <Car className="h-8 w-8 text-whatsapp" />;
    if (slug.includes('edu') || slug.includes('class')) return <GraduationCap className="h-8 w-8 text-whatsapp" />;
    return <Briefcase className="h-8 w-8 text-whatsapp" />;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 sm:py-32 bg-slate-950">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-whatsapp/30 bg-whatsapp/10 px-4 py-1.5 text-sm font-semibold text-whatsapp mb-8 shadow-[0_0_15px_rgba(37,211,102,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-neon-green mr-2 animate-pulse"></span>
            Industry Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Built for your <span className="text-whatsapp">Industry</span>
          </h1>
          <p className="text-xl leading-8 text-slate-300 max-w-2xl mx-auto">
            See how forward-thinking companies in your sector use Success Digital to automate sales, marketing, and support.
          </p>
        </div>

        {(!solutions || solutions.length === 0) ? (
          <div className="text-center py-20 bg-slate-900/20 border border-white/5 rounded-3xl">
            <h3 className="text-xl text-slate-400">Loading industry solutions...</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => (
              <Link key={sol.slug} href={`/${sol.slug}`} className="group relative flex flex-col p-8 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-whatsapp/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.15)] hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 group-hover:rotate-12 duration-500">
                  {getIcon(sol.slug)}
                </div>
                <div className="mb-6 h-16 w-16 rounded-2xl bg-slate-800/50 flex items-center justify-center border border-white/5 group-hover:bg-whatsapp/10 group-hover:border-whatsapp/30 transition-colors">
                  {getIcon(sol.slug)}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{sol.title}</h3>
                <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">{sol.meta_description}</p>
                <div className="flex items-center text-whatsapp text-sm font-bold mt-auto group-hover:text-neon-green transition-colors">
                  Explore Solution <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
