'use client'

import { usePathname } from 'next/navigation'
import { ArrowRight, Check, Mail, Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { LogoDraw } from '@/components/ui/LogoDraw'
import { ERSTGESPRAECH, site } from '@/lib/site'

type Cta = { title: string; em: string; text: string; label: string; href: string }

const DEFAULT: Cta = {
  title: 'Ihr erster Schritt dauert',
  em: '15 Minuten.',
  text: 'Im kostenlosen Erstgespräch lernen wir uns kennen und klären, welches Angebot zu Ihnen passt. Sie müssen nichts vorbereiten und gehen keine Verpflichtung ein.',
  label: 'Kostenloses Erstgespräch',
  href: ERSTGESPRAECH,
}

/** Abweichender Schluss-CTA je Seite; null = kein CTA (Rechtstexte, Erstgespräch-Seite selbst) */
const BY_PATH: Record<string, Cta | null> = {
  '/joana-kort/': { ...DEFAULT, title: 'Lernen wir uns', em: 'kennen.' },
  '/stressmanagement-unternehmen/': {
    title: 'Stress im Team',
    em: 'gemeinsam angehen.',
    text: 'Erzählen Sie mir kurz von Ihrem Team und Ihrem Anliegen. Im kostenlosen Vorgespräch stimmen wir Inhalte, Umfang und Format ab.',
    label: 'Schulung anfragen',
    href: '/erstgespraech/?interesse=unternehmen#anfrage',
  },
  '/erstgespraech/': null,
  '/impressum/': null,
  '/datenschutz/': null,
}

const FAKTEN = [`${site.erstgespraechMin} Minuten`, 'Kostenlos und unverbindlich', 'Am Telefon oder per Video']

/** Schluss-CTA oben im Footer (Teil des dunklen Footer-Sheets): die "Jetzt buchen"-Seite jeder Unterseite */
export function FooterCta() {
  const pathname = usePathname()
  const cta = pathname in BY_PATH ? BY_PATH[pathname] : DEFAULT
  if (!cta) return null
  return (
    <section aria-labelledby="footer-cta-title" className="wrap">
      <div className="grid gap-[var(--sec-gap)] border-b border-white/12 py-[var(--sec-y)] xl:grid-cols-12 xl:items-center xl:gap-10">
        <div className="xl:col-span-8">
          <LogoDraw className="mb-[clamp(0.75rem,3svh,1.75rem)] h-[clamp(2rem,5svh,3rem)] text-caramel-300" />
          <h2 id="footer-cta-title" className="t-h1 max-w-[16ch] text-white">
            {cta.title} <em className="italic text-caramel-300">{cta.em}</em>
          </h2>
          <p className="t-lead mt-[clamp(0.75rem,2svh,1.25rem)] max-w-[40rem] text-espresso-200 max-md:text-[0.9375rem] max-md:leading-relaxed">{cta.text}</p>
          <ul className="mt-[clamp(0.75rem,2.5svh,1.5rem)] flex flex-wrap gap-2">
            {FAKTEN.map((f) => (
              <li key={f} className="inline-flex h-8 items-center gap-2 rounded-full border border-white/14 bg-white/[0.05] px-3 text-[0.8125rem] text-espresso-100 md:h-9 md:px-3.5 md:text-[0.875rem]">
                <Check className="h-3.5 w-3.5 text-caramel-300" strokeWidth={2.5} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start gap-[clamp(0.5rem,2svh,1.25rem)] xl:col-span-4 xl:justify-self-end">
          <ButtonLink href={cta.href} variant="primary" size="lg" className="group w-full sm:w-auto">
            {cta.label}
            <ArrowRight className="h-[1.125rem] w-[1.125rem] transition-transform duration-500 ease-[var(--ease-lift)] group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
          </ButtonLink>
          {site.phone && (
            <a href={site.phone.href} className="glow-hover group inline-flex items-center gap-3 text-[0.9375rem] text-espresso-200">
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-caramel-300 transition-[border-color,background-color] duration-500 group-hover:border-caramel-300/60 group-hover:bg-white/[0.1]">
                <span className="glow-icon">
                  <Phone className="h-[1.125rem] w-[1.125rem] transition-transform duration-500 group-hover:-rotate-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
              </span>
              <span>
                Lieber anrufen?{' '}
                <span className="whitespace-nowrap font-semibold text-white underline decoration-caramel-300/60 underline-offset-4 transition-colors duration-500 group-hover:text-caramel-300">
                  {site.phone.display}
                </span>
              </span>
            </a>
          )}
          <a href={`mailto:${site.email}`} className="glow-hover group inline-flex items-center gap-3 text-[0.9375rem] text-espresso-200">
            <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-caramel-300 transition-[border-color,background-color] duration-500 group-hover:border-caramel-300/60 group-hover:bg-white/[0.1]">
              <span className="glow-icon">
                <Mail className="h-[1.125rem] w-[1.125rem] transition-transform duration-500 group-hover:-rotate-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
            </span>
            <span>
              Lieber schreiben?{' '}
              <span className="whitespace-nowrap font-semibold text-white underline decoration-caramel-300/60 underline-offset-4 transition-colors duration-500 group-hover:text-caramel-300">
                {site.email}
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
