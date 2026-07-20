import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { createClient } from '@/lib/supabase/client';

export function useSubscription() {
  const { accountId } = useAuth();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSubscription() {
      if (!accountId) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      const supabase = createClient();

      // 1. Check if the account has lifetime access (Admin bypass)
      // We also check if the user is a platform admin so they can access the dashboard.
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setHasAccess(false);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_platform_admin')
        .eq('user_id', user.id)
        .single();
        
      if (profile?.is_platform_admin) {
        setHasAccess(true);
        setLoading(false);
        return;
      }

      const { data: account } = await supabase
        .from('accounts')
        .select('has_lifetime_access')
        .eq('id', accountId)
        .single();

      if (account?.has_lifetime_access) {
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // 2. Check for an active Stripe subscription for this user
      // Note: In our current data model, `subscriptions` is linked to `user_id`, not `account_id`!
      // So we check if the current user owns an active subscription.


      const { data: sub } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', user.id)
        .in('status', ['active', 'trialing'])
        .maybeSingle();

      if (sub) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
      setLoading(false);
    }

    checkSubscription();
  }, [accountId]);

  return { hasAccess, loading };
}
