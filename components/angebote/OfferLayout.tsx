import type { ReactNode } from 'react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { CheckList } from '@/components/lists/CheckList'
import { NumberedSteps } from '@/components/lists/NumberedSteps'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { WartelisteForm } from '@/components/forms/WartelisteForm'
import { MoreOffers } from './MoreOffers'
import { angebot, type AngebotKey } from '@/lib/content/angebote'
import { faqSchema, serviceSchema } from '@/lib/schema'
import type { Faq } from '@/lib/types'
import { ERSTGESPRAECH } from '@/lib/site'

/**
 * Gemeinsamer Aufbau der weiteren Angebotsseiten (Zu zweit, Webinar, Online-Kurs, Unternehmen), damit alle gleich klar sind:
 * Hero → Worum es geht + Eckdaten → Themen → Ablauf → Anfrage (Erstgespräch oder Warteliste) → FAQ → weitere Angebote.
 */
export function OfferLayout({
  current,
  hero,
  intro,
  facts,
  themesTitle,
  themes,
  stepsTitle,
  steps,
  cta,
  faqs,
  extra,
}: {
  current: AngebotKey
  hero: { eyebrow: string; title: ReactNode; intro: string; tone?: 'espresso' | 'mocha'; aside?: ReactNode }
  intro: { title: string; text: string[] }
  facts: [string, string][]
  themesTitle: string
  themes: string[]
  stepsTitle: string
  steps: { title: string; text: string }[]
  cta: { type: 'erstgespraech'; title: string; text: string; href?: string; label?: string } | { type: 'warteliste'; angebot: 'webinar' | 'kurs' | 'gruppe'; title: string; text: string; label: string }
  faqs: Faq[]
  extra?: ReactNode
}) {
  const a = angebot(current)
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
            <ButtonLink href={cta.type === 'warteliste' ? '#anfrage' : (cta.href ?? ERSTGESPRAECH)} variant="primary" size="lg" className="w-full sm:w-auto">
              {cta.type === 'warteliste' ? 'Auf die Warteliste' : (cta.label ?? 'Kostenloses Erstgespräch')}
            </ButtonLink>
            <ButtonLink href="/stresscoaching/" variant="outline-light" size="lg" className="w-full sm:w-auto">
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
              <div className="t-lead mt-5 space-y-4 text-ink/85">
                {intro.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="xl:col-span-5">
              <dl className="floaty rounded-xl border border-line bg-white px-6 py-2 md:px-8">
                {facts.map(([k, v]) => (
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
            <Reveal className="xl:col-span-6">
              <h2 id="anfrage-title" className="t-h2 text-white">
                {cta.title}
              </h2>
              <p className="t-lead mt-5 text-espresso-100/90">{cta.text}</p>
              {cta.type === 'warteliste' && (
                <p className="mt-5 text-[0.9375rem] text-espresso-200">
                  Lieber gleich persönlich?{' '}
                  <Link href="/stresscoaching/" className="font-semibold text-white underline decoration-terra-300/60 underline-offset-4 hover:text-terra-200">
                    Zur persönlichen Begleitung
                  </Link>
                </p>
              )}
            </Reveal>
            <Reveal delay={0.1} className="xl:col-span-6">
              {cta.type === 'warteliste' ? (
                <WartelisteForm angebot={cta.angebot} label={cta.label} className="text-ink" />
              ) : (
                <div className="flex flex-col gap-4 xl:items-end">
                  <ButtonLink href={cta.href ?? ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
                    {cta.label ?? 'Kostenloses Erstgespräch'}
                  </ButtonLink>
                  <p className="text-[0.9375rem] text-espresso-200">15 Minuten · kostenlos · unverbindlich</p>
                </div>
              )}
            </Reveal>
          </div>
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
