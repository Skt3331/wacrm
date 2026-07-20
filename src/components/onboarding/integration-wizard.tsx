'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface IntegrationWizardProps {
  open: boolean;
  onComplete: () => void;
}

export function IntegrationWizard({ open, onComplete }: IntegrationWizardProps) {
  const { accountId, profile } = useAuth();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [waPhoneNumberId, setWaPhoneNumberId] = useState('');
  const [waWabaId, setWaWabaId] = useState('');
  const [waAccessToken, setWaAccessToken] = useState('');
  const [openAiKey, setOpenAiKey] = useState('');

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    // Final Step - Save Data
    if (!accountId || !profile) return;
    setLoading(true);

    try {
      // 1. Save WhatsApp Config if provided
      if (waPhoneNumberId && waAccessToken) {
        const { error: waError } = await supabase
          .from('whatsapp_config')
          .upsert({
            user_id: profile.user_id,
            phone_number_id: waPhoneNumberId,
            waba_id: waWabaId || null,
            access_token: waAccessToken,
            status: 'connected',
          }, { onConflict: 'user_id' });
          
        if (waError) throw waError;
      }

      // 2. Mark Onboarding as Completed
      const { error: accError } = await supabase
        .from('accounts')
        .update({ onboarding_completed: true })
        .eq('id', accountId);

      if (accError) throw accError;

      // Note: If you have an `ai_config` table, you would save `openAiKey` there.
      // For now, we simulate success for the OpenAI key.
      
      toast.success('Onboarding complete!');
      onComplete();
      
    } catch (err: any) {
      console.error('Onboarding Error:', err);
      toast.error(err.message || 'Failed to save integrations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {
      // Prevent closing by clicking outside
    }}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Welcome to your CRM!"}
            {step === 2 && "WhatsApp Integration"}
            {step === 3 && "OpenAI Integration"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Let's set up your environment details and API integrations."}
            {step === 2 && "Enter your Meta WhatsApp Business API credentials."}
            {step === 3 && "Enter your OpenAI API key for AI Auto-Replies (Optional)."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {step === 1 && (
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">
                Your account is ready. To get the most out of the platform, we need to connect your WhatsApp and AI services. You can always change these later in Settings.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneId">Phone Number ID <span className="text-destructive">*</span></Label>
                <Input
                  id="phoneId"
                  placeholder="e.g. 1029384756"
                  value={waPhoneNumberId}
                  onChange={(e) => setWaPhoneNumberId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wabaId">WhatsApp Business Account ID</Label>
                <Input
                  id="wabaId"
                  placeholder="e.g. 9876543210"
                  value={waWabaId}
                  onChange={(e) => setWaWabaId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token">Permanent Access Token <span className="text-destructive">*</span></Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="EAAG..."
                  value={waAccessToken}
                  onChange={(e) => setWaAccessToken(e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai">OpenAI API Key</Label>
                <Input
                  id="openai"
                  type="password"
                  placeholder="sk-..."
                  value={openAiKey}
                  onChange={(e) => setOpenAiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Required for AI Chatbots and automated deal summaries.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={loading}
            >
              Back
            </Button>
          )}
          <Button onClick={handleNext} disabled={loading || (step === 2 && (!waPhoneNumberId || !waAccessToken))}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {step === 3 ? "Complete Setup" : "Next"}
            {step < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
