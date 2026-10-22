import type { ReactNode } from 'react'
import Link from 'next/link'
import { ListChecks } from 'lucide-react'
import type { HeroLineVariant } from '@/components/ui/HeroLine'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { CtaRow } from '@/components/ui/CtaRow'
import { More } from '@/components/ui/More'
import { OpenBlock, OpenItem } from '@/components/ui/OpenBlock'
import { CheckList } from '@/components/lists/CheckList'
import { NumberedSteps } from '@/components/lists/NumberedSteps'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { WartelisteForm } from '@/components/forms/WartelisteForm'
import { MoreOffers } from './MoreOffers'
import { angebot, type AngebotKey, type InteresseKey } from '@/lib/content/angebote'
import { faqSchema, serviceSchema } from '@/lib/schema'
import type { Faq } from '@/lib/types'
import { CTA_LABEL } from '@/lib/site'
import { ScrollLine } from '@/components/ui/ScrollLine'

/** Linien-Motiv im Hero je Angebotsseite (Abwechslung) */
const OFFER_LINES: Record<string, HeroLineVariant> = {
  '/zu-zweit-und-in-der-gruppe/': 'infinity',
  '/webinar/': 'arcs',
  '/online-kurs/': 'spiral',
  '/stressmanagement-unternehmen/': 'ribbon',
}

/**
 * Gemeinsamer Aufbau der weiteren Angebotsseiten (Zu zweit, Webinar, Online-Kurs, Unternehmen), damit alle gleich klar sind:
 * Hero → Worum es geht (Kurztext, Rest hinter dem Pfeil) + drei Eckdaten → Themen → Ablauf in drei Schritten → Erstgespräch
 * (alle CTAs führen zum kostenlosen Erstgespräch mit Fragebogen, Interesse vorausgewählt; Warteliste nur als Zusatz hinter dem Pfeil)
 * → FAQ → weitere Angebote.
 */
