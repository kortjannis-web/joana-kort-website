import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { ArticleCard } from '@/components/ratgeber/ArticleCard'
import { ARTIKEL } from '@/lib/content/ratgeber'
import { pageMeta } from '@/lib/seo'
import { ERSTGESPRAECH, SITE_URL } from '@/lib/site'

const PATH = '/ratgeber/'

export const metadata = pageMeta({
  title: 'Ratgeber Stress: verstehen, bewältigen, managen | Joana Kort',
  description:
    'Ratgeber zu Stress: Was ist Stress, wie erkenne ich ihn, was hilft akut, wie gelingt Stressmanagement im Alltag? Verständlich erklärt von Joana Kort.',
  path: PATH,
})

export default function RatgeberPage() {
  const artikel = [...ARTIKEL].sort((a, b) => b.published.localeCompare(a.published))
  const [erster, ...weitere] = artikel
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Ratgeber von Joana Kort Stressberatung',
          url: `${SITE_URL}${PATH}`,
          blogPost: artikel.map((a) => ({ '@type': 'BlogPosting', headline: a.title, url: `${SITE_URL}/ratgeber/${a.slug}/`, datePublished: a.published })),
        }}
      />
      <PageHero
        line="arcs"
        eyebrow="Ratgeber"
        title={
          <>
            Stress <em>verstehen</em>, bewältigen und managen
          </>
        }
        intro={<p>Verständliche Antworten auf die Fragen rund um Stress. Ohne Fachchinesisch, mit Quellen und mit Ideen für Ihren Alltag.</p>}
        actions={
          <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
            Kostenloses Erstgespräch
          </ButtonLink>
        }
      />

      <Sheet crumbs={[{ name: 'Ratgeber', path: PATH }]}>
        {/* Neuester Artikel groß, die weiteren als Reihe zum Blättern (je Section ein Bildschirm) */}
        {erster && (
          <section aria-label="Neuester Artikel" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
            <div className="wrap">
              <Reveal>
                <ArticleCard a={erster} featured />
              </Reveal>
            </div>
          </section>
        )}
        {weitere.length > 0 && (
          <section aria-labelledby="weitere-artikel" className="bg-stone sec-t pb-[calc(var(--sec-y)+var(--sheet-overlap))]">
            <div className="wrap">
              <Reveal>
                <h2 id="weitere-artikel" className="t-h2 text-espresso-900">
                  Weitere Artikel
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
                <Carousel label="Weitere Artikel" arrowLabel="Artikel" item="84vw" itemMd="calc((100% - 1.25rem) / 2)" itemXl="calc((100% - 3rem) / 3)">
                  {weitere.map((a) => (
                    <ArticleCard key={a.slug} a={a} headingLevel={3} />
                  ))}
                </Carousel>
              </Reveal>
            </div>
          </section>
        )}
      </Sheet>
    </>
  )
}
