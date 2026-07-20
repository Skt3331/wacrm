import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .single();

  if (!data) return { title: 'Not Found' };
  
  return {
    title: `${data.title} | Success Digital Blog`,
    description: data.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post || !post.is_published) {
    notFound();
  }

  return (
    <article className="min-h-screen py-24 sm:py-32">
      <div className="container mx-auto max-w-3xl px-4">
        <Link href="/blog" className="inline-flex items-center text-sm text-slate-400 hover:text-whatsapp transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-whatsapp" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-whatsapp" />
              {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
            </div>
          </div>
        </header>

        {post.cover_image_url && (
          <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
            <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-invert prose-lg prose-slate max-w-none prose-headings:text-white prose-a:text-whatsapp hover:prose-a:text-neon-green">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