export function OfferLayout({
  current,
  interesse,
  hero,
  intro,
  facts,
  themesTitle,
  themes,
  stepsTitle,
  steps,
  cta,
  warteliste,
  faqs,
  extra,
}: {
  current: AngebotKey
  /** Vorauswahl im Fragebogen */
  interesse: InteresseKey
  hero: { eyebrow: string; title: ReactNode; intro: string; tone?: 'light' | 'greige'; aside?: ReactNode }
  intro: { title: string; text: string[] }
  /** Drei Eckdaten */
  facts: [string, string][]
  themesTitle: string
  themes: string[]
  stepsTitle: string
  steps: { title: string; text: string }[]
  cta: { title: string; text: string }
  warteliste?: { angebot: 'webinar' | 'kurs' | 'gruppe'; label: string; title: string; text: string }
  faqs: Faq[]
  extra?: ReactNode
}) {
  const a = angebot(current)
  const href = `/erstgespraech/?interesse=${interesse}#anfrage`
  const [lead, ...rest] = intro.text
  return (
    <>
      <JsonLd data={[serviceSchema({ name: a.title, description: a.text, path: a.path }), faqSchema(faqs)]} />
      <PageHero
        line={OFFER_LINES[a.path] ?? 'loop'}
        tone={hero.tone}
        eyebrow={hero.eyebrow}
        title={hero.title}
        intro={<p>{hero.intro}</p>}
        aside={hero.aside}
        actions={
          <>
            <ButtonLink href={href} variant="primary" size="lg" className="w-full sm:w-auto">
              {CTA_LABEL}
            </ButtonLink>
            <ButtonLink href="/stresscoaching/" variant="outline" size="lg" className="w-full sm:w-auto">
              Persönliche Begleitung
            </ButtonLink>
          </>
        }
      />

      <Sheet crumbs={[{ name: 'Angebote', path: '/angebote/' }, { name: a.short, path: a.path }]}>
        <section aria-labelledby="worum" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
          <div className="wrap grid gap-[var(--sec-gap)] xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-7">
              <h2 id="worum" className="t-h2 text-espresso-900">
                {intro.title}
              </h2>
              <p className="t-lead mt-[clamp(0.75rem,2svh,1.25rem)] text-ink/85">{lead}</p>
              {rest.length > 0 && (
                <More label={`Mehr zu: ${intro.title}`} className="mt-4" bodyClassName="space-y-4 pt-3 text-[1.0625rem] leading-relaxed text-ink/80">
                  {rest.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </More>
              )}
            </Reveal>
            <Reveal delay={0.1} className="xl:col-span-5">
              <OpenBlock
                icon={<ListChecks strokeWidth={1.75} aria-hidden="true" />}
                kicker="Auf einen Blick"
                title={
                  <>
                    Das Wichtigste <em>in Kürze</em>
                  </>
                }
              >
                <dl className="grid gap-1.5">
                  {facts.slice(0, 3).map(([k, v]) => (
                    <OpenItem key={k} className="flex flex-col gap-0.5 py-[clamp(0.5rem,1.4svh,0.875rem)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <dt className="t-label text-[0.6875rem] text-caramel-700">{k}</dt>
                      <dd className="font-semibold text-espresso-900 sm:text-right">{v}</dd>
                    </OpenItem>
                  ))}
                </dl>
              </OpenBlock>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="themen" className="bg-greige sec">
          <div className="wrap grid gap-[var(--sec-gap)] xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-4">
              <h2 id="themen" className="t-h2 text-espresso-900">
                {themesTitle}
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="xl:col-span-8">
              <CheckList items={themes} className="grid gap-x-8 gap-y-3 space-y-0 sm:grid-cols-2" />
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="ablauf" className="sec relative isolate">
          <ScrollLine variant="e" />
          <div className="wrap">
            <Reveal>
              <h2 id="ablauf" className="t-h2 max-w-[22ch] text-espresso-900">
                {stepsTitle}
              </h2>
            </Reveal>
            <NumberedSteps items={steps} variant="cards" className="mt-[var(--sec-gap)]" />
          </div>
        </section>

        {extra}

        <section id="anfrage" aria-labelledby="anfrage-title" className="grain sec scroll-mt-24 overflow-hidden bg-espresso-800 text-white">
          <div className="wrap grid items-center gap-[var(--sec-gap)] xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-7">
              <h2 id="anfrage-title" className="t-h2 text-white">
                {cta.title}
              </h2>
              <p className="t-lead mt-[clamp(0.75rem,2svh,1.25rem)] text-espresso-100/90">{cta.text}</p>
            </Reveal>
            <Reveal delay={0.1} className="xl:col-span-5">
              <CtaRow href={href} tone="dark" className="xl:justify-end" />
            </Reveal>
          </div>
          {warteliste && (
            <div className="wrap mt-[var(--sec-gap)]">
              {/* Offen: kein Kasten, nur die aufklappbare Zeile, darin die Warteliste als offener Block */}
              <div className="border-t border-white/12 pt-5">
                <More label={warteliste.title} showLabel tone="dark" bodyClassName="grid gap-6 pt-5 xl:grid-cols-12 xl:gap-12">
                  <p className="leading-relaxed text-espresso-100/85 xl:col-span-5">{warteliste.text}</p>
                  <WartelisteForm angebot={warteliste.angebot} label={warteliste.label} tone="dark" className="xl:col-span-7" />
                </More>
              </div>
            </div>
          )}
        </section>

        <section aria-labelledby="fragen" className="sec relative isolate">
          <ScrollLine variant="f" />
          <div className="wrap grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
            <Reveal className="lg:col-span-5 xl:col-span-4">
              <h2 id="fragen" className="t-h2 text-espresso-900">
                Häufige Fragen
              </h2>
              <Link href="/haeufige-fragen/" className="link mt-[clamp(0.5rem,2svh,1.25rem)] inline-block font-semibold">
                Alle Fragen und Antworten
              </Link>
            </Reveal>
            <div className="lg:col-span-7 xl:col-span-8">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        </section>

        <MoreOffers current={current} />
      </Sheet>
    </>
  )
}
