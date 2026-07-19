-- Drop the existing constraint for provider validation
ALTER TABLE public.ai_configs
  DROP CONSTRAINT IF EXISTS ai_configs_provider_check;

-- Add the new constraint allowing gemini
ALTER TABLE public.ai_configs
  ADD CONSTRAINT ai_configs_provider_check CHECK (provider IN ('openai', 'anthropic', 'gemini'));
