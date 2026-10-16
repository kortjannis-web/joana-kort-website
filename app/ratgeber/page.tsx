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
        <section aria-label="Artikel" className="pb-28 pt-6 md:pb-36 md:pt-10 xl:pb-44 xl:pt-12">
          <div className="wrap flex flex-col gap-6 md:gap-8 xl:gap-10">
            {erster && (
              <Reveal>
                <ArticleCard a={erster} featured />
              </Reveal>
            )}
            {weitere.length > 0 && (
              <Reveal delay={0.08}>
                <Carousel
                  label="Weitere Artikel"
                  arrowLabel="Artikel"
                  item="86vw"
                  itemXl="auto"
                  gridFrom="md"
                  gridClass="md:grid-cols-2 md:gap-6 xl:gap-8"
                >
                  {weitere.map((a) => (
                    <ArticleCard key={a.slug} a={a} />
                  ))}
                </Carousel>
              </Reveal>
            )}
          </div>
        </section>
      </Sheet>
    </>
  )
}
