import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Success Digital',
  description: 'Latest news, strategies, and updates on WhatsApp marketing and API integrations.',
};

export const revalidate = 60; // Revalidate every minute

export default async function BlogIndexPage() {
  const supabase = await createClient();
  
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, published_at, author, cover_image_url')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
            Success Digital <span className="text-whatsapp">Blog</span>
          </h1>
          <p className="text-xl leading-8 text-slate-300 max-w-2xl mx-auto">
            Insights, strategies, and updates to help you grow your business on WhatsApp.
          </p>
        </div>

        {(!posts || posts.length === 0) ? (
          <div className="text-center py-20 bg-slate-900/20 border border-white/5 rounded-3xl">
            <h3 className="text-xl text-slate-400">No blog posts published yet.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-whatsapp/50 transition-colors">
                <div className="h-48 bg-slate-800 w-full flex items-center justify-center overflow-hidden">
                  {post.cover_image_url ? (
                    <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="text-slate-600 bg-slate-900 w-full h-full flex items-center justify-center group-hover:bg-whatsapp/10 transition-colors">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center text-xs text-slate-500 mb-3">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Draft'}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-whatsapp transition-colors">{post.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center text-whatsapp text-sm font-medium mt-auto">
                    Read Article <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
