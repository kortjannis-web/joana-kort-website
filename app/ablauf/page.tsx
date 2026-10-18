import Link from 'next/link'
import { ArrowRight, Check, Info } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { CtaRow } from '@/components/ui/CtaRow'
import { JsonLd } from '@/components/ui/JsonLd'
import { More } from '@/components/ui/More'
import { Reveal } from '@/components/ui/Reveal'
import { ProgrammCard } from '@/components/angebote/ProgrammCard'
import { PROGRAMME, RABATT_LANG } from '@/lib/content/angebote'
import { serviceSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { CTA_LABEL, ERSTGESPRAECH, site } from '@/lib/site'

const PATH = '/ablauf/'

export const metadata = pageMeta({
  title: 'Ablauf der Zusammenarbeit: in drei Schritten | Joana Kort',
  description:
    'Kostenloses Erstgespräch, individuelle Analyse und Planung, gemeinsame praktische Arbeit: So läuft die Stressberatung ab. Mit Beispiel und den zwei Programmen.',
  path: PATH,
})

/** Die drei Schritte (je drei Punkte) */
const SCHRITTE = [
  {
    title: 'Kennenlernen und Einordnung',
    kurz: 'Kostenloses Erstgespräch, etwa 15 Minuten',
    punkte: [
      'Am Telefon oder per Video, kostenlos und unverbindlich',
      'Wir klären Ihr Anliegen und Ihre Erwartungen',
      'Erste Einschätzung, welches Angebot zu Ihnen passt',
    ],
  },
  {
    title: 'Individuelle Analyse und Planung',
    kurz: 'Ihre Ausgangslage, Ihre Ziele',
    punkte: [
      'Wir erfassen Ihre persönliche Stresssituation',
      'Wir erkennen Belastungen und Ihre Stressreaktionen',
      'Wir legen Schwerpunkte und Ziele fest: Ihr persönlicher Unterstützungsplan',
    ],
  },
  {
    title: 'Gemeinsame praktische Arbeit',
    kurz: 'Verstehen, bewältigen, managen',
    punkte: [
      'Grundlagen verstehen, passende Methoden auswählen und erproben',
      'Strategien und Pläne für Ihren Alltag entwickeln',
      'Umsetzen, gemeinsam nachjustieren, bis es im Alltag trägt',
    ],
  },
]

/** Erfundenes Fallbeispiel (klar gekennzeichnet), wöchentliche Begleitung über zwölf Wochen */
const BEISPIEL = [
  {
    zeit: 'Woche 1 bis 4',
    phase: 'Stress verstehen',
    punkte: [
      'Sie führt vier Wochen lang ein Stresstagebuch.',
      'Die Stresslandkarte zeigt zwei Engpässe: der Morgen zwischen Frühstück, Kita und Arbeitsbeginn und die Lernzeit spät am Abend.',
      'Ihre Signale: Gereiztheit, ein verspannter Nacken und Gedankenkreisen beim Einschlafen.',
    ],
  },
  {
    zeit: 'Woche 5 bis 8',
    phase: 'Stress bewältigen',
    punkte: [
      'Eine kurze Atemübung für den Moment, in dem morgens alles gleichzeitig passiert.',
      'Aus "Ich muss alles perfekt schaffen" wird "Diese Woche reicht das Wichtigste".',
      'Eine feste kleine Pause zwischen Arbeit und Familie.',
    ],
  },
  {
    zeit: 'Woche 9 bis 12',
    phase: 'Stress managen',
    punkte: [
      'Ein Wochenplaner mit festen Lernfenstern statt Lernen, wenn gerade Zeit ist.',
      'Ein Essensplan mit Einkaufsliste, den ich nach ihren Lieblingsgerichten erstellt habe.',
      'Eine vereinfachte Morgenroutine und neu verteilte Aufgaben in der Familie.',
    ],
  },
]

/** Kurzes Beispiel: Schulung im Unternehmen */
const SCHULUNG = [
  { title: 'Vorgespräch', text: 'Anlass, Teamgröße und Ziele. Daraus entsteht ein Konzept mit Inhalten, Umfang und Format.' },
  {
    title: 'Schulung, z. B. ein halber Tag',
    text: 'Impuls "Stress verstehen", Übungen für akute Momente im Arbeitsalltag und gemeinsame Vereinbarungen, die das Team entlasten.',
  },
  { title: 'Nachklang', text: 'Materialien für alle Teilnehmenden und auf Wunsch ein Folgetermin nach einigen Wochen, damit das Gelernte im Alltag ankommt.' },
]

/** Ziffernkachel, leicht abgerundet */
function Nr({ n, dark = false }: { n: number; dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={
        dark
          ? 'grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/20 text-[0.9375rem] font-semibold text-caramel-200'
          : 'grid h-10 w-10 shrink-0 place-items-center rounded-md bg-espresso-800 text-[0.9375rem] font-semibold text-caramel-200'
      }
    >
      {n}
    </span>
  )
}

/** Deutliche Kennzeichnung: erfundenes Beispiel */
function BeispielBadge({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <p
      className={
        dark
          ? 'inline-flex items-center gap-2 rounded-sm border border-caramel-300/50 bg-caramel-300/10 px-3 py-1.5 text-[0.8125rem] font-semibold text-caramel-200'
          : 'inline-flex items-center gap-2 rounded-sm border border-caramel-500/50 bg-caramel-50 px-3 py-1.5 text-[0.8125rem] font-semibold text-caramel-800'
      }
    >
      <Info className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      {text}
    </p>
  )
}

export default function AblaufPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: 'Stressberatung und Stresscoaching: Ablauf der Zusammenarbeit',
          description:
            'Drei Schritte: kostenloses Erstgespräch zur Einordnung, individuelle Analyse und Planung mit persönlichem Unterstützungsplan, gemeinsame praktische Arbeit mit Methoden, Strategien und Plänen für den Alltag. Programm über drei oder sechs Monate.',
          path: PATH,
        })}
      />
      <PageHero
        tone="greige"
        eyebrow="Ablauf"
        title={
          <>
            So läuft die <span className="text-caramel-600">Zusammenarbeit</span> ab
          </>
        }
        intro={
          <p>
            Drei Schritte, klar und überschaubar: Wir lernen uns kennen, schauen genau auf Ihre Situation und arbeiten dann gemeinsam und
            praktisch an Ihrem Alltag.
          </p>
        }
        actions={
          <>
            <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
              {CTA_LABEL}
            </ButtonLink>
            <ButtonLink href="#beispiel" variant="outline" size="lg" className="w-full sm:w-auto">
              Ein Beispiel ansehen
            </ButtonLink>
          </>
        }
        aside={
          <ol className="frame-soft rounded-lg bg-white/90 p-6 shadow-[0_24px_48px_-28px_rgba(30,22,17,0.45)]" aria-label="Die drei Schritte">
            {SCHRITTE.map((s, i) => (
              <li key={s.title} className="flex items-center gap-4 border-b border-line py-4 first:pt-0 last:border-0 last:pb-0">
                <Nr n={i + 1} />
                <span>
                  <span className="block font-semibold text-espresso-900">{s.title}</span>
                  <span className="block text-[0.875rem] text-muted">{s.kurz}</span>
                </span>
              </li>
            ))}
          </ol>
        }
      />

      <Sheet crumbs={[{ name: 'Ablauf', path: PATH }]}>
        {/* Die drei Schritte */}
        <section aria-labelledby="schritte" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
          <div className="wrap">
            <Reveal className="max-w-[44rem]">
              <p className="t-label text-caramel-700">In drei Schritten</p>
              <h2 id="schritte" className="t-h2 mt-3 text-espresso-900">
                Vom ersten Gespräch bis zur <span className="text-caramel-600">Umsetzung</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
              <Carousel label="Schritte" arrowLabel="Schritte" item="84vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-5 xl:gap-6">
                {SCHRITTE.map((s, i) => (
                  <article key={s.title} className="lift-hover floaty flex h-full flex-col rounded-lg border border-line bg-white p-5 md:p-[clamp(1.25rem,3svh,1.75rem)]">
                    <div className="flex items-center gap-3">
                      <Nr n={i + 1} />
                      <span className="text-[0.8125rem] text-muted">
                        Schritt {i + 1} von {SCHRITTE.length}
                      </span>
                    </div>
                    <h3 className="mt-[clamp(0.75rem,2svh,1.25rem)] text-[1.125rem] font-semibold leading-snug text-espresso-900 md:text-[1.1875rem]">{s.title}</h3>
                    <p className="mt-1 text-[0.875rem] text-caramel-700">{s.kurz}</p>
                    <ul className="mt-[clamp(0.75rem,2svh,1rem)] space-y-2 border-t border-line pt-[clamp(0.75rem,2svh,1rem)]">
                      {s.punkte.map((p) => (
                        <li key={p} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink/85">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-caramel-600" strokeWidth={1.5} aria-hidden="true" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </Carousel>
            </Reveal>
            <Reveal delay={0.12} className="mt-[var(--sec-gap)]">
              <CtaRow />
            </Reveal>
          </div>
        </section>

        {/* Programme */}
        <section id="programme" aria-labelledby="programme-title" className="sec scroll-mt-24 bg-greige xl:flex xl:min-h-svh xl:flex-col xl:justify-center">
          <div className="wrap grid gap-x-10 gap-y-[var(--sec-gap)] lg:grid-cols-12 lg:items-center xl:gap-x-12">
            <Reveal className="lg:col-span-4">
              <p className="t-label text-caramel-700">Persönliche Begleitung</p>
              <h2 id="programme-title" className="t-h2 mt-3 text-espresso-900">
                Zwei Programme, gleicher Weg
              </h2>
              <p className="mt-[clamp(0.5rem,1.5svh,1rem)] text-[0.9375rem] leading-relaxed text-muted max-lg:hidden md:text-[1.0625rem]">
                Beide folgen den drei Schritten. Der Unterschied liegt im Rhythmus. Mit dem Schalter sehen Sie die doppelte Laufzeit. Den Preis nenne
                ich Ihnen im Erstgespräch, bevor Sie sich entscheiden.
              </p>
            </Reveal>
            <div className="lg:col-span-8">
              <Reveal delay={0.08}>
                <Carousel label="Programme" arrowLabel="Programme" item="84vw" gridFrom="md" gridClass="md:grid-cols-2 md:gap-5 xl:gap-6">
                  {PROGRAMME.map((p, idx) => (
                    <ProgrammCard key={p.key} p={p} dark={idx === 1} href="/erstgespraech/?interesse=begleitung#anfrage" />
                  ))}
                </Carousel>
              </Reveal>
              <More label="Laufzeit, Ort und Begleitung zu zweit" showLabel className="mt-2" bodyClassName="text-[0.9375rem] leading-relaxed text-muted">
                Doppelte Laufzeit: Bei sechs statt drei bzw. zwölf statt sechs Monaten erhalten Sie {RABATT_LANG} % Rabatt auf jede Sitzung.{' '}
                Beide Programme sind online per Video oder vor Ort möglich. Vor-Ort-Termine im Umkreis von etwa {site.radiusKm} km um{' '}
                {site.address.city}, zzgl. Fahrtkosten. Auch zu zweit möglich:{' '}
                <Link href="/zu-zweit-und-in-der-gruppe/" className="link">
                  Begleitung zu zweit
                </Link>
                . Alle Details zur Begleitung:{' '}
                <Link href="/stresscoaching/" className="link">
                  Stresscoaching
                </Link>
                .
              </More>
            </div>
          </div>
        </section>

        {/* Fallbeispiel (erfunden, klar gekennzeichnet) */}
        <section id="beispiel" aria-labelledby="beispiel-title" className="sec-t scroll-mt-24 pb-[var(--sec-gap)]">
          <div className="wrap">
            <Reveal className="grid gap-x-10 gap-y-[clamp(0.75rem,2svh,1.25rem)] lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <BeispielBadge text="Beispiel, keine echte Kundin" />
                <h2 id="beispiel-title" className="t-h2 mt-[clamp(0.75rem,2svh,1.25rem)] text-espresso-900">
                  So <span className="text-caramel-600">könnte</span> es aussehen
                </h2>
              </div>
              <p className="max-w-[36rem] text-[0.9375rem] leading-relaxed text-muted md:text-[1.0625rem] lg:col-span-5">
                Eine berufstätige Mutter von zwei Kindern, nebenbei im Studium. Sie weiß längst, dass sie etwas ändern sollte, aber ihr fehlt
                die Zeit, damit anzufangen. Sie wählt die wöchentliche Begleitung über drei Monate: zwölf Wochen, eine Sitzung pro Woche.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
              <Carousel label="Beispiel in drei Phasen" arrowLabel="Phasen" item="84vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-5 xl:gap-6">
                {BEISPIEL.map((b, i) => (
                  <article key={b.zeit} className="flex h-full flex-col rounded-lg border border-dashed border-caramel-500/50 bg-stone p-5 md:p-[clamp(1.25rem,3svh,1.75rem)]">
                    <div className="flex items-center gap-3">
                      <Nr n={i + 1} />
                      <span>
                        <span className="block text-[0.8125rem] text-muted">{b.zeit}</span>
                        <span className="block font-semibold text-espresso-900">{b.phase}</span>
                      </span>
                    </div>
                    <ul className="mt-[clamp(0.75rem,2svh,1rem)] space-y-2 border-t border-line pt-[clamp(0.75rem,2svh,1rem)]">
                      {b.punkte.map((p) => (
                        <li key={p} className="flex gap-2.5 text-[0.9375rem] leading-snug text-ink/85">
                          <span aria-hidden="true" className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-caramel-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </Carousel>
            </Reveal>
          </div>
        </section>

        {/* Ergebnis im Beispiel als eigener kleiner Block, damit das Beispiel in einen Bildschirm passt */}
        <section aria-label="Ergebnis im Beispiel" className="pb-[var(--sec-y)]">
          <div className="wrap">
            <Reveal className="grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:items-center lg:gap-x-10">
              <div className="rounded-lg border-l-[3px] border-l-caramel-500 bg-caramel-50 px-5 py-4 lg:col-span-7">
                <p className="font-semibold text-espresso-900">Nach zwölf Wochen</p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink/85">
                  Nicht jeder Tag ist leicht, aber vieles ist planbarer geworden. Sie erkennt ihre Warnsignale früher und hat Werkzeuge, die sie
                  wirklich nutzt.
                </p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                  Erfundenes Beispiel zur Veranschaulichung. Jede Begleitung verläuft anders, weil jeder Mensch und jeder Alltag anders ist.
                </p>
              </div>
              <div className="lg:col-span-5 lg:justify-self-end">
                <CtaRow note="Wie es bei Ihnen aussehen könnte, besprechen wir in 15 Minuten" className="lg:flex-col lg:items-start lg:gap-3" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Kurzes Beispiel: Schulung im Unternehmen */}
        <section aria-labelledby="schulung-title" className="grain sec overflow-hidden bg-espresso-800 text-white">
          <div className="wrap grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:items-center lg:gap-x-12 xl:gap-x-16">
            <Reveal className="lg:col-span-5">
              <BeispielBadge text="Beispiel" dark />
              <h2 id="schulung-title" className="t-h2 mt-[clamp(0.75rem,2svh,1.25rem)] text-white">
                So kann eine <span className="text-caramel-300">Schulung</span> im Unternehmen ablaufen
              </h2>
              <p className="mt-[clamp(0.5rem,1.5svh,1rem)] text-[0.9375rem] leading-relaxed text-espresso-100/90 max-md:hidden md:text-[1.0625rem]">
                Für kleine Unternehmen, Teams und Gruppen, online oder bei Ihnen vor Ort. Inhalte und Umfang stimme ich auf Ihr Team ab.
              </p>
              <Link
                href="/stressmanagement-unternehmen/"
                className="mt-[clamp(0.5rem,2svh,1.25rem)] inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-caramel-300/60 underline-offset-[6px] hover:text-caramel-200 max-md:hidden"
              >
                Mehr zu Schulungen für Unternehmen
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7">
              <ol className="divide-y divide-white/12 border-y border-white/12">
                {SCHULUNG.map((s, i) => (
                  <li key={s.title} className="flex gap-4 py-[clamp(0.75rem,2.2svh,1.25rem)]">
                    <Nr n={i + 1} dark />
                    <div>
                      <h3 className="font-semibold text-white md:text-[1.0625rem]">{s.title}</h3>
                      <p className="mt-1 text-[0.875rem] leading-snug text-espresso-100/85 md:text-[0.9375rem] md:leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <CtaRow tone="dark" href="/erstgespraech/?interesse=unternehmen#anfrage" className="mt-[clamp(1rem,3svh,1.75rem)]" />
            </Reveal>
          </div>
        </section>

        {/* Abgrenzung + weiter */}
        <section aria-labelledby="weiter" className="sec-t pb-[calc(var(--sec-y)+var(--sheet-overlap))]">
          <div className="wrap">
            <Reveal className="rounded-lg border border-line border-l-[3px] border-l-caramel-500 bg-caramel-50 px-5 py-5 md:px-7">
              <p className="font-semibold text-espresso-900">Praktische Begleitung, keine Therapie</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/85 md:text-base">
                Meine Arbeit ist keine Psychotherapie und keine Heilbehandlung. Ich stelle keine Diagnosen und mache keine Heilversprechen.{' '}
                <Link href="/ratgeber/stressberatung-coaching-oder-therapie/" className="link">
                  Unterschied zur Therapie
                </Link>
              </p>
            </Reveal>
            <Reveal delay={0.06} className="mt-[var(--sec-y)]">
              <h2 id="weiter" className="t-h2 text-espresso-900">
                Mehr erfahren
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-[var(--sec-gap)] grid gap-3 md:grid-cols-3 md:gap-5">
              {[
                { href: '/methoden/', title: 'Methoden und Werkzeuge', text: 'Womit wir arbeiten, und warum nicht jede Person dasselbe bekommt.' },
                { href: '/mein-ansatz/', title: 'Mein Ansatz', text: 'Stress verstehen, bewältigen, managen: die drei Schwerpunkte.' },
                { href: '/qualifikationen-und-referenzen/', title: 'Qualifikationen und Referenzen', text: 'Mein fachlicher Hintergrund, transparent erklärt.' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="group flex h-full items-start justify-between gap-4 rounded-lg border border-line bg-white p-5 transition-colors duration-500 hover:border-caramel-500">
                  <span>
                    <span className="block font-semibold text-espresso-900">{l.title}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-snug text-muted">{l.text}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-caramel-700 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      </Sheet>
    </>
  )
}
