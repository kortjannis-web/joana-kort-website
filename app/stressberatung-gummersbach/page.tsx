import Link from 'next/link'
import { Car, Handshake, Shuffle } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { Carousel } from '@/components/ui/Carousel'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { AreaMap } from '@/components/home/AreaMap'
import { Process } from '@/components/home/Process'
import { MoreOffers } from '@/components/angebote/MoreOffers'
import { GUMMERSBACH_FAQS } from '@/lib/content/faqs'
import { faqSchema, serviceSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { ERSTGESPRAECH, ORTE, site } from '@/lib/site'

const PATH = '/stressberatung-gummersbach/'

export const metadata = pageMeta({
  title: 'Stressberatung Gummersbach & Oberberg | Joana Kort',
  description:
    'Stressberatung und Stresscoaching in Gummersbach und Umgebung: Bergneustadt, Wiehl, Marienheide, Engelskirchen und mehr. Vor Ort oder online. Erstgespräch kostenlos.',
  path: PATH,
})

const VOR_ORT = [
  { title: 'Ort gemeinsam abstimmen', text: 'Wo wir uns treffen, klären wir zusammen, je nachdem, was für Sie angenehm ist.', Icon: Handshake },
  { title: 'Fahrtkosten transparent', text: `Im Umkreis von etwa ${site.radiusKm} km um ${site.address.city}. Die Fahrtkosten nenne ich Ihnen vorab.`, Icon: Car },
  { title: 'Vor Ort und online mischen', text: 'Viele kombinieren: das erste Treffen persönlich, die weiteren Sitzungen bequem per Video.', Icon: Shuffle },
]

export default function GummersbachPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Stressberatung und Stresscoaching in Gummersbach',
            description: `Persönliche Stressberatung vor Ort in ${site.address.city} und im Umkreis von etwa ${site.radiusKm} km sowie online.`,
            path: PATH,
          }),
          faqSchema(GUMMERSBACH_FAQS),
        ]}
      />
      <PageHero
        line="loop"
        eyebrow="Vor Ort im Oberbergischen"
        title={
          <>
            Stressberatung in <em>Gummersbach</em> und Umgebung
          </>
        }
        intro={
          <p>
            Persönlich begleitet, ganz in Ihrer Nähe: In {site.address.city} und im Umkreis von etwa {site.radiusKm} Kilometern treffen wir uns
            vor Ort. Wenn es für Sie einfacher ist, auch online.
          </p>
        }
        actions={
          <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
            Kostenloses Erstgespräch
          </ButtonLink>
        }
      />

      <Sheet crumbs={[{ name: 'Stressberatung Gummersbach', path: PATH }]}>
        <section aria-labelledby="region" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
          <div className="wrap grid gap-[var(--sec-gap)] md:grid-cols-12 md:items-center md:gap-x-10 xl:gap-x-16">
            <Reveal className="md:col-span-7 xl:col-span-6">
              <h2 id="region" className="t-h2 text-espresso-900">
                Stress im Alltag, hier im Oberbergischen
              </h2>
              <div className="t-lead mt-[clamp(0.75rem,2svh,1.25rem)] space-y-3 text-ink/85 max-md:text-[0.9375rem] max-md:leading-relaxed md:space-y-4">
                <p>
                  Pendeln über die A4, Schichtdienst, ein volles Familienleben, Studium oder Selbstständigkeit: Stress hat viele Gesichter. Als
                  Stressberaterin mit gesundheitspsychologischem Hintergrund begleite ich Sie dabei, Ihren Stress zu verstehen, passende Wege der
                  Bewältigung zu finden und Ihren Alltag spürbar zu entlasten.
                </p>
                <p>
                  Vor Ort bin ich in {site.address.city} und den umliegenden Orten für Sie da: {ORTE.slice(1).map((o) => o.name).join(', ')}.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5 xl:col-span-6">
              <div className="floaty relative mx-auto aspect-[13/12] max-h-[28svh] overflow-hidden rounded-xl bg-espresso-800 md:max-h-[calc(100svh-2*var(--sec-y))] max-md:aspect-auto max-md:h-[28svh]">
                <AreaMap />
              </div>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="vor-ort" className="bg-greige sec">
          <div className="wrap">
            <Reveal>
              <h2 id="vor-ort" className="t-h2 max-w-[24ch] text-espresso-900">
                So funktionieren Termine vor Ort
              </h2>
            </Reveal>
            <Carousel label="Termine vor Ort" arrowLabel="Punkte" item="80vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-6" className="mt-[var(--sec-gap)]">
              {VOR_ORT.map(({ title, text, Icon }) => (
                <div key={title} className="h-full">
                  <div className="floaty h-full rounded-lg border border-line bg-white p-5 md:p-[clamp(1.25rem,3svh,1.5rem)]">
                    <span className="grid h-11 w-11 place-items-center rounded-md bg-stone text-caramel-700">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <h3 className="mt-[clamp(0.75rem,2svh,1rem)] font-serif text-[1.3rem] text-espresso-900">{title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted md:text-base">{text}</p>
                  </div>
                </div>
              ))}
            </Carousel>
            <Reveal className="mt-[var(--sec-gap)] grid gap-2 md:grid-cols-3 md:gap-3">
              {[
                { href: '/stresscoaching/', t: 'Persönliche Begleitung vor Ort' },
                { href: '/zu-zweit-und-in-der-gruppe/', t: 'Zu zweit oder in der Gruppe' },
                { href: '/stressmanagement-unternehmen/', t: 'Schulungen für Unternehmen im Oberbergischen' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="group flex min-h-12 items-center justify-between gap-3 rounded-md bg-white px-4 text-[0.9375rem] font-semibold md:min-h-14 md:px-5 md:text-base text-espresso-900 transition-colors hover:text-caramel-800">
                  {l.t}
                </Link>
              ))}
            </Reveal>
          </div>
        </section>

        <Process tone="paper" />

        <section aria-labelledby="gm-fragen" className="bg-stone sec">
          <div className="wrap grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
            <Reveal className="lg:col-span-5 xl:col-span-4">
              <h2 id="gm-fragen" className="t-h2 text-espresso-900">
                Fragen zur Stressberatung in {site.address.city}
              </h2>
            </Reveal>
            <div className="lg:col-span-7 xl:col-span-8">
              <FaqAccordion faqs={GUMMERSBACH_FAQS} />
            </div>
          </div>
        </section>

        <MoreOffers title="Angebote vor Ort und online" />
      </Sheet>
    </>
  )
}
