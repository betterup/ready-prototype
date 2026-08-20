import { scriptedReply } from './engine'
import type { Message } from './types'

/**
 * Where replies come from.
 *
 * Default: the scripted engine, in-browser. No key, no network, nothing the
 * member types leaves the page — which is what makes the prototype safe to
 * hand round inside BetterUp.
 *
 * Upgrade path: set VITE_COACH_PROXY_URL to a server-side endpoint that holds
 * the Anthropic key and forwards to the API. Never put the key in this app —
 * Vite inlines every VITE_* value into the client bundle, so a key here is
 * readable by anyone who opens the prototype.
 *
 * Endpoint contract:
 *   POST { messages: [{ role: 'user' | 'assistant', content: string }] }
 *   200  { reply: string }
 */
const PROXY_URL = import.meta.env.VITE_COACH_PROXY_URL as string | undefined

export const replySource = PROXY_URL ? 'proxy' : 'scripted'

export async function getReply(history: Message[], userText: string): Promise<string> {
  if (!PROXY_URL) return scriptedReply(history, userText)

  try {
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        messages: [
          ...history.map((m) => ({
            role: m.role === 'coach' ? 'assistant' : 'user',
            content: m.text,
          })),
          { role: 'user', content: userText },
        ],
      }),
    })
    if (!res.ok) throw new Error(`proxy responded ${res.status}`)
    const data = (await res.json()) as { reply?: string }
    if (!data.reply) throw new Error('proxy returned no reply')
    return data.reply
  } catch (err) {
    // Never leave the member staring at a dead input; fall back to scripted.
    console.warn('[coach] proxy failed, falling back to scripted engine:', err)
    return scriptedReply(history, userText)
  }
}
