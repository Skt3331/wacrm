'use client';

import { useBillingUsage } from '@/hooks/use-billing-usage';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function UsageWidget() {
  const { usage, loading } = useBillingUsage();

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6 flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!usage) return null;

  const contactsPercent = usage.maxContacts === 'unlimited' 
    ? 0 
    : Math.min(100, Math.round((usage.contactsCount / usage.maxContacts) * 100));
    
  const membersPercent = usage.maxMembers === 'unlimited'
    ? 0
    : Math.min(100, Math.round((usage.membersCount / usage.maxMembers) * 100));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Limits</CardTitle>
        <CardDescription>
          Your current usage on the <span className="font-semibold text-foreground">{usage.tierName}</span> plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contacts Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Contacts</span>
            <span className="text-muted-foreground">
              {usage.contactsCount} / {usage.maxContacts === 'unlimited' ? '∞' : usage.maxContacts}
            </span>
          </div>
          {usage.maxContacts !== 'unlimited' ? (
            <Progress value={contactsPercent} className="h-2" />
          ) : (
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-full opacity-50" />
            </div>
          )}
          {usage.maxContacts !== 'unlimited' && contactsPercent >= 90 && (
            <p className="text-xs text-amber-500 mt-1">You are nearing your contact limit.</p>
          )}
        </div>

        {/* Team Members Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Team Members</span>
            <span className="text-muted-foreground">
              {usage.membersCount} / {usage.maxMembers === 'unlimited' ? '∞' : usage.maxMembers}
            </span>
          </div>
          {usage.maxMembers !== 'unlimited' ? (
            <Progress value={membersPercent} className="h-2" />
          ) : (
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-full opacity-50" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
