import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';

export const revalidate = 60; // Revalidate every minute

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = slug.join('/');
  
  const supabase = await createClient();
  const { data } = await supabase
    .from('marketing_pages')
    .select('title, meta_description')
    .eq('slug', fullSlug)
    .single();

  if (!data) return { title: 'Not Found' };
  
  return {
    title: `${data.title} | Success Digital`,
    description: data.meta_description,
  };
}

export default async function DynamicMarketingPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const fullSlug = slug.join('/');
  
  const supabase = await createClient();
  
  const { data: page } = await supabase
    .from('marketing_pages')
    .select('*')
    .eq('slug', fullSlug)
    .single();

  if (!page || !page.is_published) {
    notFound();
  }

  // To give a bit of flavor, we can add a simple hero based on category
  const categoryLabels: Record<string, string> = {
    'feature': 'Success Digital Feature',
    'solution': 'Industry Solution',
    'integration': 'Integration',
    'resource': 'Resource',
  };

  const label = categoryLabels[page.category] || 'Marketing';

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 border-b border-white/5 bg-grid-white/[0.02]">
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-whatsapp/10 rounded-full blur-[100px] -z-10 pointer-events-none opacity-50"></div>
        
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center rounded-full border border-whatsapp/30 bg-whatsapp/10 px-4 py-1.5 text-sm font-semibold text-whatsapp mb-8 shadow-[0_0_15px_rgba(37,211,102,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-neon-green mr-2 animate-pulse"></span>
            {label}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            {page.title}
          </h1>
          {page.meta_description && (
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {page.meta_description}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,211,102,0.03),transparent_50%)] pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl px-4">
          <div className="prose prose-invert prose-lg md:prose-xl prose-slate max-w-none 
                          prose-headings:text-white prose-headings:font-bold 
                          prose-a:text-whatsapp hover:prose-a:text-neon-green 
                          prose-p:text-slate-300 prose-p:leading-relaxed
                          prose-li:text-slate-300 prose-li:marker:text-whatsapp
                          bg-slate-900/40 backdrop-blur-xl border border-white/10 
                          rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl shadow-whatsapp/5">
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </div>
        </div>
      </section>
      
      {/* Massive CTA Section */}
      <section className="py-24 relative overflow-hidden mt-8">
        <div className="absolute inset-0 bg-whatsapp/5 backdrop-blur-3xl border-y border-whatsapp/20"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of companies scaling their sales and support with Success Digital today. Setup takes less than 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="h-16 px-10 text-xl bg-whatsapp text-slate-950 font-bold hover:bg-neon-green shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(57,255,20,0.6)] rounded-2xl transition-all duration-300 transform hover:scale-105">
                Get Started for Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-16 px-10 text-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-whatsapp/50 backdrop-blur-md rounded-2xl transition-all duration-300">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
