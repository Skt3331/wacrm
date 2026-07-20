import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/use-auth';

export interface UsageStats {
  contactsCount: number;
  membersCount: number;
  tierName: string;
  maxContacts: number | 'unlimited';
  maxMembers: number | 'unlimited';
  isLifetime: boolean;
  priceId: string | null;
  subscription?: Record<string, unknown>;
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

      const [contactRes, membersRes] = await Promise.all([
        supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true })
          .eq('account_id', accountId),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('account_id', accountId)
      ]);

      setUsage({
        contactsCount: contactRes.count || 0,
        membersCount: membersRes.count || 0,
        tierName: 'Free',
        maxContacts: 'unlimited',
        maxMembers: 'unlimited',
        isLifetime: true,
        priceId: null,
      });

      setLoading(false);
    }

    fetchUsage();
  }, [accountId]);

  return { usage, loading };
}
