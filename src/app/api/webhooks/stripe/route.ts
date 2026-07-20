import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-06-24.dahlia',
});

// We need an admin client to bypass RLS for webhook updates
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return new Response('Webhook secret not found.', { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'product.created':
      case 'product.updated':
        const product = event.data.object as Stripe.Product;
        await supabaseAdmin.from('products').upsert({
          id: product.id,
          active: product.active,
          name: product.name,
          description: product.description,
          image: product.images?.[0] ?? null,
          metadata: product.metadata,
        });
        break;

      case 'price.created':
      case 'price.updated':
        const price = event.data.object as Stripe.Price;
        await supabaseAdmin.from('prices').upsert({
          id: price.id,
          product_id: typeof price.product === 'string' ? price.product : '',
          active: price.active,
          description: price.nickname,
          unit_amount: price.unit_amount,
          currency: price.currency,
          type: price.type,
          interval: price.recurring?.interval,
          interval_count: price.recurring?.interval_count,
          trial_period_days: price.recurring?.trial_period_days,
          metadata: price.metadata,
        });
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as any;
        
        // Fetch user from customer mapping
        const { data: customerData } = await supabaseAdmin
          .from('customers')
          .select('id')
          .eq('stripe_customer_id', subscription.customer)
          .single();

        if (customerData) {
          await supabaseAdmin.from('subscriptions').upsert({
            id: subscription.id,
            user_id: customerData.id,
            status: subscription.status,
            metadata: subscription.metadata,
            price_id: subscription.items.data[0].price.id,
            quantity: subscription.items.data[0].quantity,
            cancel_at_period_end: subscription.cancel_at_period_end,
            created: new Date(subscription.created * 1000).toISOString(),
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            ended_at: subscription.ended_at ? new Date(subscription.ended_at * 1000).toISOString() : null,
            cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
            canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
            trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
            trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
          });
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error('Error handling webhook event', error);
    return new Response('Webhook handler failed', { status: 500 });
  }

  return NextResponse.json({ received: true });
}
