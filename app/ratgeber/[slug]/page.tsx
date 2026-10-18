import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { Rich } from '@/components/ui/Rich'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { ArticleBody } from '@/components/ratgeber/ArticleBody'
import { ArticleCard, fmtDatum } from '@/components/ratgeber/ArticleCard'
import { TocNav } from '@/components/ratgeber/TocNav'
import { ARTIKEL } from '@/lib/content/ratgeber'
import { articleSchema, faqSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { ROLE } from '@/lib/site'
import { MoreOffers } from '@/components/angebote/MoreOffers'

// Nur die bekannten Artikel (statisch vorgerendert), alles andere 404
export const dynamicParams = false

export function generateStaticParams() {
  return ARTIKEL.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = ARTIKEL.find((x) => x.slug === slug)
  if (!a) return {}
  return pageMeta({ title: a.metaTitle, description: a.metaDescription, path: `/ratgeber/${a.slug}/`, type: 'article' })
}

export default async function ArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = ARTIKEL.find((x) => x.slug === slug)
  if (!a) notFound()
  const toc = a.blocks.filter((b): b is Extract<typeof b, { type: 'h2' }> => b.type === 'h2')
  const weitere = ARTIKEL.filter((x) => x.slug !== a.slug)
  const path = `/ratgeber/${a.slug}/`

  return (
    <>
      <JsonLd data={[articleSchema(a), ...(a.faqs.length ? [faqSchema(a.faqs)] : [])]} />
      <PageHero
        eyebrow={`Ratgeber · ${a.category}`}
        title={a.title}
        intro={<p>{a.excerpt}</p>}
        actions={
          <ButtonLink href={a.cta.href} variant="primary" size="lg" className="w-full sm:w-auto">
            {a.cta.label}
          </ButtonLink>
        }
      />

      <Sheet
        crumbs={[
          { name: 'Ratgeber', path: '/ratgeber/' },
          { name: a.title, path },
        ]}
      >
        <article aria-labelledby="hero-title" className="pb-16 pt-6 md:pb-24 md:pt-10 xl:pb-28 xl:pt-12">
          <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-8 xl:grid-cols-12 xl:gap-x-16 xl:gap-y-10">
            {/* Autor + Kurzantwort (GEO) */}
            <div className="xl:col-span-8 xl:col-start-4 xl:row-start-1">
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-espresso-800 font-serif text-[1.05rem] text-caramel-200 ring-1 ring-caramel-400/80 ring-offset-2 ring-offset-paper">
                  JK
                </span>
                <p className="text-[0.875rem] leading-snug text-muted">
                  <Link
                    href="/joana-kort/"
                    className="font-semibold text-espresso-900 underline-offset-[0.2em] transition-colors duration-500 hover:text-caramel-800 hover:underline"
                  >
                    Joana Kort
                  </Link>
                  , {ROLE.short}
                  <br />
                  Veröffentlicht <time dateTime={a.published}>{fmtDatum(a.published)}</time> · {a.readingMinutes} Min. Lesezeit
                  {a.updated !== a.published && (
                    <>
                      {' '}
                      · Zuletzt aktualisiert <time dateTime={a.updated}>{fmtDatum(a.updated)}</time>
                    </>
                  )}
                </p>
              </div>
              <Reveal className="mt-6 max-w-[68ch] rounded-lg border border-espresso-100 bg-espresso-50 p-5 md:mt-8 md:p-7">
                <p className="t-label text-espresso-700">Kurz gesagt</p>
                <p className="mt-3 text-[1.0625rem] leading-[1.75] text-ink md:text-[1.125rem]">
                  <Rich text={a.answer} />
                </p>
              </Reveal>
            </div>

            {/* Inhaltsverzeichnis als Kapitel-Knöpfe: Handy/Tablet als umbrechende Reihe, ab Desktop links mitlaufend (TocNav hebt das aktuelle Kapitel hervor) */}
            <nav aria-labelledby="toc-title" className="xl:col-span-3 xl:col-start-1 xl:row-span-2 xl:row-start-1">
              <div className="xl:sticky xl:top-28">
                <p id="toc-title" className="t-label text-caramel-700">
                  Inhalt
                </p>
                <TocNav items={toc.map((h) => ({ id: h.id, text: h.text }))} />
              </div>
            </nav>

            <div className="max-w-[68ch] xl:col-span-8 xl:col-start-4 xl:row-start-2">
              <ArticleBody blocks={a.blocks} />

              <Reveal>
                <aside className="grain floaty-lg mt-14 overflow-hidden rounded-lg bg-espresso-800 p-6 text-white md:p-9">
                  <p className="font-serif text-[1.5rem] leading-[1.2] text-white md:text-[1.75rem]">{a.cta.title}</p>
                  <p className="mt-3 leading-relaxed text-espresso-200">{a.cta.text}</p>
                  <ButtonLink href={a.cta.href} className="mt-6 w-full sm:w-auto">
                    {a.cta.label} <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </ButtonLink>
                </aside>
              </Reveal>

              {a.faqs.length > 0 && (
                <section aria-labelledby="artikel-fragen" className="mt-16">
                  <Reveal>
                    <h2 id="artikel-fragen" className="mb-6 font-serif text-[clamp(1.5rem,1.3rem+0.7vw,1.875rem)] leading-[1.2] text-espresso-900">
                      Häufige Fragen
                    </h2>
                  </Reveal>
                  <FaqAccordion faqs={a.faqs} />
                </section>
              )}

              {a.sources.length > 0 && (
                <section aria-labelledby="quellen" className="mt-14">
                  <h2 id="quellen" className="text-[1.0625rem] font-semibold text-espresso-900">
                    Quellen
                  </h2>
                  <ul className="mt-3 space-y-1.5 text-[0.9375rem]">
                    {a.sources.map((s) => (
                      <li key={s.label}>
                        {s.url ? (
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="link break-words">
                            {s.label}
                          </a>
                        ) : (
                          <span className="text-ink/85">{s.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Autorenbox */}
              <Reveal className="mt-14">
                <div className="floaty flex gap-4 rounded-lg border border-line bg-white p-5 md:gap-5 md:p-7">
                  <span aria-hidden="true" className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-espresso-800 font-serif text-[1.15rem] text-caramel-200 ring-1 ring-caramel-400/80 ring-offset-2 ring-offset-white">
                    JK
                  </span>
                  <div>
                    <p className="font-semibold text-espresso-900">Über die Autorin</p>
                    <p className="mt-1 leading-relaxed text-muted">
                      Joana Kort begleitet Menschen dabei, ihren Stress zu verstehen, zu bewältigen und ihren Alltag zu entlasten, in Gummersbach
                      und online. {ROLE.background}.{' '}
                      <Link href="/joana-kort/" className="link">
                        Mehr über Joana Kort
                      </Link>
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </article>

        {weitere.length > 0 && (
          <section aria-labelledby="weitere" className="bg-greige sec">
            <div className="wrap">
              <Reveal>
                <h2 id="weitere" className="t-h2 text-espresso-900">
                  Weitere Artikel
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="mt-6 md:mt-8">
                {/* itemXl auto: im Raster füllt jede Karte ihre Spalte (sonst schrumpft sie ab Desktop auf ein Drittel) */}
                <Carousel
                  label="Weitere Artikel"
                  arrowLabel="Artikel"
                  item="86vw"
                  itemXl="auto"
                  gridFrom="md"
                  gridClass="md:grid-cols-2 md:gap-6 xl:gap-8"
                >
                  {weitere.map((w) => (
                    <ArticleCard key={w.slug} a={w} headingLevel={3} />
                  ))}
                </Carousel>
              </Reveal>
            </div>
          </section>
        )}
        <MoreOffers title="Wenn Sie Unterstützung möchten" />
      </Sheet>
    </>
  )
}
