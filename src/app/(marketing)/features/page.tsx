import type { Metadata } from 'next';
import { MessageSquareShare, MessageSquare, Users, Zap, BarChart, Shield, Globe2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features | Success Digital',
  description: 'Explore the powerful features of Success Digital that help you automate and scale your WhatsApp communications.',
};

export default function FeaturesPage() {
  const features = [
    {
      name: 'Visual Automations',
      description: 'Build complex chatbots and workflows using our futuristic drag-and-drop canvas.',
      icon: Zap,
    },
    {
      name: 'Smart Shared Inbox',
      description: 'Manage all your customer conversations in one lightning-fast collaborative team inbox.',
      icon: MessageSquare,
    },
    {
      name: 'Advanced Analytics',
      description: 'Track agent performance, message delivery rates, and conversion metrics in real-time.',
      icon: BarChart,
    },
    {
      name: 'Global Broadcasts',
      description: 'Reach thousands of users instantly with targeted WhatsApp template campaigns.',
      icon: Globe2,
    },
    {
      name: 'Team Collaboration',
      description: 'Assign chats, leave internal notes, and manage agent permissions with ease.',
      icon: Users,
    },
    {
      name: 'Enterprise Security',
      description: 'Bank-grade encryption, role-based access control, and full compliance with Meta\'s policies.',
      icon: Shield,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 sm:py-32">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
            Platform <span className="text-whatsapp">Features</span>
          </h1>
          <p className="text-xl leading-8 text-slate-300 max-w-2xl mx-auto">
            Everything you need to automate your customer relationships and scale your business on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {features.map((feature) => (
            <div 
              key={feature.name}
              className="flex items-start gap-6 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-slate-900/80 hover:border-whatsapp/50 transition-all duration-300"
            >
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 shrink-0">
                <feature.icon className="h-8 w-8 text-whatsapp" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.name}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
