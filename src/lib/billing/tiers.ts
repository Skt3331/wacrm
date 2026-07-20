export interface SubscriptionTier {
  name: string;
  maxContacts: number | 'unlimited';
  maxMembers: number | 'unlimited';
  features: string[];
}

export const TIERS: Record<string, SubscriptionTier> = {
  // Lifetime Access / Super Admins get everything
  lifetime: {
    name: 'Lifetime Pro',
    maxContacts: 'unlimited',
    maxMembers: 'unlimited',
    features: ['All Premium Features', 'Priority Support', 'AI Replies'],
  },
  // If they have no active sub and no lifetime access, they shouldn't even be able to log in to the dashboard 
  // (due to our layout guard), but we define a free fallback just in case.
  free: {
    name: 'Free Trial',
    maxContacts: 500,
    maxMembers: 1,
    features: ['Basic CRM', 'Single User'],
  },
  // We map Stripe Price IDs directly to these tiers.
  // The exact IDs should be loaded from env vars.
  [process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || 'price_starter_placeholder']: {
    name: 'Starter',
    maxContacts: 2000,
    maxMembers: 3,
    features: ['Basic CRM', 'Up to 3 Team Members', '2,000 Contacts'],
  },
  [process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'price_pro_placeholder']: {
    name: 'Pro',
    maxContacts: 'unlimited',
    maxMembers: 10,
    features: ['Advanced CRM', 'Up to 10 Team Members', 'Unlimited Contacts', 'AI Auto-Replies'],
  }
};

/**
 * Helper to get tier configuration by Stripe Price ID.
 * Defaults to "free" tier if unknown.
 */
export function getTierByPriceId(priceId: string | null | undefined): SubscriptionTier {
  if (!priceId) return TIERS.free;
  return TIERS[priceId] || TIERS.free;
}
