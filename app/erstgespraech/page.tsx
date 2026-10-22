import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { ErstgespraechFunnel } from '@/components/funnel/ErstgespraechFunnel'
import { KontaktForm } from '@/components/forms/KontaktForm'
import { RueckrufButton } from '@/components/forms/RueckrufDialog'
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
  { t: 'Drei Fragen beantworten', d: 'Drei Klicks und Ihr Name mit Telefon oder E-Mail, etwa eine Minute. Angaben zu Ihrer Gesundheit brauche ich nicht.' },
  { t: 'Ich melde mich', d: 'Persönlich, per Rückruf oder E-Mail, in der Regel am nächsten Werktag. Wir finden einen Termin, der Ihnen passt.' },
  { t: '15 Minuten sprechen', d: 'Am Telefon oder per Video. Danach entscheiden Sie in Ruhe und ohne Druck, ob wir zusammenarbeiten.' },
]

const FAQS = [FAQ_ABLAUF[0], FAQ_ABLAUF[3], FAQ_FORMAT[4]]

/** Kontaktwege: Handy/Tablet untereinander neben dem Ablauf, ab Desktop drei Spalten */
const ITEM = 'flex flex-col gap-1 border-b border-line pb-[clamp(0.5rem,2svh,1.25rem)] xl:border-b-0 xl:pb-0'
const LABEL = 'flex items-center gap-2.5 text-caramel-700'

/** So läuft es ab (drei Schritte): ab Desktop neben dem Fragebogen, auf Handy/Tablet in der folgenden Section */
function Ablauf() {
  return (
    <Reveal>
      <h2 className="t-h2 text-espresso-900">So läuft es ab</h2>
      <ol className="mt-[clamp(0.75rem,2.5svh,1.5rem)] border-t border-line">
        {ABLAUF.map((a, i) => (
          <li key={a.t} className="flex gap-4 border-b border-line py-[clamp(0.625rem,1.8svh,1rem)]">
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
  )
}

export default function ErstgespraechPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQS)} />
      <PageHero
        line="spiral"
        eyebrow="Kostenloses Erstgespräch"
        title={
          <>
            Ihr erster Schritt dauert <em>15 Minuten</em>
          </>
        }
        intro={
          <p>
            Wir lernen uns kennen, Sie stellen Ihre Fragen, und wir klären gemeinsam, welches Angebot zu Ihrer Situation passt. Kostenlos und
            unverbindlich. Ich rufe Sie zurück oder schreibe Ihnen, ganz wie Sie möchten.
          </p>
        }
      />

      <Sheet crumbs={[{ name: 'Erstgespräch', path: PATH }]}>
        {/* Anfrage: Fragebogen (ab Desktop rechts), links der Ablauf. Handy/Tablet: nur der Fragebogen, Ablauf folgt in der nächsten Section */}
        <section aria-label="Erstgespräch anfragen" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
          <div className="wrap grid items-center gap-[var(--sec-gap)] xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:gap-16">
            <div id="anfrage" className="mx-auto w-full max-w-[36rem] scroll-mt-24 xl:order-2 xl:max-w-none">
              <ErstgespraechFunnel variant="hero" idPrefix="jke" />
            </div>
            <div className="hidden xl:order-1 xl:block">
              <Ablauf />
            </div>
          </div>
        </section>

        <section aria-label="So läuft es ab und weitere Wege" className="sec bg-greige">
          <div className="wrap grid gap-[var(--sec-gap)] md:grid-cols-2 md:gap-x-12 xl:grid-cols-1">
            <div className="xl:hidden">
              <Ablauf />
            </div>
            {/* Drei weitere Wege: Rückruf, schreiben, wo (3er-Gruppe) */}
            <Reveal delay={0.08} className="grid content-center gap-[clamp(0.5rem,2svh,1.25rem)] xl:grid-cols-3 xl:gap-8">
              <div className={ITEM}>
                <p className={LABEL}>
                  <Phone className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden="true" />
                  <span className="t-label text-[0.75rem]">Lieber zurückgerufen werden?</span>
                </p>
                <RueckrufButton className="link self-start text-left text-[1.0625rem] font-semibold">Rückruf anfordern</RueckrufButton>
              </div>
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
        </section>

        <section id="kontaktformular" aria-labelledby="kf-title" className="sec scroll-mt-24">
          <div className="wrap grid items-start gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
            <Reveal className="lg:col-span-5">
              <p className="t-label text-caramel-700">Kontaktformular</p>
              <h2 id="kf-title" className="t-h2 mt-3 text-espresso-900">
                Eine Frage vorab?
              </h2>
              <p className="t-lead mt-[clamp(0.5rem,1.5svh,1rem)] text-muted max-md:hidden">
                Schreiben Sie mir gern, auch wenn Sie noch nicht wissen, ob ein Erstgespräch das Richtige ist. Ich antworte persönlich.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7">
              <KontaktForm />
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="eg-fragen" className="sec-t pb-[calc(var(--sec-y)+var(--sheet-overlap))]">
          <div className="wrap grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
            <Reveal className="lg:col-span-5 xl:col-span-4">
              <h2 id="eg-fragen" className="t-h2 text-espresso-900">
                Gut zu wissen
              </h2>
              <Link href="/haeufige-fragen/" className="link mt-[clamp(0.5rem,2svh,1.25rem)] inline-block font-semibold">
                Alle Fragen und Antworten
              </Link>
            </Reveal>
            <div className="lg:col-span-7 xl:col-span-8">
              <FaqAccordion faqs={FAQS} />
            </div>
          </div>
        </section>
      </Sheet>
    </>
  )
}
