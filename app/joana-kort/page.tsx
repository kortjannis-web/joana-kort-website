import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { CtaRow } from '@/components/ui/CtaRow'
import { More } from '@/components/ui/More'
import { PortraitFrame } from '@/components/home/PortraitFrame'
import { Reviews } from '@/components/home/Reviews'
import { Staerken } from '@/components/ueber-mich/Staerken'
import { PERSON_ID } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { CTA_LABEL, ERSTGESPRAECH, ROLE, SITE_URL, site } from '@/lib/site'

const PATH = '/joana-kort/'

export const metadata = pageMeta({
  title: 'Joana Kort | Stressberatung mit gesundheitspsychologischem Hintergrund',
  description:
    'Joana Kort, Stressberatung in Gummersbach und online: Gesundheitspsychologie, eigene Erfahrung mit Stress und Migräne, Mutter und Studentin. Persönlich und strukturiert.',
  path: PATH,
})

export default function UeberMichPage() {
  const fakten = [
    ['Name', site.owner],
    ['Fachlicher Hintergrund', ROLE.background],
    ['Schwerpunkt', 'Stress: verstehen, bewältigen, managen'],
    ['Angebot', 'Stressberatung und Stresscoaching, Schulungen, Webinare'],
    ['Vor Ort', `${site.address.city} und Umgebung, etwa ${site.radiusKm} km`],
    ['Online', 'Deutschlandweit per Video'],
  ]
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ProfilePage', url: `${SITE_URL}${PATH}`, mainEntity: { '@id': PERSON_ID } }} />
      <PageHero
        tone="greige"
        eyebrow="Über mich"
        title={
          <>
            Joana Kort: persönlich, strukturiert, auf <em>Augenhöhe</em>
          </>
        }
        intro={<p>Sie vertrauen mir einen Einblick in Ihr Leben an. Deshalb sollen Sie wissen, wer ich bin, was mich geprägt hat und wie ich arbeite.</p>}
        actions={
          <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
            {CTA_LABEL}
          </ButtonLink>
        }
      />

      <Sheet crumbs={[{ name: 'Über mich', path: PATH }]}>
        {/* Vorstellung: Porträt (Höhe am Viewport bemessen) und ein Satz, wofür ich da bin */}
        <section aria-label="Vorstellung" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
          <div className="wrap">
            <div className="grid gap-[var(--sec-gap)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-12 xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] xl:gap-[5.5rem]">
              <Reveal className="mx-auto w-[min(70%,calc(40svh*0.8))] md:w-full md:max-w-[calc((100svh-2*var(--sec-y)-3rem)*0.8)]">
                <PortraitFrame />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-serif text-[clamp(1.25rem,0.9rem+1.6svh,1.4375rem)] leading-[1.35] text-espresso-900 md:text-[clamp(1.5rem,1rem+1.8svh,1.75rem)] xl:text-[clamp(1.75rem,1rem+2.6svh,2.05rem)] xl:leading-[1.3]">
                  Ich bin Joana Kort. Ich begleite Menschen dabei, ihren Stress zu verstehen, passende Wege der Bewältigung zu finden und ihren
                  Alltag so zu gestalten, dass sie wieder <em className="italic text-caramel-600">durchatmen</em> können.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section aria-labelledby="geschichte" className="sec bg-stone">
          <div className="wrap">
            <div className="grid gap-[var(--sec-gap)] xl:grid-cols-12 xl:gap-16">
              <Reveal className="xl:col-span-4">
                <h2 id="geschichte" className="t-h2 text-espresso-900">
                  Warum ich mich auf Stress spezialisiere
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="prose-jk max-md:text-[0.9375rem] max-md:leading-relaxed xl:col-span-8">
                {/* PRÜFEN: Joana entscheidet, wie viel sie zur Migräne öffentlich erzählt (Briefing: selbst bestimmen). Keine Angaben zum Grad der Behinderung. */}
                <p>
                  Seit meiner Kindheit habe ich Migräne. Über viele Jahre hat sie meinen Alltag geprägt, mit Attacken, die manchmal mehrere Tage
                  dauerten. Immer wieder hörte ich von Ärztinnen und Ärzten, dass Stress dabei eine Rolle spielt und ich ihn reduzieren sollte.
                </p>
                <p>
                  Die Information hatte ich. Was mir fehlte, war jemand, der mit mir Schritt für Schritt schaut, wie mein Stress entsteht und wie
                  ich ihn konkret abbauen kann. Genau diese Lücke zwischen Wissen und Umsetzung erlebe ich heute bei vielen Menschen. Und genau dort
                  möchte ich ansetzen.
                </p>
                <More label="Meine Geschichte weiterlesen" showLabel className="mt-2" bodyClassName="prose-jk">
                <p>
                  Ich studiere Gesundheitspsychologie und spezialisiere mich beruflich auf das Thema Stress. Während des Studiums bin ich Mutter
                  geworden. Seitdem jongliere ich selbst mit vielen Verantwortlichkeiten und habe mich intensiv damit beschäftigt, wie ich meinen
                  Alltag effizienter und stressärmer gestalte: Zeitmanagement, Prioritäten, Haushalt, Studium. Die Strategien, die ich entwickelt
                  habe, setze ich selbst um, und ich gebe sie gern weiter.
                </p>
                <p>
                  Mein Angebot verbindet beides: fachliche Erkenntnisse aus der Gesundheitspsychologie und praktische Erfahrung aus dem echten
                  Leben. Mehr dazu unter <Link href="/mein-ansatz/">Mein Ansatz</Link>.
                </p>
                </More>
              </Reveal>
            </div>
          </div>
        </section>

        <Staerken />

        <section aria-labelledby="fakten-title" className="sec">
          <div className="wrap grid gap-[var(--sec-gap)] xl:grid-cols-[22rem_minmax(0,1fr)] xl:gap-x-20">
            <Reveal>
              <p className="t-label text-bordeaux">Auf einen Blick</p>
              <h2 id="fakten-title" className="t-h2 mt-3 text-espresso-900 xl:mt-4">
                Fakten
              </h2>
              <p className="mt-[clamp(0.5rem,2svh,1rem)] max-w-[30rem] text-[0.9375rem] leading-relaxed text-muted md:text-[1.0625rem]">Transparent und überprüfbar, auch was meinen Studienstand angeht.</p>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="grid gap-x-12 md:grid-cols-2">
                {fakten.map(([k, v]) => (
                  <li key={k} className="flex gap-4 border-b border-line py-[clamp(0.5rem,1.6svh,1.25rem)]">
                    <span aria-hidden="true" className="mt-[0.5rem] h-2 w-2 shrink-0 rotate-45 rounded-[2px] bg-caramel-500" />
                    <span className="flex flex-col gap-1">
                      <span className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-caramel-700">{k}</span>
                      <span className="text-[0.9375rem] font-medium leading-snug text-espresso-900 md:text-base md:leading-relaxed">{v}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <Reviews title="Wie andere die Zusammenarbeit erleben" />

        <section aria-label="Weiter" className="sec-t pb-[calc(var(--sec-y)+var(--sheet-overlap))]">
          <div className="wrap">
            <Reveal className="mb-[var(--sec-gap)]">
              <h2 className="t-h2 max-w-[22ch] text-espresso-900">Lernen wir uns in 15 Minuten kennen</h2>
              <CtaRow className="mt-[clamp(0.75rem,2.5svh,1.5rem)]" />
            </Reveal>
            <Reveal className="floaty grid gap-2 rounded-xl border border-line bg-stone p-3 md:grid-cols-3 md:gap-4 md:p-[clamp(1.25rem,3svh,2rem)]">
              {[
                { href: '/stresscoaching/', t: 'Persönliche Begleitung', d: 'Mein Hauptangebot über 3 oder 6 Monate' },
                { href: '/mein-ansatz/', t: 'Mein Ansatz', d: 'Verstehen, bewältigen, managen' },
                { href: '/stress-verstehen/', t: 'Stress verstehen', d: 'Wie Stress entsteht, einfach erklärt' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="group rounded-lg bg-white px-4 py-3 transition-transform duration-500 hover:-translate-y-1 md:p-5">
                  <span className="block font-serif text-[1.2rem] text-espresso-900 group-hover:text-bordeaux md:text-[1.3rem]">{l.t}</span>
                  <span className="mt-0.5 block text-[0.875rem] text-muted md:mt-1 md:text-[0.9375rem]">{l.d}</span>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      </Sheet>
    </>
  )
}
