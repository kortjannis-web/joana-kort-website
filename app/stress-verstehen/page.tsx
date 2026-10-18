import Link from 'next/link'
import { ArrowDown, Fingerprint, ShieldCheck, Sprout } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { CtaRow } from '@/components/ui/CtaRow'
import { JsonLd } from '@/components/ui/JsonLd'
import { More } from '@/components/ui/More'
import { Reveal } from '@/components/ui/Reveal'
import { FaqSection } from '@/components/home/FaqSection'
import { ArticleCard } from '@/components/ratgeber/ArticleCard'
import { ThemaRow } from '@/components/wissen/ThemaRow'
import { ARTIKEL } from '@/lib/content/ratgeber'
import { STRESS_DEFINITION, WISSEN_DEMNAECHST, WISSEN_FAQS, WISSEN_GRUPPEN, WISSEN_QUELLEN, WISSEN_THEMEN } from '@/lib/content/wissen'
import { ORG_ID, PERSON_ID, faqSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { CONTENT_UPDATED, CTA_LABEL, ERSTGESPRAECH, SITE_URL } from '@/lib/site'

const PATH = '/stress-verstehen/'

export const metadata = pageMeta({
  title: 'Stress verstehen: Was ist Stress? Einfach erklärt | Joana Kort',
  description:
    'Was ist Stress, was passiert im Körper und warum stresst nicht jeden dasselbe? Stressreaktion, Bewertung, Anzeichen und was hilft, kurz und verständlich erklärt.',
  path: PATH,
})

const FAKT_ICONS = [ShieldCheck, Fingerprint, Sprout]

/**
 * Wissen "Stress verstehen": die Theorie hinter der Begleitung, kurz erklärt und in Bildern.
 * Aufbau: Kurzantwort (GEO) → zwei Dreiergruppen mit Erklär-Animationen (Langtext hinter dem Pfeil) → Brücke "Wissen allein reicht nicht"
 * mit CTA → Demnächst (Platzhalter) → Ratgeber → FAQ. Inhalte in lib/content/wissen.ts.
 */
export default function StressVerstehenPage() {
  const artikel = ARTIKEL.filter((a) => ['was-ist-stress', 'stress-erkennen', 'akuter-stress-was-hilft'].includes(a.slug))
  let n = 0
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            '@id': `${SITE_URL}${PATH}#artikel`,
            headline: 'Stress verstehen: Was ist Stress? Einfach erklärt',
            description: STRESS_DEFINITION.antwort,
            url: `${SITE_URL}${PATH}`,
            inLanguage: 'de-DE',
            dateModified: CONTENT_UPDATED,
            author: { '@id': PERSON_ID },
            publisher: { '@id': ORG_ID },
            about: [{ '@type': 'Thing', name: 'Stress', sameAs: 'https://de.wikipedia.org/wiki/Stress' }],
            hasPart: WISSEN_THEMEN.map((t) => ({ '@type': 'WebPageElement', name: t.frage, url: `${SITE_URL}${PATH}#${t.id}` })),
            citation: WISSEN_QUELLEN.map((q) => q.label),
          },
          faqSchema(WISSEN_FAQS),
        ]}
      />
      <PageHero
        eyebrow="Stress verstehen"
        title={
          <>
            Was Stress ist und <em>wie er wirkt</em>
          </>
        }
        intro={
          <p>
            Was in Ihrem Körper passiert, warum Stress bei jedem anders ist und woran Sie ihn früh erkennen. Kurz erklärt, in Bildern statt
            Fachsprache.
          </p>
        }
        actions={
          <>
            <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
              {CTA_LABEL}
            </ButtonLink>
            <a
              href="#was-ist-stress"
              className="group inline-flex min-h-11 items-center justify-center gap-2 font-semibold text-espresso-800 underline decoration-caramel-400/70 underline-offset-[6px] hover:text-caramel-800 sm:justify-start"
            >
              Zu den Erklärungen
              <ArrowDown className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5" strokeWidth={2} aria-hidden="true" />
            </a>
          </>
        }
      />

      <Sheet crumbs={[{ name: 'Stress verstehen', path: PATH }]}>
        {/* Kurzantwort: direkt zitierbar für Suchmaschinen und KI */}
        <section id="was-ist-stress" aria-labelledby="definition-title" className="scroll-mt-24 sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
          <div className="wrap grid gap-[var(--sec-gap)] xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-6">
              <p className="t-label text-caramel-700">Kurz erklärt</p>
              <h2 id="definition-title" className="t-h2 mt-3 text-espresso-900">
                {STRESS_DEFINITION.frage}
              </h2>
              <p className="t-lead mt-[clamp(0.5rem,2svh,1.25rem)] text-ink/85 max-md:text-[0.9375rem] max-md:leading-relaxed">{STRESS_DEFINITION.antwort}</p>
              <nav aria-label="Themen auf dieser Seite" className="mt-[clamp(0.75rem,3svh,1.75rem)] flex flex-wrap gap-1.5 compact:hidden md:gap-2">
                {WISSEN_THEMEN.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="rounded-full border border-line bg-white px-3 py-1 text-[0.8125rem] font-medium text-espresso-800 md:px-3.5 md:py-1.5 md:text-[0.875rem] transition-colors hover:border-caramel-500 hover:text-caramel-800"
                  >
                    {t.frage.split('?')[0]}
                  </a>
                ))}
              </nav>
            </Reveal>
            <Reveal delay={0.08} className="xl:col-span-6">
              <Carousel label="Drei Fakten zu Stress" arrowLabel="Fakten" item="78vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-3 xl:grid-cols-1">
                {STRESS_DEFINITION.fakten.map((f, i) => {
                  const Icon = FAKT_ICONS[i]
                  return (
                    <div key={f.title} className="glow-hover flex h-full gap-4 rounded-lg border border-line bg-white p-4 md:flex-col md:p-[clamp(1rem,2.5svh,1.25rem)] xl:flex-row xl:items-center">
                      <span className="glow-icon grid h-12 w-12 shrink-0 place-items-center rounded-full bg-stone text-caramel-700">
                        <Icon className="h-[1.375rem] w-[1.375rem]" strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-serif text-[1.25rem] leading-tight text-espresso-900">{f.title}</span>
                        <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted">{f.text}</span>
                      </span>
                    </div>
                  )
                })}
              </Carousel>
            </Reveal>
          </div>
        </section>

        {WISSEN_GRUPPEN.map((g, gi) => (
          <div key={g.id}>
            <section id={g.id} aria-labelledby={`${g.id}-title`} className="sec scroll-mt-24 xl:flex xl:min-h-svh xl:flex-col xl:justify-center">
              <div className="wrap">
                <Reveal className="max-w-[44rem]">
                  <p className="t-label text-caramel-700">{g.label}</p>
                  <h2 id={`${g.id}-title`} className="t-h2 mt-3 text-espresso-900">
                    {g.title}
                  </h2>
                  <p className="t-lead mt-[clamp(0.5rem,1.5svh,1rem)] text-muted max-md:hidden">{g.intro}</p>
                </Reveal>
                {/* Drei Themen zum Blättern: immer ein Thema samt Animation auf dem Bildschirm */}
                <Carousel
                  label={g.title}
                  arrowLabel="Themen"
                  item="88vw"
                  itemMd="100%"
                  itemXl="100%"
                  className="mt-[var(--sec-gap)] md:px-10"
                >
                  {g.themen.map((t) => (
                    <ThemaRow key={t.id} t={t} index={++n} />
                  ))}
                </Carousel>
                {gi === WISSEN_GRUPPEN.length - 1 && (
                  <Reveal className="mt-[var(--sec-gap)] max-md:hidden">
                    <CtaRow note="Welche Wege zu Ihnen passen, klären wir in 15 Minuten." />
                  </Reveal>
                )}
              </div>
            </section>

            {/* Nach der ersten Gruppe: die Brücke vom Wissen zur Umsetzung (Kernproblem) mit CTA */}
            {gi === 0 && (
              <section aria-labelledby="bruecke-title" className="grain sec overflow-hidden bg-espresso-800 text-white">
                <div className="wrap grid gap-[var(--sec-gap)] xl:grid-cols-12 xl:items-center xl:gap-16">
                  <Reveal className="xl:col-span-7">
                    <h2 id="bruecke-title" className="t-h2 text-white">
                      Wissen allein <em className="italic text-caramel-300">entlastet nicht</em>
                    </h2>
                    <p className="t-lead mt-[clamp(0.75rem,2svh,1.25rem)] text-espresso-100/90">
                      Die meisten wissen längst, was ihnen guttun würde. Entscheidend ist, es im eigenen Alltag umzusetzen. Genau dabei begleite
                      ich Sie: persönlich, Schritt für Schritt und mit Plänen, die zu Ihnen passen.
                    </p>
                  </Reveal>
                  <Reveal delay={0.08} className="xl:col-span-5">
                    <CtaRow tone="dark" />
                    <Link href="/mein-ansatz/" className="mt-4 inline-flex min-h-11 items-center font-semibold text-white underline decoration-caramel-300/60 underline-offset-[6px] hover:text-caramel-200">
                      So arbeite ich
                    </Link>
                  </Reveal>
                </div>
              </section>
            )}
          </div>
        ))}

        {/* Platzhalter: weitere Themen in Vorbereitung */}
        <section aria-labelledby="demnaechst-title" className="bg-greige sec">
          <div className="wrap">
            <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="t-label text-caramel-700">Demnächst</p>
                <h2 id="demnaechst-title" className="t-h2 mt-3 text-espresso-900">
                  Weitere Themen in Vorbereitung
                </h2>
              </div>
              <Link href="/ratgeber/" className="link font-semibold">
                Zum Ratgeber
              </Link>
            </Reveal>
            <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
              <ul className="grid gap-3 md:grid-cols-3 md:gap-5">
                {WISSEN_DEMNAECHST.map((d) => (
                  <li key={d.title} className="rounded-lg border border-dashed border-caramel-400/70 bg-paper/60 p-4 md:p-[clamp(1.25rem,3svh,1.5rem)]">
                    <span className="inline-flex h-6 items-center rounded-full bg-white px-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-caramel-700">
                      Bald hier
                    </span>
                    <p className="mt-2 font-serif text-[1.25rem] leading-tight text-espresso-900 md:mt-3 md:text-[1.3rem]">{d.title}</p>
                    <p className="mt-1 text-[0.875rem] leading-snug text-muted md:mt-1.5 md:text-[0.9375rem] md:leading-relaxed">{d.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="lesen-title" className="sec-t">
          <div className="wrap">
            <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 id="lesen-title" className="t-h2 text-espresso-900">
                Zum Weiterlesen
              </h2>
              <Link href="/ratgeber/" className="link font-semibold">
                Alle Artikel im Ratgeber
              </Link>
            </Reveal>
            <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
              <Carousel label="Artikel" arrowLabel="Artikel" item="84vw" itemXl="auto" gridFrom="md" gridClass="md:grid-cols-3 md:gap-6">
                {artikel.map((a) => (
                  <ArticleCard key={a.slug} a={a} headingLevel={3} />
                ))}
              </Carousel>
            </Reveal>
          </div>
        </section>

        <section aria-label="Hinweis und Quellen" className="sec-t">
          <div className="wrap">
            <Reveal className="rounded-lg border border-line border-l-[3px] border-l-caramel-500 bg-caramel-50 px-5 py-5">
              <p className="font-semibold text-espresso-900">Wichtig</p>
              <p className="mt-1.5 leading-relaxed text-ink/85">
                Diese Seite erklärt Grundlagen und ersetzt keine Diagnose. Bei anhaltenden Beschwerden ist ärztlicher oder psychotherapeutischer
                Rat der richtige erste Schritt.{' '}
                <Link href="/ratgeber/stressberatung-coaching-oder-therapie/" className="link">
                  Beratung, Coaching oder Therapie?
                </Link>
              </p>
              <More label="Quellen und Literatur" showLabel className="mt-3" bodyClassName="pt-2">
                <ul className="space-y-1.5 text-[0.9375rem] text-muted">
                  {WISSEN_QUELLEN.map((q) => (
                    <li key={q.label}>
                      {q.url ? (
                        <a href={q.url} target="_blank" rel="noopener noreferrer" className="link">
                          {q.label}
                        </a>
                      ) : (
                        q.label
                      )}
                    </li>
                  ))}
                </ul>
              </More>
            </Reveal>
          </div>
        </section>

        <FaqSection faqs={WISSEN_FAQS} title="Häufige Fragen zum Thema Stress" id="stress-fragen" />
      </Sheet>
    </>
  )
}
