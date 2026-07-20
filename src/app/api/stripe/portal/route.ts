import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // We must use a service role key to fetch from the customers table because of RLS
    // Actually, RLS on customers says "auth.uid() = id", so the regular client can fetch it!
    const { data: customer } = await supabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (!customer || !customer.stripe_customer_id) {
      return new NextResponse('No Stripe customer found', { status: 400 });
    }

    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: customer.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings?tab=billing`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err: any) {
    console.error(err);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
