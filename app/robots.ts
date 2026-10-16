import type { MetadataRoute } from 'next'
import { INDEXABLE, SITE_URL } from '@/lib/site'

/**
 * Live-Domain: alles erlaubt, auch KI-Suchcrawler (ChatGPT-Suche, Perplexity, Claude, Google AI).
 * Vorschau-Deploy (NEXT_PUBLIC_INDEXABLE nicht "true"): komplett gesperrt.
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) return { rules: [{ userAgent: '*', disallow: '/' }] }
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      {
        userAgent: ['OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'PerplexityBot', 'Claude-SearchBot', 'ClaudeBot', 'Google-Extended', 'Bingbot'],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
