import Link from 'next/link'
import { ArrowRight, Check, Info } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { More } from '@/components/ui/More'
import { PaperStack } from '@/components/ui/PaperStack'
import { Carousel } from '@/components/ui/Carousel'
import { CheckList } from '@/components/lists/CheckList'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { Pillars } from '@/components/home/Pillars'
import { Process } from '@/components/home/Process'
import { MoreOffers } from '@/components/angebote/MoreOffers'
import { ProgrammCard } from '@/components/angebote/ProgrammCard'
import { BESTANDTEILE, PROGRAMME } from '@/lib/content/angebote'
import { COACHING_FAQS } from '@/lib/content/faqs'
import { faqSchema, serviceSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { CTA_LABEL, site } from '@/lib/site'

const PATH = '/stresscoaching/'

export const metadata = pageMeta({
  title: 'Stresscoaching: Begleitung über 3 oder 6 Monate | Joana Kort',
  description:
    'Persönliches Stresscoaching in Gummersbach und online: Stressanalyse, Unterstützungsplan, Methoden und Pläne für Ihren Alltag. 3 oder 6 Monate. Erstgespräch kostenlos.',
  path: PATH,
})

/** Je drei Punkte (3er-Gruppen) */
const FUER_SIE = [
  'Ihnen wächst vieles über den Kopf, und Sie wissen nicht, wo Sie anfangen sollen.',
  'Sie haben schon viel über Stress gelesen und bekommen es trotzdem nicht in Ihren Alltag.',
  'Sie möchten nicht nur kurz durchatmen, sondern langfristig anders mit Stress umgehen.',
]

const ERGEBNIS = [
  'Sie verstehen Ihren Stress und erkennen Ihre Signale früher.',
  'Sie haben Methoden, die zu Ihnen passen und die Sie wirklich anwenden.',
  'Sie haben Pläne und Routinen, die Ihren Alltag entlasten.',
]

const HREF = '/erstgespraech/?interesse=begleitung#anfrage'

export default function StresscoachingPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Stresscoaching: persönliche Begleitung über 3 oder 6 Monate',
            description:
              'Individuelle Eins-zu-eins-Begleitung: Stressanalyse, Stresslandkarte, Unterstützungsplan, Methoden zur Stressbewältigung und Pläne für einen stressärmeren Alltag. Online und vor Ort im Raum Gummersbach.',
            path: PATH,
          }),
          faqSchema(COACHING_FAQS),
        ]}
      />
      <PageHero
        eyebrow="Stresscoaching"
        title={
          <>
            Ihre persönliche Begleitung, <em>wöchentlich oder alle zwei Wochen</em>
          </>
        }
        intro={
          <p>
            Wir gehen Ihren Stress gemeinsam und strukturiert an: verstehen, bewältigen, managen. Sie bekommen einen Plan, der zu Ihrem Leben
            passt, und Unterstützung, bis er im Alltag trägt.
          </p>
        }
        actions={
          <>
            <ButtonLink href={HREF} variant="primary" size="lg" className="w-full sm:w-auto">
              {CTA_LABEL}
            </ButtonLink>
            <ButtonLink href="#programme" variant="outline" size="lg" className="w-full sm:w-auto">
              Programme vergleichen
            </ButtonLink>
          </>
        }
        aside={<PaperStack layout="hero" priority className="mx-auto w-[92%]" />}
      />

      <Sheet crumbs={[{ name: 'Angebote', path: '/angebote/' }, { name: 'Stresscoaching', path: PATH }]}>
        {/* Für wen + Ergebnis */}
        <section aria-labelledby="fuer-wen" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
          <div className="wrap grid gap-[var(--sec-gap)] md:grid-cols-2 md:gap-x-10 xl:gap-x-20">
            <Reveal>
              <h2 id="fuer-wen" className="t-h2 text-espresso-900">
                Das Richtige für Sie, wenn …
              </h2>
              <CheckList items={FUER_SIE} className="mt-[clamp(1rem,2.5svh,1.5rem)] space-y-[clamp(0.5rem,1.5svh,0.75rem)] text-[0.9375rem] md:text-[1.0625rem]" />
            </Reveal>
            <Reveal delay={0.1} className="rounded-xl bg-stone p-5 md:p-[clamp(1.5rem,4svh,2.25rem)]">
              <h2 className="t-h3 text-espresso-900">Was Sie nach der Begleitung mitnehmen</h2>
              <ul className="mt-[clamp(0.75rem,2svh,1.25rem)] space-y-[clamp(0.5rem,1.5svh,0.875rem)] max-md:text-[0.9375rem]">
                {ERGEBNIS.map((e, i) => (
                  <li key={e} className="flex gap-4">
                    <span aria-hidden="true" className="font-serif text-[1.375rem] italic leading-none text-caramel-600">
                      {i + 1}
                    </span>
                    <span className="leading-snug text-ink/85">{e}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-[clamp(0.75rem,2svh,1.5rem)] border-t border-line pt-3 text-[0.8125rem] leading-relaxed text-muted md:text-[0.875rem]">
                Ein Ziel, keine Garantie: Wie schnell sich Entlastung einstellt, ist individuell. Viele Veränderungen werden aber schon in den
                ersten Wochen spürbar, wenn wir gezielt ansetzen.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Programme */}
        <section id="programme" aria-labelledby="programme-title" className="sec scroll-mt-24 bg-greige xl:flex xl:min-h-svh xl:flex-col xl:justify-center">
          <div className="wrap grid gap-x-10 lg:grid-cols-12 lg:items-center xl:gap-x-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="t-label text-caramel-700">Zwei Programme</p>
                <h2 id="programme-title" className="t-h2 mt-3 text-espresso-900">
                  Wöchentlich oder alle zwei Wochen
                </h2>
                <p className="t-lead mt-[clamp(0.5rem,1.5svh,1rem)] text-muted max-lg:hidden">
                  Beide Programme folgen den drei Schwerpunkten. Der Unterschied liegt im Rhythmus. Wer länger begleitet werden möchte, verdoppelt die Laufzeit und erhält 15 % Rabatt auf jede Sitzung.
                </p>
              </Reveal>
              <Reveal className="mt-[clamp(0.75rem,2.5svh,1.5rem)] max-lg:hidden">
                <p className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-muted">
                  <Info className="mt-1 h-4.5 w-4.5 shrink-0 text-caramel-600" strokeWidth={1.75} aria-hidden="true" />
                  <span>
                    Beide Programme online oder vor Ort. Den Preis nenne ich Ihnen im kostenlosen Erstgespräch, transparent und bevor Sie sich
                    entscheiden. Vor-Ort-Termine im Umkreis von etwa {site.radiusKm} km um {site.address.city}, zzgl. Fahrtkosten. Auch zu zweit
                    möglich:{' '}
                    <Link href="/zu-zweit-und-in-der-gruppe/" className="link">
                      Begleitung zu zweit
                    </Link>
                    .
                  </span>
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.08} className="mt-[var(--sec-gap)] lg:col-span-8 lg:mt-0">
              <Carousel label="Programme" arrowLabel="Programme" item="86vw" gridFrom="md" gridClass="md:grid-cols-2 md:gap-5 xl:gap-8">
                {PROGRAMME.map((p, idx) => (
                  <ProgrammCard key={p.key} p={p} dark={idx === 1} href={HREF} />
                ))}
              </Carousel>
            </Reveal>
            {/* Handy/Tablet: Preis und Ort hinter dem Pfeil, damit Kopf und Karte in einen Bildschirm passen */}
            <More label="Preis, Ort und Begleitung zu zweit" showLabel className="mt-1 lg:hidden" bodyClassName="text-[0.875rem] leading-relaxed text-muted">
              Beide Programme online oder vor Ort. Den Preis nenne ich Ihnen im kostenlosen Erstgespräch, transparent und bevor Sie sich
              entscheiden. Vor-Ort-Termine im Umkreis von etwa {site.radiusKm} km um {site.address.city}, zzgl. Fahrtkosten. Auch zu zweit möglich:{' '}
              <Link href="/zu-zweit-und-in-der-gruppe/" className="link">
                Begleitung zu zweit
              </Link>
              .
            </More>
          </div>
        </section>

        {/* Bestandteile */}
        <section aria-labelledby="inklusive" className="sec xl:flex xl:min-h-svh xl:flex-col xl:justify-center">
          <div className="wrap">
            <Reveal className="max-w-[44rem]">
              <h2 id="inklusive" className="t-h2 text-espresso-900">
                In beiden Programmen enthalten
              </h2>
              <p className="t-lead mt-[clamp(0.5rem,1.5svh,1rem)] text-muted max-md:text-[0.9375rem] max-md:leading-relaxed">
                Keine reine Wissensvermittlung: Ich übernehme innerhalb der Begleitung auch konkrete Aufgaben. Sie nennen mir zum Beispiel Ihre
                Lieblingsgerichte und Bedürfnisse, und ich erstelle daraus einen passenden Essensplan.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
              <Carousel label="Bestandteile" arrowLabel="Bestandteile" item="82vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-5 xl:gap-6">
                {BESTANDTEILE.map((g, gi) => (
                  <div key={g.title} className="glow-hover h-full rounded-xl border border-line bg-white p-5 md:p-[clamp(1.25rem,3svh,1.5rem)]">
                    <p className="flex items-baseline gap-2.5">
                      <span aria-hidden="true" className="font-serif text-[1.375rem] italic leading-none text-caramel-600">
                        {gi + 1}
                      </span>
                      <span className="font-serif text-[1.25rem] leading-tight text-espresso-900">{g.title}</span>
                    </p>
                    <ul className="mt-[clamp(0.75rem,2svh,1rem)] space-y-2 border-t border-line pt-[clamp(0.75rem,2svh,1rem)]">
                      {g.items.map((b) => (
                        <li key={b} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink/85">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-caramel-600" strokeWidth={2.25} aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Carousel>
            </Reveal>
          </div>
        </section>

        <Pillars title="So ist jede Begleitung aufgebaut" cta={false} />

        {/* Materialien */}
        <section id="materialien" aria-labelledby="materialien-title" className="grain sec scroll-mt-24 overflow-hidden bg-espresso-800 text-white xl:flex xl:min-h-svh xl:items-center">
          <div className="wrap grid items-center gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            <Reveal className="lg:col-span-6">
              <p className="t-label text-caramel-300">Ein Beispiel aus der Praxis</p>
              <h2 id="materialien-title" className="t-h2 mt-3 text-white">
                So sehen die <em className="italic text-caramel-300">Materialien</em> aus
              </h2>
              <p className="t-lead mt-[clamp(0.5rem,2svh,1.25rem)] text-espresso-100/90 max-md:hidden">
                Alles, was Sie von mir bekommen, ist schlicht, schön und sofort nutzbar, zum Ausdrucken oder am Bildschirm. Ein paar Beispiele:
              </p>
              <dl className="mt-[clamp(0.75rem,3svh,1.75rem)] divide-y divide-white/12 border-y border-white/12">
                {[
                  ['Stresstagebuch', 'Vier Wochen lang Situation, Auslöser, Stresslevel von 0 bis 10, Reaktion und Lösung festhalten. Mit Wochen- und Gesamtrückblick.'],
                  ['Tagesplaner', 'Stundenplan, Stresslevel, Gewohnheiten, To-dos und ein Moment der Dankbarkeit auf einer Seite.'],
                  ['Wochenfokus', 'Ein Wochenziel statt zehn Baustellen, dazu ein einfacher Gewohnheits-Tracker.'],
                ].map(([t, d]) => (
                  <div key={t} className="grid gap-0.5 py-[clamp(0.5rem,1.6svh,1rem)] sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="font-serif text-[1.125rem] italic text-caramel-200">{t}</dt>
                    <dd className="text-[0.875rem] leading-snug text-espresso-100/85 compact:hidden md:text-[0.9375rem] md:leading-relaxed">{d}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/ratgeber/stresstagebuch-anleitung/" className="mt-[clamp(0.5rem,2svh,1.5rem)] inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-caramel-300/60 underline-offset-[6px] hover:text-caramel-200">
                Anleitung: Stresstagebuch führen
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="mx-auto w-full max-w-[min(36rem,calc(19svh*1.11))] max-lg:order-first md:max-w-[min(36rem,calc(30svh*1.11))] lg:col-span-6 lg:max-w-[min(100%,calc((100svh-2*var(--sec-y))*1.05))]">
              <PaperStack layout="planer" />
            </Reveal>
          </div>
        </section>

        <Process tone="paper" />

        {/* Abgrenzung */}
        <section aria-label="Hinweis zur Abgrenzung" className="pb-6">
          <div className="wrap">
            <Reveal className="rounded-lg border border-line border-l-[3px] border-l-caramel-500 bg-caramel-50 px-5 py-5 md:px-7">
              <p className="font-semibold text-espresso-900">Keine Therapie, sondern praktische Begleitung</p>
              <p className="mt-2 leading-relaxed text-ink/85">
                Das Stresscoaching unterstützt Sie im Umgang mit Stress im Alltag. Es ist keine Psychotherapie und keine Heilbehandlung. Bei
                Verdacht auf eine Erkrankung ist Ihre Hausarztpraxis die richtige erste Adresse.{' '}
                <Link href="/ratgeber/stressberatung-coaching-oder-therapie/" className="link">
                  Mehr zur Abgrenzung
                </Link>
              </p>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="coaching-fragen" className="sec">
          <div className="wrap grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
            <Reveal className="lg:col-span-5 xl:col-span-4">
              <h2 id="coaching-fragen" className="t-h2 text-espresso-900">
                Häufige Fragen zum Stresscoaching
              </h2>
              <Link href="/haeufige-fragen/" className="link mt-[clamp(0.5rem,2svh,1.25rem)] inline-block font-semibold">
                Alle Fragen und Antworten
              </Link>
            </Reveal>
            <div className="lg:col-span-7 xl:col-span-8">
              <FaqAccordion faqs={COACHING_FAQS} />
            </div>
          </div>
        </section>

        <MoreOffers current="begleitung" />
      </Sheet>
    </>
  )
}
