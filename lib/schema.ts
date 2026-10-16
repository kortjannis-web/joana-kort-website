import { OBERBERG_WIKI, ORTE, ROLE, SITE_URL, site } from './site'
import { ANGEBOTE } from './content/angebote'
import type { Artikel, Faq } from './types'
import { plain } from '@/components/ui/Rich'

/**
 * Strukturierte Daten. Grundsatz: nur, was sichtbar auf der Seite steht.
 * Keine eigenen Bewertungssterne (aggregateRating) für das eigene Unternehmen (Google-Richtlinie).
 * Typ ProfessionalService (lokaler Dienstleister) + Person + WebSite global, je Seite Service/FAQPage/Breadcrumb/BlogPosting.
 */

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const PERSON_ID = `${SITE_URL}/joana-kort/#person`

const url = (path: string) => `${SITE_URL}${path}`

const sameAs = [site.social.instagram, site.social.linkedin, site.google.profileUrl].filter(Boolean)

const areaServed = [
  ...ORTE.map((o) => ({ '@type': 'City', name: o.name, sameAs: o.wiki })),
  { '@type': 'AdministrativeArea', name: 'Oberbergischer Kreis', sameAs: OBERBERG_WIKI },
  { '@type': 'Country', name: 'Deutschland' },
]

const KNOWS_ABOUT = [
  'Stress',
  'Stressbewältigung',
  'Stressmanagement',
  'Stressprävention',
  'Gesundheitspsychologie',
  'Zeitmanagement',
  'Selbstorganisation im Alltag',
]

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: url('/'),
        name: site.name,
        alternateName: ['Joana Kort', 'Stressberatung Kort', 'Joana Kort Stresscoaching'],
        inLanguage: 'de-DE',
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'ProfessionalService',
        '@id': ORG_ID,
        name: site.name,
        url: url('/'),
        slogan: site.slogan,
        logo: { '@type': 'ImageObject', url: url('/icon.png'), width: 512, height: 512 },
        image: url('/og/og-joana-kort-stressberatung.jpg'),
        description:
          'Individuelle Stressberatung und Stresscoaching in Gummersbach und online: persönliche Begleitung über drei oder sechs Monate, um Stress zu verstehen, zu bewältigen und den Alltag langfristig zu entlasten. Dazu Online-Webinare, Schulungen für Unternehmen und Angebote zu zweit.',
        email: site.email,
        ...(site.phone ? { telephone: site.phone.href.replace('tel:', '') } : {}),
        address: {
          '@type': 'PostalAddress',
          ...(site.address.street ? { streetAddress: site.address.street } : {}),
          postalCode: site.address.zip,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
        areaServed,
        priceRange: 'Kostenloses Erstgespräch, Preise auf Anfrage',
        founder: { '@id': PERSON_ID },
        employee: { '@id': PERSON_ID },
        knowsAbout: KNOWS_ABOUT,
        availableLanguage: 'de',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Angebote',
          itemListElement: ANGEBOTE.map((a) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: a.title, url: url(a.path), provider: { '@id': ORG_ID } },
          })),
        },
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: site.owner,
        jobTitle: ROLE.jobTitle,
        description: ROLE.background,
        url: url('/joana-kort/'),
        worksFor: { '@id': ORG_ID },
        knowsAbout: KNOWS_ABOUT,
        knowsLanguage: 'de',
        ...(sameAs.length ? { sameAs: [site.social.instagram, site.social.linkedin].filter(Boolean) } : {}),
      },
    ],
  }
}

export function serviceSchema({ name, description, path, online = true }: { name: string; description: string; path: string; online?: boolean }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: url(path),
    serviceType: name,
    provider: { '@id': ORG_ID },
    areaServed,
    ...(online ? { availableChannel: [{ '@type': 'ServiceChannel', name: 'Online per Video' }, { '@type': 'ServiceChannel', name: 'Vor Ort im Raum Gummersbach' }] } : {}),
    offers: { '@type': 'Offer', description: 'Kostenloses Erstgespräch (15 Minuten), Preis auf Anfrage', url: url('/erstgespraech/') },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Startseite', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: url(it.path),
    })),
  }
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
    })),
  }
}

export function articleSchema(a: Artikel) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.metaDescription,
    datePublished: a.published,
    dateModified: a.updated,
    inLanguage: 'de-DE',
    mainEntityOfPage: url(`/ratgeber/${a.slug}/`),
    url: url(`/ratgeber/${a.slug}/`),
    image: url('/og/og-joana-kort-stressberatung.jpg'),
    author: { '@type': 'Person', '@id': PERSON_ID, name: site.owner, url: url('/joana-kort/') },
    publisher: { '@id': ORG_ID },
    about: { '@type': 'Thing', name: 'Stress' },
  }
}
