import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Success Digital',
  description: 'Terms of Service for using the Success Digital platform.',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 sm:py-32 bg-slate-950">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-300">
              Welcome to Success Digital. These Terms of Service govern your use of our website and CRM platform. By accessing or using our services, you agree to be bound by these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. Use of Service</h2>
            <p className="text-slate-300">
              You agree to use Success Digital only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use of the WhatsApp Business API complies with Meta&apos;s Commerce and Business Policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. Prohibited Conduct</h2>
            <p className="text-slate-300">
              You may not use Success Digital to send spam, unsolicited promotional messages, or any content that is illegal, abusive, or violates third-party rights. We reserve the right to suspend or terminate accounts that engage in prohibited activities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
            <p className="text-slate-300">
              Success Digital is provided &quot;as is&quot; without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
