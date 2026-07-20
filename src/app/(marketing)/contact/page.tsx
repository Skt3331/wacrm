import type { Metadata } from 'next';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | WaCRM',
  description: 'Get in touch with the WaCRM team for support, sales, or partnerships.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 sm:py-32">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-8">
          Get in <span className="text-whatsapp">Touch</span>
        </h1>
        <p className="text-xl leading-8 text-slate-300 mb-16 max-w-2xl mx-auto">
          Whether you have a question about features, pricing, or need technical support, our team is ready to answer all your questions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <Mail className="h-10 w-10 text-whatsapp mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
            <p className="text-slate-400">sauravtemgire@gmail.com</p>
          </div>
          <div className="flex flex-col items-center bg-slate-900/40 backdrop-blur-md border border-whatsapp/30 shadow-[0_0_15px_rgba(37,211,102,0.1)] rounded-2xl p-8">
            <MessageSquare className="h-10 w-10 text-whatsapp mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp Support</h3>
            <p className="text-slate-400">+91 7507408461</p>
          </div>
          <div className="flex flex-col items-center bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <MapPin className="h-10 w-10 text-whatsapp mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Headquarters</h3>
            <p className="text-slate-400">Shikrapur, Pune, Maharashtra</p>
          </div>
        </div>
      </div>
    </div>
  );
}
