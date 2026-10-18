import Link from 'next/link'
import { ArrowRight, BookOpen, GraduationCap, Presentation } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { CtaRow } from '@/components/ui/CtaRow'
import { JsonLd } from '@/components/ui/JsonLd'
import { More } from '@/components/ui/More'
import { Reveal } from '@/components/ui/Reveal'
import { Reviews } from '@/components/home/Reviews'
import { Arbeitsweise } from '@/components/referenzen/Arbeitsweise'
import { StatusBadge } from '@/components/referenzen/StatusBadge'
import { FORTBILDUNGEN, FOTOS, QUALIFIKATIONEN, TRAININGS, type Fortbildung } from '@/lib/content/referenzen'
import { PERSON_ID } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { CTA_LABEL, ERSTGESPRAECH, ROLE, SITE_URL, site } from '@/lib/site'
import { InfoNote } from '@/components/ui/OpenBlock'

/**
 * Qualifikationen und Referenzen. Inhalte ausschließlich aus lib/content/referenzen.ts (Anleitung zum Ergänzen dort oben)
 * und lib/content/reviews.ts. Jede Section mit leerer Liste wird komplett ausgeblendet, es gibt keine Platzhalter.
 * Laufende Qualifikationen tragen immer das Badge "Laufend".
 */

const PATH = '/qualifikationen-und-referenzen/'
const TITLE = 'Qualifikationen und Referenzen | Joana Kort Stressberatung'
const DESCRIPTION =
  'Fachlicher Hintergrund von Joana Kort: Studium der Gesundheitspsychologie, Schwerpunkt Stress. Transparent gekennzeichnet, dazu Arbeitsweise und klare Abgrenzung zur Therapie.'

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH })

/** Fortbildungen: so viele sichtbar, der Rest hinter dem Pfeil (Viewport-Regel) */
const FORTBILDUNGEN_SICHTBAR = 6

function FortbildungItem({ f }: { f: Fortbildung }) {
  return (
    <li className="grid grid-cols-[4.5rem_1fr] gap-x-4 border-b border-line py-[clamp(0.625rem,1.8svh,1rem)]">
      <span className="text-[0.875rem] font-semibold text-caramel-700">{f.jahr}</span>
      <span>
        <span className="block font-semibold leading-snug text-espresso-900">{f.titel}</span>
        {f.einrichtung && <span className="mt-0.5 block text-[0.875rem] text-muted">{f.einrichtung}</span>}
        {f.beschreibung && <span className="mt-1 block text-[0.9375rem] leading-snug text-ink/80">{f.beschreibung}</span>}
      </span>
    </li>
  )
}

