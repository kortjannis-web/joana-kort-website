import Link from 'next/link'
import { ArrowRight, Check, Info } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { PaperStack } from '@/components/ui/PaperStack'
import { CheckList } from '@/components/lists/CheckList'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { Pillars } from '@/components/home/Pillars'
import { Process } from '@/components/home/Process'
import { MoreOffers } from '@/components/angebote/MoreOffers'
import { BESTANDTEILE, PROGRAMME } from '@/lib/content/angebote'
import { COACHING_FAQS } from '@/lib/content/faqs'
import { faqSchema, serviceSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { ERSTGESPRAECH, site } from '@/lib/site'

const PATH = '/stresscoaching/'

export const metadata = pageMeta({
  title: 'Stresscoaching: Begleitung über 3 oder 6 Monate | Joana Kort',
  description:
    'Persönliches Stresscoaching in Gummersbach und online: Stressanalyse, Begleitungsplan, Methoden und Pläne für Ihren Alltag. 3 oder 6 Monate. Erstgespräch kostenlos.',
  path: PATH,
})

const FUER_SIE = [
  'Sie wissen, dass Sie Stress haben, aber nicht, wo Sie anfangen sollen.',
  'Sie haben schon viel über Stress gelesen und bekommen es trotzdem nicht in Ihren Alltag.',
  'Ihnen wächst gerade vieles über den Kopf: Beruf, Familie, Haushalt, Studium.',
  'Sie möchten nicht nur kurz durchatmen, sondern langfristig anders mit Stress umgehen.',
  'Sie wünschen sich jemanden, der strukturiert mit Ihnen arbeitet und Sie bei der Umsetzung begleitet.',
]

const ERGEBNIS = [
  'Sie verstehen Ihren Stress und erkennen Ihre Signale früher.',
  'Sie wissen, wo und wie Sie ansetzen können.',
  'Sie haben Methoden, die zu Ihnen passen und die Sie wirklich anwenden.',
  'Sie haben Pläne und Routinen, die Ihren Alltag entlasten.',
  'Sie fühlen sich Ihrem Stress weniger ausgeliefert und wieder handlungsfähiger.',
]

export default function StresscoachingPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Stresscoaching: persönliche Begleitung über 3 oder 6 Monate',
            description:
              'Individuelle Eins-zu-eins-Begleitung: Stressanalyse, Stresslandkarte, Begleitungsplan, Methoden zur Stressbewältigung und Pläne für einen stressärmeren Alltag. Online und vor Ort im Raum Gummersbach.',
            path: PATH,
          }),
          faqSchema(COACHING_FAQS),
        ]}
      />
      <PageHero
        eyebrow="Stresscoaching"
        title={
          <>
            Ihre persönliche Begleitung über <em>drei oder sechs Monate</em>
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
            <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
              Kostenloses Erstgespräch
            </ButtonLink>
            <ButtonLink href="#programme" variant="outline-light" size="lg" className="w-full sm:w-auto">
              Programme vergleichen
            </ButtonLink>
          </>
        }
        aside={<PaperStack layout="hero" priority className="mx-auto w-[92%]" />}
      />

      <Sheet crumbs={[{ name: 'Angebote', path: '/angebote/' }, { name: 'Stresscoaching', path: PATH }]}>
        {/* Für wen + Ergebnis */}
        <section aria-labelledby="fuer-wen" className="pb-16 pt-8 md:pb-24 md:pt-12 xl:pb-28">
          <div className="wrap grid gap-10 md:gap-14 xl:grid-cols-2 xl:gap-20">
            <Reveal>
              <h2 id="fuer-wen" className="t-h2 text-espresso-900">
                Das Richtige für Sie, wenn …
              </h2>
              <CheckList items={FUER_SIE} className="mt-6 text-[1.0625rem]" />
            </Reveal>
            <Reveal delay={0.1} className="rounded-xl bg-stone p-6 md:p-9">
              <h2 className="t-h3 text-espresso-900">Was Sie nach der Begleitung mitnehmen</h2>
              <ul className="mt-5 space-y-3.5">
                {ERGEBNIS.map((e, i) => (
                  <li key={e} className="flex gap-4">
                    <span aria-hidden="true" className="font-serif text-[1.375rem] italic leading-none text-terra-500">
                      {i + 1}
                    </span>
                    <span className="leading-snug text-ink/85">{e}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-4 text-[0.875rem] leading-relaxed text-muted">
                Ein Ziel, keine Garantie: Wie schnell sich Entlastung einstellt, ist individuell. Viele Veränderungen werden aber schon in den
                ersten Wochen spürbar, wenn wir gezielt ansetzen.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Programme */}
        <section id="programme" aria-labelledby="programme-title" className="scroll-mt-24 bg-greige py-16 md:py-24 xl:py-28">
          <div className="wrap">
            <Reveal className="max-w-[44rem]">
              <p className="t-label text-caramel-700">Zwei Programme</p>
              <h2 id="programme-title" className="t-h2 mt-3 text-espresso-900">
                Drei oder sechs Monate: gleicher Weg, anderes Tempo
              </h2>
              <p className="t-lead mt-4 text-muted">
                Beide Programme folgen den drei Schwerpunkten. Der Unterschied liegt im Rhythmus und darin, wie viel Zeit jedes Thema bekommt.
              </p>
            </Reveal>
            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:gap-8">
              {PROGRAMME.map((p, idx) => (
                <Reveal key={p.key} delay={idx * 0.08}>
                  <article className={idx === 0 ? 'floaty-lg flex h-full flex-col rounded-xl bg-white p-6 md:p-8' : 'grain floaty-lg flex h-full flex-col overflow-hidden rounded-xl bg-espresso-800 p-6 text-white md:p-8'}>
                    <p className={idx === 0 ? 't-label text-caramel-700' : 't-label text-caramel-300'}>{p.untertitel}</p>
                    <h3 className="mt-3 font-serif text-[2.6rem] leading-none md:text-[3.2rem]">
                      <em className={idx === 0 ? 'italic text-terra-600' : 'italic text-terra-300'}>{p.monate}</em> Monate
                    </h3>
                    <ul className={idx === 0 ? 'mt-6 divide-y divide-line border-y border-line' : 'mt-6 divide-y divide-white/12 border-y border-white/12'}>
                      {[
                        ['Rhythmus', p.rhythmus],
                        ['Dauer', p.dauer],
                        ['Umfang', p.sitzungen],
                        ['Format', 'Online oder vor Ort'],
                      ].map(([k, v]) => (
                        <li key={k} className="flex justify-between gap-4 py-3 text-[0.9375rem]">
                          <span className={idx === 0 ? 'text-muted' : 'text-espresso-200'}>{k}</span>
                          <span className="text-right font-semibold">{v}</span>
                        </li>
                      ))}
                    </ul>
                    <ol className="mt-6 grid grid-cols-3 gap-2" aria-label="Aufbau">
                      {p.phasen.map((ph, i) => (
                        <li key={ph.title}>
                          <span className="block h-1.5 rounded-full" style={{ background: ['#d6b892', '#e8a877', '#d98a55'][i] }} />
                          <span className={idx === 0 ? 'mt-2 block text-[0.75rem] text-muted' : 'mt-2 block text-[0.75rem] text-espresso-200'}>{ph.zeit}</span>
                          <span className="block text-[0.875rem] font-semibold leading-tight">{ph.title}</span>
                        </li>
                      ))}
                    </ol>
                    <p className={idx === 0 ? 'mt-6 flex-1 leading-relaxed text-ink/85' : 'mt-6 flex-1 leading-relaxed text-espresso-100/90'}>{p.fuer}</p>
                    <ButtonLink href={ERSTGESPRAECH} variant={idx === 0 ? 'primary' : 'light'} size="lg" className="group mt-7 w-full">
                      Im Erstgespräch besprechen
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
                    </ButtonLink>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-6 flex items-start gap-3 text-[0.9375rem] text-muted">
              <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-caramel-600" strokeWidth={1.75} aria-hidden="true" />
              <p>
                Den Preis nenne ich Ihnen im kostenlosen Erstgespräch, transparent und bevor Sie sich entscheiden. Vor-Ort-Termine im Umkreis von
                etwa {site.radiusKm} km um {site.address.city}, zzgl. Fahrtkosten. Auch zu zweit möglich:{' '}
                <Link href="/zu-zweit-und-in-der-gruppe/" className="link">
                  Begleitung zu zweit
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </section>

        {/* Bestandteile */}
        <section aria-labelledby="inklusive" className="py-16 md:py-24 xl:py-28">
          <div className="wrap grid gap-8 xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-4">
              <h2 id="inklusive" className="t-h2 text-espresso-900">
                In beiden Programmen enthalten
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Keine reine Wissensvermittlung: Ich übernehme innerhalb der Begleitung auch konkrete Aufgaben. Sie nennen mir zum Beispiel Ihre
                Lieblingsgerichte und Bedürfnisse, und ich erstelle daraus einen passenden Essensplan.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="xl:col-span-8">
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {BESTANDTEILE.map((b) => (
                  <li key={b} className="flex gap-3 border-b border-line py-3.5 leading-snug">
                    <Check className="mt-0.5 h-[1.125rem] w-[1.125rem] shrink-0 text-terra-500" strokeWidth={2} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <Pillars title="So ist jede Begleitung aufgebaut" cta={false} />

        {/* Materialien */}
        <section id="materialien" aria-labelledby="materialien-title" className="grain scroll-mt-24 overflow-hidden bg-espresso-800 py-16 text-white md:py-24 xl:py-28">
          <div className="wrap grid items-center gap-12 xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-6">
              <p className="t-label text-caramel-300">Ein Beispiel aus der Praxis</p>
              <h2 id="materialien-title" className="t-h2 mt-3 text-white">
                So sehen die <em className="italic text-terra-300">Materialien</em> aus
              </h2>
              <p className="t-lead mt-5 text-espresso-100/90">
                Alles, was Sie von mir bekommen, ist schlicht, schön und sofort nutzbar, zum Ausdrucken oder am Bildschirm. Ein paar Beispiele:
              </p>
              <dl className="mt-7 divide-y divide-white/12 border-y border-white/12">
                {[
                  ['Stresstagebuch', 'Vier Wochen lang Situation, Auslöser, Stresslevel von 0 bis 10, Reaktion und Lösung festhalten. Mit Wochen- und Gesamtrückblick.'],
                  ['Tagesplaner', 'Stundenplan, Stresslevel, Gewohnheiten, To-dos und ein Moment der Dankbarkeit auf einer Seite.'],
                  ['Wochenfokus', 'Ein Wochenziel statt zehn Baustellen, dazu ein einfacher Gewohnheits-Tracker.'],
                  ['Begleitungsplan', 'Ihr persönlicher Plan mit Zielen, Methoden und Materialien, abgestimmt auf Ihr Leben.'],
                ].map(([t, d]) => (
                  <div key={t} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="font-serif text-[1.125rem] italic text-terra-200">{t}</dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-espresso-100/85">{d}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/ratgeber/stresstagebuch-anleitung/" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-terra-300/60 underline-offset-[6px] hover:text-terra-200">
                Anleitung: Stresstagebuch führen
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="mx-auto w-full max-w-[36rem] xl:col-span-6 xl:max-w-none">
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

        <section aria-labelledby="coaching-fragen" className="py-16 md:py-24">
          <div className="wrap grid gap-8 xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-4">
              <h2 id="coaching-fragen" className="t-h2 text-espresso-900">
                Häufige Fragen zum Stresscoaching
              </h2>
              <Link href="/haeufige-fragen/" className="link mt-5 inline-block font-semibold">
                Alle Fragen und Antworten
              </Link>
            </Reveal>
            <div className="xl:col-span-8">
              <FaqAccordion faqs={COACHING_FAQS} openFirst />
            </div>
          </div>
        </section>

        <MoreOffers current="begleitung" />
      </Sheet>
    </>
  )
}
