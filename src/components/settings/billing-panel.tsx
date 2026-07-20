import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreditCard, ExternalLink } from 'lucide-react';

export function BillingPanel() {
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Billing & Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription plan, payment methods, and billing history.
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Current Plan
          </CardTitle>
          <CardDescription>
            You are currently on the <span className="font-semibold text-foreground">Pro</span> plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 border border-border">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-foreground">Next billing date</p>
                <p className="text-sm text-muted-foreground">August 1, 2026</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">$79.00 / month</p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleManageBilling}
            disabled={loading}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? 'Redirecting...' : (
              <>
                Manage in Stripe Portal <ExternalLink className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
