import Link from 'next/link'
import { LogoMark } from '@/components/layout/Logo'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { More } from '@/components/ui/More'
import { CheckList } from '@/components/lists/CheckList'
import { Pillars } from '@/components/home/Pillars'
import { Process } from '@/components/home/Process'
import { ArticleCard } from '@/components/ratgeber/ArticleCard'
import { ARTIKEL } from '@/lib/content/ratgeber'
import { serviceSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { ERSTGESPRAECH } from '@/lib/site'

const PATH = '/mein-ansatz/'

export const metadata = pageMeta({
  title: 'Mein Ansatz: Stress verstehen, bewältigen, managen | Joana Kort',
  description:
    'So arbeite ich: Stress verstehen, individuell bewältigen und den Alltag so gestalten, dass weniger Stress entsteht. Fundiert, praktisch, auf Augenhöhe.',
  path: PATH,
})

const HALTUNG = [
  {
    title: 'Stress beginnt früher, als viele denken',
    text: 'Nicht erst, wenn es kurz vor zwölf ist. Stress ist zunächst ein Prozess im Körper. Wer ihn früh erkennt, kann früh gegensteuern.',
  },
  {
    title: 'Stress lässt sich nicht vermeiden, aber gestalten',
    text: 'Es wird immer Belastungen geben. Ich verspreche kein stressfreies Leben, sondern einen Umgang, mit dem Sie handlungsfähig bleiben.',
  },
  {
    title: 'Wissen allein reicht nicht',
    text: 'Die meisten wissen längst, dass sie etwas ändern sollten. Der entscheidende Schritt ist die Umsetzung, und genau dabei begleite ich Sie.',
  },
]

const ARBEITSWEISE = [
  'Ich gehe auf Ihre persönliche Lebenssituation ein, nicht auf einen Durchschnittsmenschen.',
  'Wir analysieren gemeinsam, wo Ihr Stress entsteht und wo Sie ansetzen können.',
  'Ich erkläre wissenschaftliche Erkenntnisse verständlich und übersetze sie in Ihren Alltag.',
  'Ich erstelle individuelle Pläne und Materialien, auf Wunsch auch ganz konkret für Sie.',
  'Ich begleite Sie bei der Umsetzung und passe an, was nicht funktioniert.',
  'Wir arbeiten auf Augenhöhe: persönlich, vertrauensvoll und professionell.',
]

export default function AnsatzPage() {
  const artikel = ARTIKEL.filter((a) => ['was-ist-stress', 'stressmanagement-im-alltag', 'stressberatung-coaching-oder-therapie'].includes(a.slug))
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: 'Stressberatung und Stresscoaching nach dem Ansatz Stress verstehen, bewältigen, managen',
          description: 'Individuelle, strukturierte Begleitung in drei aufeinander aufbauenden Schwerpunkten mit Fokus auf die praktische Umsetzung.',
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Mein Ansatz"
        title={
          <>
            Stress verstehen, bewältigen und <em>managen</em>
          </>
        }
        intro={
          <p>
            Drei Schritte, die aufeinander aufbauen. Fundiert in der Gesundheitspsychologie, ausgerichtet auf Ihren Alltag. Damit aus dem Wissen,
            dass sich etwas ändern muss, echte Veränderung wird.
          </p>
        }
        actions={
          <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
            Kostenloses Erstgespräch
          </ButtonLink>
        }
      />

      <Sheet crumbs={[{ name: 'Mein Ansatz', path: PATH }]}>
        <section aria-labelledby="haltung" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
          <div className="wrap">
            <Reveal>
              <p className="t-label text-caramel-700">Meine Haltung</p>
              <h2 id="haltung" className="t-h2 mt-3 max-w-[26ch] text-espresso-900">
                Was ich über Stress denke und warum das für Sie wichtig ist
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
              <Carousel label="Meine Haltung" arrowLabel="Punkte" item="80vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-5 xl:gap-8">
                {HALTUNG.map((h) => (
                  <div key={h.title} className="floaty flex h-full flex-col rounded-xl border border-line bg-white p-5 md:p-[clamp(1.25rem,3.5svh,1.75rem)]">
                    <LogoMark className="h-7 w-auto self-start text-caramel-500" strokeWidth={2} />
                    <h3 className="mt-4 font-serif text-[1.375rem] leading-tight text-espresso-900">{h.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted md:mt-3 md:text-base">{h.text}</p>
                  </div>
                ))}
              </Carousel>
            </Reveal>
          </div>
        </section>

        <Pillars title="Die drei Schwerpunkte im Detail" intro="Jede Begleitung folgt diesem Weg. Wie viel Raum jeder Schritt bekommt, richtet sich nach Ihnen." cta={false} />

        <section aria-labelledby="managen" className="grain sec overflow-hidden bg-espresso-800 text-white">
          <div className="wrap grid gap-[var(--sec-gap)] xl:grid-cols-12 xl:items-center xl:gap-16">
            <Reveal className="xl:col-span-5">
              <h2 id="managen" className="t-h2 text-white">
                Stress managen heißt <em className="text-caramel-300">nicht</em>, noch mehr zu leisten
              </h2>
              <p className="t-lead mt-[clamp(0.75rem,2svh,1.25rem)] text-espresso-100/90 max-md:text-[0.9375rem] max-md:leading-relaxed">
                Bei "Stressmanagement" denken viele sofort an eine weitere To-do-Liste. Mir geht es um das Gegenteil: vorhandene Kräfte sinnvoll
                einsetzen und unnötige Belastungen streichen.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="xl:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/12 bg-white/[0.04] p-4 md:p-[clamp(1.25rem,3svh,1.5rem)]">
                  <p className="t-label text-espresso-300">Was es nicht ist</p>
                  <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-espresso-200 md:mt-4 md:space-y-2.5 md:text-base">
                    {['Noch mehr Aufgaben', 'Allgemeine Tipps für alle', 'Durchhalten, bis nichts mehr geht'].map((t) => (
                      <li key={t} className="line-through decoration-caramel-300/60">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-caramel-300/30 bg-caramel-300/[0.08] p-4 md:p-[clamp(1.25rem,3svh,1.5rem)]">
                  <p className="t-label text-caramel-200">Was es ist</p>
                  <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-white md:mt-4 md:space-y-2.5 md:text-base">
                    {['Weniger, aber das Richtige', 'Pläne, die zu Ihnen passen', 'Früher erkennen, früher handeln'].map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="arbeitsweise" className="sec-t pb-[var(--sec-gap)]">
          <div className="wrap grid gap-[var(--sec-gap)] xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-5">
              <p className="t-label text-caramel-700">Arbeitsweise</p>
              <h2 id="arbeitsweise" className="t-h2 mt-3 text-espresso-900">
                Beratung und Coaching in einem
              </h2>
              <p className="t-lead mt-[clamp(0.75rem,2svh,1.25rem)] text-muted compact:hidden max-md:text-[0.9375rem] max-md:leading-relaxed">
                Ich erkläre nicht nur, was Stress ist, und überlasse Ihnen dann die Umsetzung. Wir entwickeln gemeinsam Lösungen, und ich
                übernehme innerhalb der Begleitung auch konkrete Aufgaben.
              </p>
              <More label="Fachliche Grundlage" showLabel className="mt-2 compact:hidden" bodyClassName="leading-relaxed text-muted">
                Fachlich stütze ich mich auf etablierte Modelle der Stressforschung, etwa das transaktionale Stressmodell von Lazarus und das
                Drei-Ebenen-Modell aus Stressoren, persönlichen Verstärkern und Stressreaktion.{' '}
                <Link href="/ratgeber/was-ist-stress/" className="link">
                  Was ist Stress?
                </Link>
              </More>
            </Reveal>
            <Reveal delay={0.08} className="xl:col-span-7">
              <CheckList items={ARBEITSWEISE} className="space-y-[clamp(0.5rem,1.5svh,0.75rem)] text-[0.9375rem] md:text-[1.0625rem]" itemClassName="border-b border-line pb-[clamp(0.5rem,1.5svh,0.75rem)]" />
            </Reveal>
          </div>
        </section>

        {/* Abgrenzung als eigener kleiner Block, damit "Arbeitsweise" in einen Bildschirm passt */}
        <section aria-label="Abgrenzung zur Therapie" className="pb-[var(--sec-y)]">
          <div className="wrap">
            <Reveal>
                <div className="rounded-lg border border-line border-l-[3px] border-l-caramel-500 bg-caramel-50 px-4 py-4 md:px-5 md:py-5">
                  <p className="font-semibold text-espresso-900">Klar abgegrenzt</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink/85 md:text-base">
                    Meine Arbeit ist keine Psychotherapie und keine Heilbehandlung. Ich stelle keine Diagnosen und mache keine Heilversprechen.{' '}
                    <Link href="/ratgeber/stressberatung-coaching-oder-therapie/" className="link">
                      Unterschied zur Therapie
                    </Link>
                  </p>
                </div>
            </Reveal>
          </div>
        </section>

        <Process />

        <section aria-labelledby="lesen" className="sec-t pb-[calc(var(--sec-y)+var(--sheet-overlap))]">
          <div className="wrap">
            <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 id="lesen" className="t-h2 text-espresso-900">
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
      </Sheet>
    </>
  )
}
