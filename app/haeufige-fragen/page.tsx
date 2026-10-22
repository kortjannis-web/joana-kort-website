import Link from 'next/link'
import { CalendarCheck, Mail } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink, buttonClass } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { FAQS, FAQ_GRUPPEN } from '@/lib/content/faqs'
import { faqSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { cn } from '@/lib/utils'
import { CONTENT_UPDATED, ERSTGESPRAECH, site } from '@/lib/site'

const PATH = '/haeufige-fragen/'

export const metadata = pageMeta({
  title: 'Häufige Fragen zu Stressberatung & Stresscoaching | Joana Kort',
  description:
    'Antworten zu Stressberatung und Stresscoaching: Ablauf, Dauer, Kosten, Krankenkasse, Unterschied zur Therapie, online oder vor Ort in Gummersbach.',
  path: PATH,
})

export default function FaqPage() {
  const updated = new Date(CONTENT_UPDATED).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <PageHero
        line="arcs"
        tone="greige"
        eyebrow="Häufige Fragen"
        title={
          <>
            Häufige Fragen zu <em>Stressberatung</em> und Stresscoaching
          </>
        }
        intro={<p>Kurz und ehrlich beantwortet. Ihre Frage ist nicht dabei? Schreiben Sie mir oder fragen Sie im kostenlosen Erstgespräch.</p>}
        actions={
          <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
            Kostenloses Erstgespräch
          </ButtonLink>
        }
      />

      <Sheet crumbs={[{ name: 'Häufige Fragen', path: PATH }]}>
        {/* Je Themengruppe eine Section (5 Fragen), passt in einen Bildschirm. Danach Kontakt für weitere Fragen */}
        {FAQ_GRUPPEN.map((g, i) => (
          <section
            key={g.id}
            id={g.id}
            aria-labelledby={`${g.id}-title`}
            className={cn('sec scroll-mt-24', i === 0 && 'pt-[clamp(1.5rem,3svh,2.5rem)]', i % 2 === 1 && 'bg-stone')}
          >
            <div className="wrap grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
              <Reveal className="lg:col-span-5 xl:col-span-4">
                <p className="t-label text-caramel-700">
                  Thema {i + 1} von {FAQ_GRUPPEN.length}
                </p>
                <h2 id={`${g.id}-title`} className="t-h2 mt-3 text-espresso-900">
                  {g.title}
                </h2>
                {i === 0 && (
                  <nav aria-label="Themen" className="mt-[clamp(0.75rem,2.5svh,1.5rem)] flex flex-wrap gap-1.5 md:gap-2">
                    {FAQ_GRUPPEN.map((x) => (
                      <a
                        key={x.id}
                        href={`#${x.id}`}
                        className="rounded-full border border-line bg-white px-3 py-1 text-[0.8125rem] font-medium text-espresso-900 transition-colors hover:border-caramel-500 hover:text-caramel-800 md:px-4 md:py-2 md:text-[0.9375rem]"
                      >
                        {x.title}
                      </a>
                    ))}
                  </nav>
                )}
              </Reveal>
              <div className="lg:col-span-7 xl:col-span-8">
                <FaqAccordion faqs={g.faqs} />
              </div>
            </div>
          </section>
        ))}

        <section aria-label="Weitere Fragen" className="sec-t pb-[calc(var(--sec-y)+var(--sheet-overlap))]">
          <div className="wrap grid items-center gap-[var(--sec-gap)] md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <Reveal delay={0.1}>
              <div className="grain glow-hover floaty flex flex-col gap-3.5 overflow-hidden rounded-lg bg-espresso-800 p-6 text-white xl:p-8">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-caramel-300/15 text-caramel-300">
                  <span className="glow-icon">
                    <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </span>
                <p className="font-serif text-[1.5rem] leading-[1.2] xl:text-[1.625rem]">Ihre Frage ist nicht dabei?</p>
                <p className="text-[0.9375rem] leading-relaxed text-espresso-200 md:text-base">Schreiben Sie mir, ich antworte persönlich.</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <a href={`mailto:${site.email}`} className={buttonClass('light', 'md', 'w-full sm:w-auto')}>
                    E-Mail schreiben
                  </a>
                  <Link href={ERSTGESPRAECH} className="text-[0.9375rem] font-semibold text-white underline decoration-caramel-300/60 underline-offset-4 hover:text-caramel-200">
                    Oder im Erstgespräch fragen
                  </Link>
                </div>
              </div>
            </Reveal>
            <p className="flex items-center gap-2.5 text-[0.8125rem] text-muted md:text-[0.875rem]">
              <CalendarCheck className="h-4 w-4 shrink-0 text-caramel-700" strokeWidth={1.75} aria-hidden="true" />
              <span>
                Zuletzt aktualisiert: <time dateTime={CONTENT_UPDATED}>{updated}</time>
              </span>
            </p>
          </div>
        </section>
      </Sheet>
    </>
  )
}
