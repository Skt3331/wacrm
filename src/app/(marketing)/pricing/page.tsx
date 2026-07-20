import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing | Success Digital',
  description: 'Simple, transparent pricing for teams of all sizes. Built on the official WhatsApp Business API.',
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
            Simple pricing for <span className="text-whatsapp">fast-growing</span> teams
          </h1>
          <p className="text-xl text-slate-400">
            Start free, then choose a plan that fits your needs. All plans include full access to the Success Digital platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2">Starter</h3>
            <p className="text-slate-400 mb-6">Perfect for small teams getting started.</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">$0</span>
              <span className="text-slate-400">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {['1 Team Member', '100 Conversations/mo', 'Basic CRM', 'Community Support'].map((feature) => (
                <li key={feature} className="flex items-center text-slate-300">
                  <Check className="h-5 w-5 text-whatsapp mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block w-full">
              <Button variant="outline" className="w-full h-12 bg-transparent border-white/20 text-white hover:bg-white/10">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-whatsapp/50 shadow-[0_0_30px_rgba(37,211,102,0.15)] rounded-3xl p-8 flex flex-col relative">
            <div className="absolute top-0 right-6 transform -translate-y-1/2">
              <span className="bg-whatsapp text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
            <p className="text-slate-400 mb-6">For growing businesses needing advanced tools.</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">$49</span>
              <span className="text-slate-400">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {['Unlimited Team Members', 'Unlimited Conversations', 'Advanced Automations', 'API Access', 'Priority 24/7 Support'].map((feature) => (
                <li key={feature} className="flex items-center text-slate-300">
                  <Check className="h-5 w-5 text-whatsapp mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block w-full">
              <Button className="w-full h-12 bg-whatsapp text-slate-950 hover:bg-neon-green font-bold">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
