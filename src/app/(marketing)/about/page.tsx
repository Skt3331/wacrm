import type { Metadata } from 'next';
import { ShieldCheck, Zap, Globe2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Success Digital',
  description: 'Learn more about Success Digital, the next-generation WhatsApp CRM platform built for modern businesses.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-8">
          About <span className="text-whatsapp">Success Digital</span>
        </h1>
        <p className="text-xl leading-8 text-slate-300 mb-16">
          We are on a mission to democratize enterprise-grade communication. 
          Success Digital was built to seamlessly connect businesses with their customers on the platform they use every day.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-whatsapp/50 transition-colors">
            <Globe2 className="h-10 w-10 text-whatsapp mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Global Reach</h3>
            <p className="text-slate-400">Connect with customers anywhere in the world instantly.</p>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-whatsapp/50 transition-colors">
            <Zap className="h-10 w-10 text-whatsapp mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">High Performance</h3>
            <p className="text-slate-400">Engineered for speed, capable of handling thousands of messages per second.</p>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-whatsapp/50 transition-colors">
            <ShieldCheck className="h-10 w-10 text-whatsapp mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
            <p className="text-slate-400">Built on top of WhatsApp&apos;s end-to-end encryption API.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
