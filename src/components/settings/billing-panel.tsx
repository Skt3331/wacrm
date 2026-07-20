import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreditCard, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { useBillingUsage } from '@/hooks/use-billing-usage';
import { UsageWidget } from './usage-widget';
import { Skeleton } from '@/components/ui/skeleton';

export function BillingPanel() {
  const [loading, setLoading] = useState(false);
  const { usage, loading: usageLoading } = useBillingUsage();

  const handleManageBilling = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (usageLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  const { subscription, isLifetime, tierName } = usage || {};
  const price = subscription?.price;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price?.currency || 'USD',
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Billing & Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription plan, payment methods, and billing history.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Plan Overview */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isLifetime ? <ShieldCheck className="h-5 w-5 text-amber-500" /> : <CreditCard className="h-5 w-5 text-primary" />}
              Current Plan
            </CardTitle>
            <CardDescription>
              You are currently on the <span className="font-semibold text-foreground">{tierName}</span> plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 border border-border">
              {isLifetime ? (
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-8 w-8 text-amber-500" />
                  <div>
                    <p className="font-medium">Lifetime Access</p>
                    <p className="text-sm text-muted-foreground">Your account has unrestricted manual access.</p>
                  </div>
                </div>
              ) : subscription ? (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {subscription.cancel_at_period_end ? 'Cancels on' : 'Next billing date'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(subscription.current_period_end).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {price ? `${formatter.format(price.unit_amount / 100)} / ${price.interval}` : 'Unknown Price'}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{subscription.status}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="font-medium">No active subscription</p>
                    <p className="text-sm text-muted-foreground">You are currently on the free trial.</p>
                  </div>
                </div>
              )}
            </div>
            
            <Button
              onClick={handleManageBilling}
              disabled={loading}
              variant={isLifetime ? "outline" : "default"}
              className={isLifetime ? "w-full sm:w-auto" : "w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"}
            >
              {loading ? 'Redirecting...' : (
                <>
                  Manage in Stripe Portal <ExternalLink className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Usage Widget */}
        <UsageWidget />
      </div>
    </div>
  );
}
