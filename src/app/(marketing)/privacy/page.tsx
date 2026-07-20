import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Success Digital',
  description: 'Privacy Policy outlining how Success Digital collects and protects your data.',
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 sm:py-32 bg-slate-950">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-slate max-w-none">
          <p className="mb-4 text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="text-slate-300">
              When you use Success Digital, we collect information you provide directly to us, such as your name, email address, phone number, and company details. We also collect data related to your WhatsApp Business API usage to facilitate our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Data</h2>
            <p className="text-slate-300">
              We use the collected data to provide, maintain, and improve our services. This includes managing your account, processing payments, sending technical notices, and providing customer support. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
            <p className="text-slate-300">
              We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or destruction. We partner with secure cloud infrastructure providers and ensure encrypted communications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
            <p className="text-slate-300">
              If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@successdigital.online.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
