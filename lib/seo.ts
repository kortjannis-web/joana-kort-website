import type { Metadata } from 'next'
import { INDEXABLE, site } from './site'
import { OG_IMAGE } from './images'

export const OG_DEFAULT = OG_IMAGE

/**
 * Metadaten pro Seite. Titel sind vollständig (absolute), Canonical immer selbstreferenzierend
 * mit Schrägstrich am Ende. Vorschau-Deploys (INDEXABLE=false) werden komplett auf noindex gesetzt.
 */
export function pageMeta({
  title,
  description,
  path,
  noindex = false,
  image,
  type = 'website',
}: {
  title: string
  description: string
  path: string
  noindex?: boolean
  image?: { url: string; width: number; height: number; alt: string }
  type?: 'website' | 'article'
}): Metadata {
  const index = INDEXABLE && !noindex
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: 'de_DE',
      siteName: site.name,
      title,
      description,
      url: path,
      images: [image ?? OG_DEFAULT],
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: index ? { index: true, follow: true } : { index: false, follow: !noindex && INDEXABLE },
  }
}
