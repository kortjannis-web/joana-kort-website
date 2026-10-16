import type { ReactNode } from 'react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { CtaRow } from '@/components/ui/CtaRow'
import { More } from '@/components/ui/More'
import { CheckList } from '@/components/lists/CheckList'
import { NumberedSteps } from '@/components/lists/NumberedSteps'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { WartelisteForm } from '@/components/forms/WartelisteForm'
import { MoreOffers } from './MoreOffers'
import { angebot, type AngebotKey, type InteresseKey } from '@/lib/content/angebote'
import { faqSchema, serviceSchema } from '@/lib/schema'
import type { Faq } from '@/lib/types'
import { CTA_LABEL } from '@/lib/site'

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
        <section aria-labelledby="worum" className="pb-16 pt-8 md:pb-24 md:pt-12">
          <div className="wrap grid gap-10 xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-7">
              <h2 id="worum" className="t-h2 text-espresso-900">
                {intro.title}
              </h2>
              <p className="t-lead mt-5 text-ink/85">{lead}</p>
              {rest.length > 0 && (
                <More label={`Mehr zu: ${intro.title}`} className="mt-4" bodyClassName="space-y-4 pt-3 text-[1.0625rem] leading-relaxed text-ink/80">
                  {rest.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </More>
              )}
            </Reveal>
            <Reveal delay={0.1} className="xl:col-span-5">
              <dl className="floaty rounded-xl border border-line bg-white px-6 py-2 md:px-8">
                {facts.slice(0, 3).map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-0.5 border-b border-line py-4 last:border-0 sm:flex-row sm:justify-between sm:gap-6">
                    <dt className="t-label text-[0.75rem] text-caramel-700">{k}</dt>
                    <dd className="font-semibold text-espresso-900 sm:text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="themen" className="bg-greige py-16 md:py-24">
          <div className="wrap grid gap-8 xl:grid-cols-12 xl:gap-16">
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

        <section aria-labelledby="ablauf" className="py-16 md:py-24">
          <div className="wrap">
            <Reveal>
              <h2 id="ablauf" className="t-h2 max-w-[22ch] text-espresso-900">
                {stepsTitle}
              </h2>
            </Reveal>
            <NumberedSteps items={steps} variant="cards" className="mt-8" />
          </div>
        </section>

        {extra}

        <section id="anfrage" aria-labelledby="anfrage-title" className="grain scroll-mt-24 overflow-hidden bg-espresso-800 py-16 text-white md:py-24">
          <div className="wrap grid items-center gap-10 xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-7">
              <h2 id="anfrage-title" className="t-h2 text-white">
                {cta.title}
              </h2>
              <p className="t-lead mt-5 text-espresso-100/90">{cta.text}</p>
            </Reveal>
            <Reveal delay={0.1} className="xl:col-span-5">
              <CtaRow href={href} tone="dark" className="xl:justify-end" />
            </Reveal>
          </div>
          {warteliste && (
            <div className="wrap mt-10 md:mt-14">
              <div className="rounded-xl border border-white/12 bg-white/[0.04] p-5 md:p-7">
                <More label={warteliste.title} showLabel tone="dark" bodyClassName="grid gap-6 pt-5 xl:grid-cols-12 xl:gap-12">
                  <p className="leading-relaxed text-espresso-100/85 xl:col-span-5">{warteliste.text}</p>
                  <WartelisteForm angebot={warteliste.angebot} label={warteliste.label} className="text-ink xl:col-span-7" />
                </More>
              </div>
            </div>
          )}
        </section>

        <section aria-labelledby="fragen" className="py-16 md:py-24">
          <div className="wrap grid gap-8 xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-4">
              <h2 id="fragen" className="t-h2 text-espresso-900">
                Häufige Fragen
              </h2>
              <Link href="/haeufige-fragen/" className="link mt-5 inline-block font-semibold">
                Alle Fragen und Antworten
              </Link>
            </Reveal>
            <div className="xl:col-span-8">
              <FaqAccordion faqs={faqs} openFirst />
            </div>
          </div>
        </section>

        <MoreOffers current={current} />
      </Sheet>
    </>
  )
}
