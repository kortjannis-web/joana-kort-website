import type { MetadataRoute } from 'next'
import { ANGEBOTE } from '@/lib/content/angebote'
import { ARTIKEL } from '@/lib/content/ratgeber'
import { CONTENT_UPDATED, SITE_URL } from '@/lib/site'

/** lastmod = echtes Datum der letzten inhaltlichen Änderung (Google ignoriert priority/changefreq) */
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string, lastModified = CONTENT_UPDATED) => ({ url: `${SITE_URL}${path}`, lastModified })
  return [
    u('/'),
    u('/angebote/'),
    ...ANGEBOTE.map((a) => u(a.path)),
    u('/mein-ansatz/'),
    u('/joana-kort/'),
    u('/erstgespraech/'),
    u('/stressberatung-gummersbach/'),
    u('/stressberatung-online/'),
    u('/haeufige-fragen/'),
    u('/ratgeber/'),
    ...ARTIKEL.map((a) => u(`/ratgeber/${a.slug}/`, a.updated)),
    u('/impressum/'),
    u('/datenschutz/'),
  ]
}
