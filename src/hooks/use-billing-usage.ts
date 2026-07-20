import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { getTierByPriceId, TIERS } from '@/lib/billing/tiers';

export interface UsageStats {
  contactsCount: number;
  membersCount: number;
  tierName: string;
  maxContacts: number | 'unlimited';
  maxMembers: number | 'unlimited';
  isLifetime: boolean;
  priceId: string | null;
  subscription?: {
    status: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
    price?: {
      unit_amount: number;
      currency: string;
      interval: string;
    }
  };
}

export function useBillingUsage() {
  const { accountId } = useAuth();
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsage() {
      if (!accountId) {
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // 1. Fetch current subscription and lifetime status
      const [subRes, accRes, contactRes, membersRes] = await Promise.all([
        supabase
          .from('subscriptions')
          .select(`
            status, 
            price_id, 
            current_period_end, 
            cancel_at_period_end,
            prices (
              unit_amount,
              currency,
              interval
            )
          `)
          .eq('user_id', user.id)
          .in('status', ['active', 'trialing'])
          .maybeSingle(),
        supabase
          .from('accounts')
          .select('has_lifetime_access')
          .eq('id', accountId)
          .single(),
        supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true })
          .eq('account_id', accountId),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('account_id', accountId)
      ]);

      const isLifetime = !!accRes.data?.has_lifetime_access;
      const priceId = subRes.data?.price_id || null;
      
      const tierConfig = isLifetime ? TIERS.lifetime : getTierByPriceId(priceId);

      setUsage({
        contactsCount: contactRes.count || 0,
        membersCount: membersRes.count || 0,
        tierName: tierConfig.name,
        maxContacts: tierConfig.maxContacts,
        maxMembers: tierConfig.maxMembers,
        isLifetime,
        priceId,
        subscription: subRes.data ? {
          status: subRes.data.status,
          current_period_end: subRes.data.current_period_end,
          cancel_at_period_end: subRes.data.cancel_at_period_end,
          price: subRes.data.prices ? {
            // @ts-ignore
            unit_amount: subRes.data.prices.unit_amount,
            // @ts-ignore
            currency: subRes.data.prices.currency,
            // @ts-ignore
            interval: subRes.data.prices.interval
          } : undefined
        } : undefined
      });

      setLoading(false);
    }

    fetchUsage();
  }, [accountId]);

  return { usage, loading };
}
