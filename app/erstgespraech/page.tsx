import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { ErstgespraechFunnel } from '@/components/funnel/ErstgespraechFunnel'
import { FaqAccordion } from '@/components/faq/FaqAccordion'
import { FAQ_ABLAUF, FAQ_FORMAT } from '@/lib/content/faqs'
import { faqSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'

const PATH = '/erstgespraech/'

export const metadata = pageMeta({
  title: 'Kostenloses Erstgespräch vereinbaren | Joana Kort Stressberatung',
  description:
    'Kostenloses Erstgespräch (15 Minuten, Telefon oder Video): Wir lernen uns kennen und klären, welches Angebot zu Ihnen passt. Unverbindlich. Kontakt per E-Mail.',
  path: PATH,
})

/** Drei Schritte bis zum Gespräch (3er-Gruppe) */
const ABLAUF = [
  { t: 'Fragebogen ausfüllen', d: 'Vier kurze Schritte, etwa zwei Minuten. Angaben zu Ihrer Gesundheit brauche ich nicht.' },
  { t: 'Termin vereinbaren', d: 'Ich melde mich persönlich und schlage Ihnen einen Termin vor, der zu Ihren Zeiten passt.' },
  { t: '15 Minuten sprechen', d: 'Am Telefon oder per Video. Danach entscheiden Sie in Ruhe und ohne Druck, ob wir zusammenarbeiten.' },
]

const FAQS = [FAQ_ABLAUF[0], FAQ_ABLAUF[3], FAQ_FORMAT[4]]

/** Kontaktwege: Handy/Tablet drei Spalten, ab Desktop (schmale Spalte) als Zeilen */
const ITEM = 'flex flex-col gap-2 xl:flex-row xl:items-center xl:gap-4 xl:border-b xl:border-line xl:py-3.5'
const LABEL = 'flex items-center gap-2.5 text-caramel-700 xl:w-48 xl:shrink-0'

export default function ErstgespraechPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <PageHero
        eyebrow="Kostenloses Erstgespräch"
        title={
          <>
            Ihr erster Schritt dauert <em>15 Minuten</em>
          </>
        }
        intro={
          <p>
            Wir lernen uns kennen, Sie stellen Ihre Fragen, und wir klären gemeinsam, welches Angebot zu Ihrer Situation passt. Kostenlos und
            unverbindlich, am Telefon oder per Video.
          </p>
        }
      />

      <Sheet crumbs={[{ name: 'Erstgespräch', path: PATH }]}>
        <section aria-label="Erstgespräch anfragen" className="pb-16 pt-6 md:pb-24 md:pt-10 xl:pb-28 xl:pt-12">
          <div className="wrap grid items-start gap-10 md:gap-12 xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:gap-16">
            <div id="anfrage" className="scroll-mt-24 xl:order-2">
              <ErstgespraechFunnel variant="hero" idPrefix="jke" />
            </div>

            <div className="flex flex-col gap-10 xl:order-1">
              <Reveal>
                <h2 className="t-h2 text-espresso-900">So läuft es ab</h2>
                <ol className="mt-6 border-t border-line">
                  {ABLAUF.map((a, i) => (
                    <li key={a.t} className="flex gap-4 border-b border-line py-4">
                      <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-caramel-50 font-serif text-[1.2rem] italic text-caramel-700">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-semibold text-espresso-900">{a.t}</span>
                        <span className="mt-0.5 block text-[0.9375rem] leading-snug text-muted">{a.d}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              {/* Drei weitere Wege: anrufen, schreiben, wo (3er-Gruppe) */}
              <Reveal delay={0.08} className="grid gap-5 sm:grid-cols-3 xl:grid-cols-1 xl:gap-0">
                {site.phone && (
                  <div className={ITEM}>
                    <p className={LABEL}>
                      <Phone className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden="true" />
                      <span className="t-label text-[0.75rem]">Lieber anrufen?</span>
                    </p>
                    <a href={site.phone.href} className="link whitespace-nowrap text-[1.0625rem] font-semibold">
                      {site.phone.display}
                    </a>
                  </div>
                )}
                <div className={ITEM}>
                  <p className={LABEL}>
                    <Mail className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden="true" />
                    <span className="t-label text-[0.75rem]">Lieber schreiben?</span>
                  </p>
                  <a href={`mailto:${site.email}`} className="link break-all text-[1.0625rem] font-semibold">
                    {site.email}
                  </a>
                </div>
                <div className={ITEM}>
                  <p className={LABEL}>
                    <MapPin className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden="true" />
                    <span className="t-label text-[0.75rem]">Wo wir sprechen</span>
                  </p>
                  <p className="flex flex-col gap-1 text-[1.0625rem] text-ink">
                    <Link href="/stressberatung-gummersbach/" className="link self-start">
                      Vor Ort in {site.address.city}
                    </Link>
                    <Link href="/stressberatung-online/" className="link self-start">
                      Online per Video
                    </Link>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section aria-labelledby="eg-fragen" className="bg-stone pb-28 pt-14 md:pb-36 md:pt-20 xl:pb-44">
          <div className="wrap grid gap-8 xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-4">
              <h2 id="eg-fragen" className="t-h2 text-espresso-900">
                Gut zu wissen
              </h2>
              <Link href="/haeufige-fragen/" className="link mt-5 inline-block font-semibold">
                Alle Fragen und Antworten
              </Link>
            </Reveal>
            <div className="xl:col-span-8">
              <FaqAccordion faqs={FAQS} />
            </div>
          </div>
        </section>
      </Sheet>
    </>
  )
}
