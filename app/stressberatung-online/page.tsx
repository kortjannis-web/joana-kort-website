import { CalendarClock, FileText, Home, Route } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
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
  { title: 'Flexibel planbar', text: 'Termine lassen sich leichter in Ihren Alltag einfügen, auch abends.', Icon: CalendarClock },
  { title: 'Materialien digital', text: 'Pläne und Vorlagen bekommen Sie per E-Mail, zum Ausdrucken oder Ausfüllen am Bildschirm.', Icon: FileText },
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
        tone="mocha"
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
        <section aria-labelledby="vorteile" className="pb-16 pt-8 md:pb-24 md:pt-12">
          <div className="wrap">
            <Reveal>
              <h2 id="vorteile" className="t-h2 max-w-[24ch] text-espresso-900">
                Warum viele die Begleitung online wählen
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
              {VORTEILE.map(({ title, text, Icon }, i) => (
                <Reveal key={title} delay={i * 0.05}>
                  <div className="floaty h-full rounded-lg border border-line bg-white p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-md bg-stone text-caramel-700">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-serif text-[1.3rem] text-espresso-900">{title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="technik" className="bg-greige py-16 md:py-24">
          <div className="wrap grid gap-8 xl:grid-cols-12 xl:gap-16">
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

        <section aria-labelledby="on-fragen" className="bg-stone py-16 md:py-24">
          <div className="wrap grid gap-8 xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-4">
              <h2 id="on-fragen" className="t-h2 text-espresso-900">
                Fragen zur Online-Begleitung
              </h2>
            </Reveal>
            <div className="xl:col-span-8">
              <FaqAccordion faqs={ONLINE_FAQS} openFirst />
            </div>
          </div>
        </section>

        <MoreOffers title="Auch online verfügbar" />
      </Sheet>
    </>
  )
}
