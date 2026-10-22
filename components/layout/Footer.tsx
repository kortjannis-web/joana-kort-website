import Link from 'next/link'
import { CalendarHeart, Mail, MapPin, MonitorSmartphone, Phone } from 'lucide-react'
import { Logo } from './Logo'
import { FooterCta } from './FooterCta'
import { InstagramIcon, LinkedInIcon } from '@/components/ui/icons'
import { ANGEBOTE } from '@/lib/content/angebote'
import { ERSTGESPRAECH, ROLE, site } from '@/lib/site'

const wissen = [
  { label: 'Mein Ansatz', href: '/mein-ansatz/' },
  { label: 'Methoden und Werkzeuge', href: '/methoden/' },
  { label: 'Ablauf', href: '/ablauf/' },
  { label: 'Stress verstehen', href: '/stress-verstehen/' },
  { label: 'Über mich', href: '/joana-kort/' },
  { label: 'Qualifikationen und Referenzen', href: '/qualifikationen-und-referenzen/' },
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
 * Footer als dunkle Fläche mit weichem Schatten nach oben (keine Überlappung mehr).
 * Oben der Schluss-CTA (je Seite über FooterCta), darunter Marke, Kontakt, Angebote, Wissen.
 */
export function Footer() {
  return (
    <footer className="sheet grain bg-espresso-950 pb-20 text-espresso-200 md:pb-0">
      <FooterCta />
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-[clamp(1.75rem,4svh,3rem)] py-[var(--sec-y)] md:gap-x-12 xl:grid-cols-[1.3fr_1fr_1fr_1fr] xl:gap-x-14">
        <div className="col-span-2 max-w-sm md:col-span-1">
          <Link href="/" aria-label="Joana Kort Stressberatung, zur Startseite" className="-ml-1 inline-block rounded-md p-1">
            <Logo tone="light" />
          </Link>
          <p className="mt-[clamp(0.75rem,2.5svh,1.5rem)] font-serif text-[1.0625rem] italic leading-snug text-caramel-300 md:text-[1.125rem]">{site.slogan}</p>
          <p className="mt-3 text-[0.875rem] leading-relaxed md:mt-4 md:text-[0.9375rem]">
            Individuelle Stressberatung und Stresscoaching in Gummersbach und online. {ROLE.short}.
          </p>
          {socials.length > 0 && (
            <ul className="mt-[clamp(0.75rem,2.5svh,1.5rem)] flex gap-2">
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

        {/* Handy: Telefon, E-Mail und Erstgespräch stehen direkt darüber im Schluss-CTA */}
        <div className="max-md:hidden">
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
                <a href={site.phone.href} className="inline-flex min-h-9 items-center gap-2 whitespace-nowrap text-white transition-colors duration-500 hover:text-caramel-300">
                  <Phone className="h-4 w-4 shrink-0 text-caramel-300" strokeWidth={1.75} aria-hidden="true" />
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
          <ul className="mt-3 md:mt-5 md:space-y-1">
            {ANGEBOTE.map((a) => (
              <li key={a.path}>
                <Link href={a.path} className="inline-flex min-h-9 items-center text-[0.875rem] leading-snug hover:text-white md:text-[0.9375rem]">
                  {a.short}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/angebote/" className="inline-flex min-h-9 items-center text-[0.875rem] leading-snug hover:text-white md:text-[0.9375rem]">
                Alle Angebote im Überblick
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Wissen und Region">
          <h2 className="t-label text-caramel-300">Mehr erfahren</h2>
          <ul className="mt-3 md:mt-5 md:space-y-1">
            {wissen.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-9 items-center text-[0.875rem] leading-snug hover:text-white md:text-[0.9375rem]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="wrap">
        <div className="flex flex-col gap-1 border-t border-white/12 py-4 text-[0.8125rem] md:py-6 leading-snug text-espresso-300 xl:flex-row xl:items-start xl:justify-between xl:gap-8">
          <p className="py-1 xl:py-0">
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
