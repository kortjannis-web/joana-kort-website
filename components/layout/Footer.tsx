import Link from 'next/link'
import { CalendarHeart, Mail, MapPin, MonitorSmartphone } from 'lucide-react'
import { Logo } from './Logo'
import { FooterCta } from './FooterCta'
import { InstagramIcon, LinkedInIcon } from '@/components/ui/icons'
import { ANGEBOTE } from '@/lib/content/angebote'
import { ERSTGESPRAECH, ROLE, site } from '@/lib/site'

const wissen = [
  { label: 'Stress verstehen', href: '/stress-verstehen/' },
  { label: 'Mein Ansatz', href: '/mein-ansatz/' },
  { label: 'Über mich', href: '/joana-kort/' },
  { label: 'Ratgeber', href: '/ratgeber/' },
  { label: 'Häufige Fragen', href: '/haeufige-fragen/' },
  { label: 'Stressberatung Gummersbach', href: '/stressberatung-gummersbach/' },
  { label: 'Stressberatung online', href: '/stressberatung-online/' },
]

const rechtliches = [
  { label: 'Impressum', href: '/impressum/' },
  { label: 'Datenschutz', href: '/datenschutz/' },
]

const socials = [
  { label: 'Instagram', href: site.social.instagram, Icon: InstagramIcon },
  { label: 'LinkedIn', href: site.social.linkedin, Icon: LinkedInIcon },
].filter((s) => s.href)

/**
 * Footer als dunkles Sheet (runde obere Ecken): schiebt sich beim Scrollen über das Seitenende (<main> steht, StackBack).
 * Oben der Schluss-CTA (je Seite über FooterCta), darunter Marke, Kontakt, Angebote, Wissen.
 */
export function Footer() {
  return (
    <footer className="sheet grain bg-espresso-950 pb-28 text-espresso-200 md:pb-0">
      <FooterCta />
      <div className="wrap grid gap-12 py-14 md:grid-cols-2 md:py-16 xl:grid-cols-[1.3fr_1fr_1fr_1fr] xl:gap-14 xl:py-[4.5rem]">
        <div className="max-w-sm">
          <Link href="/" aria-label="Joana Kort Stressberatung, zur Startseite" className="-ml-1 inline-block rounded-md p-1">
            <Logo tone="light" />
          </Link>
          <p className="mt-6 font-serif text-[1.125rem] italic leading-snug text-caramel-300">{site.slogan}</p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed">
            Individuelle Stressberatung und Stresscoaching in Gummersbach und online. {ROLE.short}.
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.owner} bei ${label}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-espresso-200 transition-colors hover:border-caramel-300 hover:text-caramel-300"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="t-label text-caramel-300">Kontakt</h2>
          <ul className="mt-5 text-[0.9375rem]">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-9 items-center gap-2 text-white transition-colors duration-500 hover:text-caramel-300">
                <Mail className="h-4 w-4 shrink-0 text-caramel-300" strokeWidth={1.75} aria-hidden="true" />
                {site.email}
              </a>
            </li>
            {site.phone && (
              <li>
                <a href={site.phone.href} className="inline-flex min-h-9 items-center gap-2 text-white transition-colors duration-500 hover:text-caramel-300">
                  {site.phone.display}
                </a>
              </li>
            )}
            <li>
              <Link href={ERSTGESPRAECH} className="inline-flex min-h-9 items-center gap-2 text-white transition-colors duration-500 hover:text-caramel-300">
                <CalendarHeart className="h-4 w-4 shrink-0 text-caramel-300" strokeWidth={1.75} aria-hidden="true" />
                Kostenloses Erstgespräch
              </Link>
            </li>
          </ul>
          <ul className="mt-4 space-y-2 text-[0.9375rem] leading-relaxed">
            <li className="flex gap-2">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-caramel-300" strokeWidth={1.75} aria-hidden="true" />
              <span>
                Vor Ort: {site.address.city} und Umgebung
                <br />
                <span className="text-espresso-300">etwa {site.radiusKm} km, Oberbergischer Kreis</span>
              </span>
            </li>
            <li className="flex gap-2">
              <MonitorSmartphone className="mt-1 h-4 w-4 shrink-0 text-caramel-300" strokeWidth={1.75} aria-hidden="true" />
              <span>Online: deutschlandweit per Video</span>
            </li>
          </ul>
        </div>

        <nav aria-label="Angebote">
          <h2 className="t-label text-caramel-300">Angebote</h2>
          <ul className="mt-5 space-y-1">
            {ANGEBOTE.map((a) => (
              <li key={a.path}>
                <Link href={a.path} className="inline-flex min-h-9 items-center text-[0.9375rem] hover:text-white">
                  {a.short}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/angebote/" className="inline-flex min-h-9 items-center text-[0.9375rem] hover:text-white">
                Alle Angebote im Überblick
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Wissen und Region">
          <h2 className="t-label text-caramel-300">Mehr erfahren</h2>
          <ul className="mt-5 space-y-1">
            {wissen.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-9 items-center text-[0.9375rem] hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="wrap">
        <div className="flex flex-col gap-2 border-t border-white/12 py-6 text-[0.8125rem] leading-snug text-espresso-300 xl:flex-row xl:items-start xl:justify-between xl:gap-8">
          <p className="py-2 xl:py-0">
            © {new Date().getFullYear()} {site.name} · Keine Psychotherapie und keine Heilbehandlung
          </p>
          <ul className="flex flex-wrap gap-x-5 xl:justify-end xl:gap-y-2">
            {rechtliches.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-9 items-center hover:text-white xl:min-h-0">
                  {l.label}
                </Link>
              </li>
            ))}
            {site.google.reviewUrl && (
              <li>
                <a href={site.google.reviewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center hover:text-white xl:min-h-0">
                  Bewertung bei Google abgeben
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  )
}