export default function QualifikationenPage() {
  const studentin = ROLE.jobTitle !== 'Gesundheitspsychologin' && QUALIFIKATIONEN.some((q) => q.status === 'laufend')
  const fbSichtbar = FORTBILDUNGEN.slice(0, FORTBILDUNGEN_SICHTBAR)
  const fbWeitere = FORTBILDUNGEN.slice(FORTBILDUNGEN_SICHTBAR)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: TITLE,
          description: DESCRIPTION,
          url: `${SITE_URL}${PATH}`,
          inLanguage: 'de-DE',
          about: { '@id': PERSON_ID },
        }}
      />
      <PageHero
        eyebrow="Qualifikationen und Referenzen"
        title={
          <>
            Fachlich fundiert und <span className="text-caramel-600">transparent</span>
          </>
        }
        intro={
          <p>
            Sie sollen wissen, auf welcher Grundlage ich arbeite. Hier finden Sie meinen fachlichen Hintergrund, ehrlich gekennzeichnet, und wie
            ich in der Zusammenarbeit vorgehe.
          </p>
        }
        actions={
          <>
            <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
              {CTA_LABEL}
            </ButtonLink>
            <ButtonLink href="/joana-kort/" variant="outline" size="lg" className="w-full sm:w-auto">
              Mehr über mich
            </ButtonLink>
          </>
        }
        aside={
          <dl className="frame-soft rounded-lg bg-white/90 p-6 shadow-[0_24px_48px_-28px_rgba(30,22,17,0.45)]">
            <p className="t-label text-caramel-700">Auf einen Blick</p>
            {[
              ['Name', site.owner],
              ['Bezeichnung', ROLE.short],
              ['Fachlicher Hintergrund', ROLE.background],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-line py-3.5 last:border-0 last:pb-0">
                <dt className="text-[0.8125rem] text-muted">{k}</dt>
                <dd className="mt-0.5 font-semibold leading-snug text-espresso-900">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <Sheet crumbs={[{ name: 'Über mich', path: '/joana-kort/' }, { name: 'Qualifikationen und Referenzen', path: PATH }]}>
        {/* Qualifikationen (Ausbildung, Studium) */}
        {QUALIFIKATIONEN.length > 0 && (
          <section aria-labelledby="qualifikationen" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
            <div className="wrap grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
              <Reveal className="lg:col-span-5">
                <p className="t-label text-caramel-700">Ausbildung</p>
                <h2 id="qualifikationen" className="t-h2 mt-3 text-espresso-900">
                  Meine <span className="text-caramel-600">Qualifikationen</span>
                </h2>
                <p className="mt-[clamp(0.75rem,2svh,1.25rem)] text-[0.9375rem] leading-relaxed text-muted md:text-[1.0625rem]">
                  Was noch nicht abgeschlossen ist, kennzeichne ich als laufend, mit dem voraussichtlichen Abschluss.
                  {studentin && ' Solange mein Studium läuft, nenne ich mich bewusst Stressberaterin und nicht Gesundheitspsychologin.'}
                </p>
              </Reveal>
              <Reveal delay={0.08} className="lg:col-span-7">
                <ul className="space-y-3">
                  {QUALIFIKATIONEN.map((q) => (
                    <li key={q.titel} className="floaty rounded-lg border border-line bg-white p-5 md:p-[clamp(1.25rem,3svh,1.75rem)]">
                      <div className="flex items-start gap-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-stone text-espresso-800">
                          <GraduationCap className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <StatusBadge status={q.status} />
                          <h3 className="mt-2.5 text-[1.125rem] font-semibold leading-snug text-espresso-900 md:text-[1.25rem]">{q.titel}</h3>
                          <p className="mt-1 text-[0.9375rem] font-semibold text-caramel-700">{[q.institution, q.zeitraum].filter(Boolean).join(' · ')}</p>
                          {q.beschreibung && <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{q.beschreibung}</p>}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        )}

        {/* Fortbildungen (nur, wenn vorhanden) */}
        {FORTBILDUNGEN.length > 0 && (
          <section aria-labelledby="fortbildungen" className="sec bg-stone">
            <div className="wrap grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
              <Reveal className="lg:col-span-4">
                <span className="grid h-11 w-11 place-items-center rounded-md bg-white text-espresso-800">
                  <BookOpen className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h2 id="fortbildungen" className="t-h2 mt-4 text-espresso-900">
                  Fortbildungen
                </h2>
                <p className="mt-[clamp(0.5rem,1.5svh,1rem)] text-[0.9375rem] leading-relaxed text-muted md:text-[1.0625rem]">
                  Ich bilde mich laufend weiter, damit Sie von aktuellem Wissen profitieren.
                </p>
              </Reveal>
              <Reveal delay={0.08} className="lg:col-span-8">
                <ul className="border-t border-line">
                  {fbSichtbar.map((f) => (
                    <FortbildungItem key={f.titel + f.jahr} f={f} />
                  ))}
                </ul>
                {fbWeitere.length > 0 && (
                  <More label={`${fbWeitere.length} weitere Fortbildungen`} showLabel className="mt-2" bodyClassName="pt-0">
                    <ul>
                      {fbWeitere.map((f) => (
                        <FortbildungItem key={f.titel + f.jahr} f={f} />
                      ))}
                    </ul>
                  </More>
                )}
              </Reveal>
            </div>
          </section>
        )}

        {/* Trainings und Schulungen, die ich gehalten habe (nur, wenn vorhanden) */}
        {TRAININGS.length > 0 && (
          <section aria-labelledby="trainings" className="sec">
            <div className="wrap">
              <Reveal className="max-w-[44rem]">
                <p className="t-label text-caramel-700">Referenzen</p>
                <h2 id="trainings" className="t-h2 mt-3 text-espresso-900">
                  Schulungen und Trainings
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
                <Carousel label="Schulungen und Trainings" arrowLabel="Schulungen" item="82vw">
                  {TRAININGS.map((t) => (
                    <article key={t.titel + t.jahr} className="floaty flex h-full flex-col rounded-lg border border-line bg-white p-5 md:p-[clamp(1.25rem,3svh,1.75rem)]">
                      <div className="flex items-center justify-between gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-md bg-stone text-espresso-800">
                          <Presentation className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                        </span>
                        <span className="text-[0.875rem] font-semibold text-caramel-700">{t.jahr}</span>
                      </div>
                      <h3 className="mt-4 text-[1.125rem] font-semibold leading-snug text-espresso-900">{t.titel}</h3>
                      <p className="mt-1 text-[0.875rem] text-muted">{t.einrichtung}</p>
                      {t.beschreibung && <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/85">{t.beschreibung}</p>}
                    </article>
                  ))}
                </Carousel>
              </Reveal>
            </div>
          </section>
        )}

        {/* Fotos (nur, wenn vorhanden) */}
        {FOTOS.length > 0 && (
          <section aria-labelledby="fotos" className="sec bg-stone">
            <div className="wrap">
              <Reveal>
                <h2 id="fotos" className="t-h2 text-espresso-900">
                  Einblicke
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
                <Carousel label="Fotos" arrowLabel="Fotos" item="84vw">
                  {FOTOS.map((f) => (
                    <figure key={f.src} className="h-full">
                      <img
                        src={f.src}
                        alt={f.alt}
                        width={f.width}
                        height={f.height}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] max-h-[50svh] w-full rounded-md object-cover"
                      />
                      {f.caption && <figcaption className="mt-2 text-[0.875rem] text-muted">{f.caption}</figcaption>}
                    </figure>
                  ))}
                </Carousel>
              </Reveal>
            </div>
          </section>
        )}

        {/* Kundenstimmen: blendet sich ohne echte Stimmen selbst aus */}
        <Reviews title="Stimmen aus der Zusammenarbeit" />

        <Arbeitsweise />

        {/* Abgrenzung */}
        <section aria-labelledby="abgrenzung" className="sec-t">
          <div className="wrap">
            <Reveal>
              <InfoNote kicker="Abgrenzung" title="Klar abgegrenzt: keine Psychotherapie" titleAs="h2" titleId="abgrenzung">
                <p>
                  Ich begleite Sie im Umgang mit alltäglichem Stress, praktisch und lösungsorientiert. Meine Arbeit ist keine Psychotherapie und keine
                  Heilbehandlung. Ich stelle keine Diagnosen und mache keine Heilversprechen. Bei Verdacht auf eine Erkrankung ist Ihre Hausarztpraxis
                  die richtige erste Adresse.{' '}
                  <Link href="/ratgeber/stressberatung-coaching-oder-therapie/" className="link">
                    Unterschied zur Therapie
                  </Link>
                </p>
              </InfoNote>
            </Reveal>
          </div>
        </section>

        {/* Kennenlernen und weiter */}
        <section aria-labelledby="kennenlernen" className="sec-t pb-[calc(var(--sec-y)+var(--sheet-overlap))]">
          <div className="wrap">
            <Reveal className="flex flex-col gap-[var(--sec-gap)] lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[40rem]">
                <h2 id="kennenlernen" className="t-h2 text-espresso-900">
                  Lernen Sie mich kennen
                </h2>
                <p className="mt-[clamp(0.5rem,1.5svh,1rem)] text-[0.9375rem] leading-relaxed text-muted md:text-[1.0625rem]">
                  Im kostenlosen Erstgespräch können Sie mir alle Fragen stellen, auch zu meinem Hintergrund.
                </p>
              </div>
              <CtaRow className="shrink-0" />
            </Reveal>
            <Reveal delay={0.1} className="mt-[var(--sec-gap)] grid gap-3 md:grid-cols-3 md:gap-5">
              {[
                { href: '/joana-kort/', title: 'Über mich', text: 'Wer ich bin und warum ich mich auf Stress spezialisiere.' },
                { href: '/mein-ansatz/', title: 'Mein Ansatz', text: 'Stress verstehen, bewältigen, managen.' },
                { href: '/ablauf/', title: 'So läuft die Zusammenarbeit ab', text: 'Drei Schritte, mit Beispiel.' },
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
