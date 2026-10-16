import Link from 'next/link'
import { CalendarCheck, Mail } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink, buttonClass } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { FAQS, FAQ_GRUPPEN } from '@/lib/content/faqs'
import { faqSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { CONTENT_UPDATED, ERSTGESPRAECH, site } from '@/lib/site'

const PATH = '/haeufige-fragen/'

export const metadata = pageMeta({
  title: 'Häufige Fragen zu Stressberatung & Stresscoaching | Joana Kort',
  description:
    'Antworten zu Stressberatung und Stresscoaching: Ablauf, Dauer, Kosten, Krankenkasse, Unterschied zur Therapie, online oder vor Ort in Gummersbach.',
  path: PATH,
})

export default function FaqPage() {
  const updated = new Date(CONTENT_UPDATED).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <PageHero
        tone="mocha"
        eyebrow="Häufige Fragen"
        title={
          <>
            Häufige Fragen zu <em>Stressberatung</em> und Stresscoaching
          </>
        }
        intro={<p>Kurz und ehrlich beantwortet. Ihre Frage ist nicht dabei? Schreiben Sie mir oder fragen Sie im kostenlosen Erstgespräch.</p>}
        actions={
          <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
            Kostenloses Erstgespräch
          </ButtonLink>
        }
      />

      <Sheet crumbs={[{ name: 'Häufige Fragen', path: PATH }]}>
        <section aria-label="Fragen und Antworten" className="pb-28 pt-6 md:pb-36 md:pt-10 xl:pb-44 xl:pt-12">
          <div className="wrap grid items-start gap-10 xl:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] xl:gap-[4.5rem]">
            <div className="flex flex-col gap-12 md:gap-16">
              <nav aria-label="Themen" className="flex flex-wrap gap-2">
                {FAQ_GRUPPEN.map((g) => (
                  <a key={g.id} href={`#${g.id}`} className="rounded-full border border-line bg-white px-4 py-2 text-[0.9375rem] font-medium text-espresso-900 transition-colors hover:border-terra-400 hover:text-terra-700">
                    {g.title}
                  </a>
                ))}
              </nav>
              {FAQ_GRUPPEN.map((g, i) => (
                <div key={g.id} id={g.id} className="scroll-mt-28">
                  <Reveal>
                    <h2 className="mb-4 font-serif text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] leading-tight text-espresso-900">{g.title}</h2>
                  </Reveal>
                  <FaqAccordion faqs={g.faqs} openFirst={i === 0} />
                </div>
              ))}
            </div>

            <aside aria-label="Weitere Fragen" className="flex flex-col gap-5 xl:sticky xl:top-28">
              <Reveal delay={0.1}>
                <div className="grain glow-hover floaty flex flex-col gap-3.5 overflow-hidden rounded-lg bg-espresso-800 p-6 text-white xl:p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-terra-300/15 text-terra-300">
                    <span className="glow-icon">
                      <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </span>
                  <p className="font-serif text-[1.5rem] leading-[1.2] xl:text-[1.625rem]">Ihre Frage ist nicht dabei?</p>
                  <p className="text-[0.9375rem] leading-relaxed text-espresso-200 md:text-base">Schreiben Sie mir, ich antworte persönlich.</p>
                  <a href={`mailto:${site.email}`} className={buttonClass('light', 'md', 'min-h-13 w-full break-all xl:w-auto xl:self-start')}>
                    E-Mail schreiben
                  </a>
                  <Link href={ERSTGESPRAECH} className="text-[0.9375rem] font-semibold text-white underline decoration-terra-300/60 underline-offset-4 hover:text-terra-200">
                    Oder im Erstgespräch fragen
                  </Link>
                </div>
              </Reveal>
              <p className="flex items-center gap-2.5 text-[0.8125rem] text-muted md:text-[0.875rem]">
                <CalendarCheck className="h-4 w-4 shrink-0 text-caramel-700" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  Zuletzt aktualisiert: <time dateTime={CONTENT_UPDATED}>{updated}</time>
                </span>
              </p>
            </aside>
          </div>
        </section>
      </Sheet>
    </>
  )
}
