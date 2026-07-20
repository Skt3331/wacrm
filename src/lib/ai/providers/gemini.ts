import { GoogleGenerativeAI } from '@google/generative-ai'
import { AiError, type ProviderResult } from '../types'
import { MAX_OUTPUT_TOKENS } from '../defaults'
import {
  normalizeUsage,
  toNetworkError,
  type ProviderArgs,
} from './shared'

/**
 * Call Gemini Chat API with the caller's own key.
 */
export async function generateGemini(args: ProviderArgs): Promise<ProviderResult> {
  const { apiKey, model, systemPrompt, messages } = args

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const genModel = genAI.getGenerativeModel({
      model,
      systemInstruction: systemPrompt,
    })

    // Gemini requires 'user' or 'model' roles.
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))
    
    const lastMessage = messages[messages.length - 1]

    const chat = genModel.startChat({
      history,
      generationConfig: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
      },
    })

    const result = await chat.sendMessage(lastMessage.content)
    const response = result.response
    const text = response.text()
    
    if (!text || !text.trim()) {
      throw new AiError('Gemini returned an empty response.', { code: 'empty_response' })
    }

    const usage = normalizeUsage({
      prompt: response.usageMetadata?.promptTokenCount,
      completion: response.usageMetadata?.candidatesTokenCount,
      total: response.usageMetadata?.totalTokenCount,
    })

    return { text, usage }
  } catch (err) {
    if (err instanceof AiError) throw err
    
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('API key not valid')) {
      throw new AiError('Gemini rejected the API key.', { code: 'invalid_key', status: 401 })
    }
    
    throw toNetworkError(err)
  }
}
