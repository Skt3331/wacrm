import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Zap, MessageSquareShare, Users, BarChart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Success Digital | The WhatsApp CRM',
  description: 'Success Digital is the ultimate WhatsApp CRM. Shared inbox, visual automations, and mass broadcasts built on the official Meta Cloud API.',
  openGraph: {
    title: 'Success Digital | The WhatsApp CRM',
    description: 'Success Digital is the ultimate WhatsApp CRM.',
    type: 'website',
  }
};

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Success Digital",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-24 sm:py-32 lg:pb-40 min-h-[90vh] flex items-center bg-grid-white/[0.02]">
        <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-whatsapp/20 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50"></div>
        
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center rounded-full border border-whatsapp/30 bg-whatsapp/10 px-4 py-1.5 text-sm font-semibold text-whatsapp mb-8 shadow-[0_0_15px_rgba(37,211,102,0.2)]">
            <span className="flex h-2 w-2 rounded-full bg-neon-green mr-2 animate-pulse"></span>
            Success Digital 2.0 is now live
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl mb-8 leading-[1.1]">
            The futuristic CRM built entirely on <span className="text-transparent bg-clip-text bg-gradient-to-r from-whatsapp to-neon-green filter drop-shadow-[0_0_10px_rgba(37,211,102,0.5)]">WhatsApp.</span>
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-slate-300 mb-10">
            Stop forcing customers to use email. Success Digital turns WhatsApp into a powerful shared inbox, marketing engine, and automated support desk.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="h-14 px-8 text-lg bg-whatsapp text-white font-bold hover:bg-neon-green hover:text-slate-900 shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] rounded-2xl transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg text-white border-white/20 hover:bg-white/10 hover:border-white/40 rounded-2xl transition-all duration-300 backdrop-blur-sm">
                Explore Features <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-x-6 text-sm text-slate-400">
            <div className="flex items-center gap-x-2">
              <Check className="h-5 w-5 text-whatsapp" /> No credit card required
            </div>
            <div className="flex items-center gap-x-2">
              <Check className="h-5 w-5 text-whatsapp" /> Official Meta Partner
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section (New) */}
      <section className="py-10 border-y border-white/5 bg-slate-900/50 w-full">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by 10,000+ fast-growing brands</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Fake logos using text for now, could be replaced with actual SVGs */}
            <h3 className="text-2xl font-black font-serif italic text-white">Acme Corp</h3>
            <h3 className="text-2xl font-black tracking-tighter text-white">GLOBEX</h3>
            <h3 className="text-2xl font-bold font-mono text-white">SOYUZ</h3>
            <h3 className="text-2xl font-bold uppercase tracking-widest text-white">Initech</h3>
            <h3 className="text-2xl font-black text-white">Umbrella</h3>
          </div>
        </div>
      </section>

      {/* Massive Features Bento Grid (New) */}
      <section className="py-24 relative overflow-hidden w-full">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-whatsapp/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Everything you need to <span className="text-whatsapp">scale</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A complete toolkit to turn your WhatsApp number into a revenue-generating machine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Card */}
            <div className="md:col-span-2 p-8 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl hover:border-whatsapp/30 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-whatsapp/10 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-whatsapp" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Smart Shared Inbox</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Bring your entire team into one collaborative inbox. Assign conversations, leave internal notes, and use AI to draft responses faster than ever before. Never lose track of a lead again.
              </p>
            </div>
            
            {/* Small Card */}
            <div className="p-8 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl hover:border-whatsapp/30 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-whatsapp/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-whatsapp" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Visual Automations</h3>
              <p className="text-slate-400 leading-relaxed">
                Build complex chatbots and routing rules with our intuitive drag-and-drop builder. No code required.
              </p>
            </div>

            {/* Small Card */}
            <div className="p-8 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl hover:border-whatsapp/30 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-whatsapp/10 flex items-center justify-center mb-6">
                <MessageSquareShare className="h-6 w-6 text-whatsapp" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Massive Broadcasts</h3>
              <p className="text-slate-400 leading-relaxed">
                Send personalized promotional messages to 100,000+ opted-in customers with a 98% open rate.
              </p>
            </div>

            {/* Large Card */}
            <div className="md:col-span-2 p-8 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl hover:border-whatsapp/30 transition-all duration-300 flex flex-col justify-center">
              <div className="h-12 w-12 rounded-xl bg-whatsapp/10 flex items-center justify-center mb-6">
                <BarChart className="h-6 w-6 text-whatsapp" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Actionable Analytics</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Measure what matters. Track agent response times, message delivery rates, broadcast ROI, and overall customer satisfaction in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI / Stats Section (New) */}
      <section className="py-24 relative overflow-hidden bg-slate-900/50 border-y border-white/5 w-full">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-black text-white mb-4 shadow-whatsapp">98%</div>
              <div className="text-xl font-bold text-whatsapp mb-2">Open Rate</div>
              <p className="text-slate-400">Compared to 15% for traditional email marketing.</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-white mb-4">3x</div>
              <div className="text-xl font-bold text-whatsapp mb-2">Faster Responses</div>
              <p className="text-slate-400">Automate FAQs and route complex queries instantly.</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-white mb-4">40%</div>
              <div className="text-xl font-bold text-whatsapp mb-2">Lower CAC</div>
              <p className="text-slate-400">Convert leads directly inside WhatsApp without landing pages.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="py-32 relative overflow-hidden mt-8 w-full">
        <div className="absolute inset-0 bg-whatsapp/5 backdrop-blur-3xl border-y border-whatsapp/20"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-whatsapp/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-8">
            Ready to plug into the matrix?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300 mb-10">
            Join forward-thinking companies automating their growth with Success Digital. Setup takes less than 2 minutes.
          </p>
          <Link href="/signup">
            <Button size="lg" className="h-16 px-10 text-xl bg-white text-slate-950 font-bold hover:bg-whatsapp hover:text-white shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(37,211,102,0.8)] rounded-2xl transition-all duration-300 transform hover:scale-105">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
