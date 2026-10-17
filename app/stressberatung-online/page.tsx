import { CalendarClock, Home, Route } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { Carousel } from '@/components/ui/Carousel'
import { CheckList } from '@/components/lists/CheckList'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { Process } from '@/components/home/Process'
import { PaperStack } from '@/components/ui/PaperStack'
import { MoreOffers } from '@/components/angebote/MoreOffers'
import { ONLINE_FAQS } from '@/lib/content/faqs'
import { faqSchema, serviceSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { ERSTGESPRAECH } from '@/lib/site'

const PATH = '/stressberatung-online/'

export const metadata = pageMeta({
  title: 'Stressberatung online & Stresscoaching per Video | Joana Kort',
  description:
    'Stressberatung online: persönliches Stresscoaching per Video, deutschlandweit. Ohne Anfahrt, flexibel und mit Materialien zum Ausdrucken. Erstgespräch kostenlos.',
  path: PATH,
})

const VORTEILE = [
  { title: 'Kein Anfahrtsweg', text: 'Kein zusätzlicher Termin außer Haus. Gerade wenn der Kalender voll ist, macht das den Unterschied.', Icon: Route },
  { title: 'In vertrauter Umgebung', text: 'Sie sprechen von zu Hause oder einem ruhigen Ort, an dem Sie sich wohlfühlen.', Icon: Home },
  { title: 'Flexibel planbar', text: 'Termine passen leichter in Ihren Alltag, auch abends. Pläne und Vorlagen bekommen Sie digital.', Icon: CalendarClock },
]

export default function OnlinePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: 'Stressberatung online', description: 'Persönliche Stressberatung und Stresscoaching per Video, deutschlandweit.', path: PATH }),
          faqSchema(ONLINE_FAQS),
        ]}
      />
      <PageHero
        tone="greige"
        eyebrow="Online per Video"
        title={
          <>
            Stressberatung <em>online</em>, persönlich wie vor Ort
          </>
        }
        intro={
          <p>
            Dieselbe strukturierte Begleitung, nur per Video. Ganz gleich, wo Sie wohnen, und ohne zusätzlichen Weg in einem ohnehin vollen
            Alltag.
          </p>
        }
        actions={
          <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
            Kostenloses Erstgespräch
          </ButtonLink>
        }
        aside={<PaperStack layout="planer" priority className="mx-auto w-[88%]" />}
      />

      <Sheet crumbs={[{ name: 'Stressberatung online', path: PATH }]}>
        <section aria-labelledby="vorteile" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
          <div className="wrap">
            <Reveal>
              <h2 id="vorteile" className="t-h2 max-w-[24ch] text-espresso-900">
                Warum viele die Begleitung online wählen
              </h2>
            </Reveal>
            <Carousel label="Vorteile" arrowLabel="Vorteile" item="80vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-4 xl:gap-6" className="mt-[var(--sec-gap)]">
              {VORTEILE.map(({ title, text, Icon }) => (
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
          </div>
        </section>

        <section aria-labelledby="technik" className="bg-greige sec">
          <div className="wrap grid gap-[var(--sec-gap)] xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-5">
              <h2 id="technik" className="t-h2 text-espresso-900">
                Was Sie brauchen
              </h2>
              <p className="mt-4 leading-relaxed text-muted">Wenig Technik, kein eigenes Konto nötig. Den Link zur Sitzung bekommen Sie vorab per E-Mail.</p>
            </Reveal>
            <Reveal delay={0.08} className="xl:col-span-7">
              <CheckList
                items={[
                  'Computer, Tablet oder Smartphone mit Kamera und Mikrofon',
                  'Eine stabile Internetverbindung',
                  'Einen ruhigen Ort, an dem Sie ungestört sprechen können',
                  'Optional: einen Drucker für Materialien wie das Stresstagebuch',
                ]}
                className="text-[1.0625rem]"
              />
            </Reveal>
          </div>
        </section>

        <Process tone="paper" />

        <section aria-labelledby="on-fragen" className="bg-stone sec">
          <div className="wrap grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
            <Reveal className="lg:col-span-5 xl:col-span-4">
              <h2 id="on-fragen" className="t-h2 text-espresso-900">
                Fragen zur Online-Begleitung
              </h2>
            </Reveal>
            <div className="lg:col-span-7 xl:col-span-8">
              <FaqAccordion faqs={ONLINE_FAQS} />
            </div>
          </div>
        </section>

        <MoreOffers title="Auch online verfügbar" />
      </Sheet>
    </>
  )
}
