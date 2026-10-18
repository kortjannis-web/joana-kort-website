import Link from 'next/link'
import { ArrowRight, BookOpen, Building2, Check, MonitorPlay, User, Users } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
import { Carousel } from '@/components/ui/Carousel'
import { ANGEBOTE } from '@/lib/content/angebote'
import { pageMeta } from '@/lib/seo'
import { ERSTGESPRAECH, SITE_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

const PATH = '/angebote/'

export const metadata = pageMeta({
  title: 'Angebote: Stresscoaching, Webinar, Schulungen | Joana Kort',
  description:
    'Alle Angebote von Joana Kort Stressberatung: persönliche Begleitung über 3 oder 6 Monate, zu zweit und in Gruppen, Online-Webinar, Online-Kurs, Schulungen für Unternehmen.',
  path: PATH,
})

const ICONS = { begleitung: User, 'zu-zweit': Users, webinar: MonitorPlay, kurs: BookOpen, unternehmen: Building2 } as const

/** Wer passt wohin: kurze Orientierung vor den Karten */
const WEGWEISER = [
  { frage: 'Sie möchten Ihren Stress persönlich und gründlich angehen?', ziel: 'Persönliche Begleitung', href: '/stresscoaching/' },
  { frage: 'Sie lernen gern in der Gruppe, mit festen Terminen?', ziel: 'Online-Webinar', href: '/webinar/' },
  { frage: 'Sie suchen etwas für Ihr Team oder Unternehmen?', ziel: 'Schulungen', href: '/stressmanagement-unternehmen/' },
]

type Angebot = (typeof ANGEBOTE)[number]

/** Angebotskarte: Hauptangebot groß und dunkel (ab Desktop mit Liste rechts), weitere Formate hell und kompakt */
function OfferCard({ a, main = false }: { a: Angebot; main?: boolean }) {
  const Icon = ICONS[a.key]
  const H = main ? 'h2' : 'h3'
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-xl',
        main
          ? 'grain floaty-lg overflow-hidden bg-espresso-800 p-6 text-white md:p-[clamp(1.5rem,5svh,2.5rem)] lg:flex-row lg:items-center lg:gap-12'
          : 'frame-soft floaty bg-white p-5 md:p-[clamp(1.25rem,3svh,1.75rem)]'
      )}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className={cn('grid h-11 w-11 place-items-center rounded-md', main ? 'bg-white/10 text-caramel-300' : 'bg-stone text-caramel-700')}>
            <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          </span>
          {main && <span className="rounded-full bg-caramel-300/15 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-caramel-200">Hauptangebot</span>}
          {a.status !== 'buchbar' && (
            <span className="rounded-full bg-caramel-50 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-caramel-700">
              {a.status === 'termine-folgen' ? 'Termine folgen' : 'In Vorbereitung'}
            </span>
          )}
        </div>
        <H
          className={cn(
            'mt-[clamp(0.75rem,2.5svh,1.25rem)] font-serif leading-[1.12] tracking-[-0.012em]',
            main ? 'text-[clamp(1.75rem,1.1rem+2.4svh,2.5rem)]' : 'text-[clamp(1.375rem,1rem+1.2svh,1.6rem)] text-espresso-900'
          )}
        >
          {a.title}
        </H>
        <p className={cn('mt-1.5 font-semibold', main ? 'text-caramel-200' : 'text-[0.9375rem] text-caramel-700')}>{a.hint}</p>
        <p className={cn('mt-[clamp(0.5rem,2svh,1rem)] max-w-[40rem] leading-relaxed', main ? 'text-espresso-100/90' : 'text-[0.9375rem] text-muted')}>{a.text}</p>
      </div>
      {main && (
        <ul className="mt-[clamp(1rem,3svh,1.5rem)] space-y-2 text-[0.9375rem] text-espresso-100/90 compact:hidden lg:mt-0 lg:w-[20rem]">
          {['Stressanalyse und Stresslandkarte', 'Persönlicher Unterstützungsplan', 'Methoden, Übungen, Materialien', 'Pläne für Ihren Alltag'].map((t) => (
            <li key={t} className="flex gap-2.5">
              <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-caramel-300" strokeWidth={2.5} aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      )}
      <Link
        href={a.path}
        className={cn(
          'mt-[clamp(0.75rem,2.5svh,1.5rem)] inline-flex min-h-11 items-center gap-1.5 self-start font-semibold underline underline-offset-[0.3em] transition-colors duration-500 after:absolute after:inset-0 after:rounded-[inherit]',
          main ? 'text-white decoration-caramel-300/60 hover:text-caramel-200 lg:mt-0 lg:self-auto' : 'text-espresso-800 decoration-caramel-500/60 hover:text-caramel-800'
        )}
      >
        Mehr erfahren
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
      </Link>
    </article>
  )
}

export default function AngebotePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Angebote von Joana Kort Stressberatung',
          itemListElement: ANGEBOTE.map((a, i) => ({ '@type': 'ListItem', position: i + 1, name: a.title, url: `${SITE_URL}${a.path}` })),
        }}
      />
      <PageHero
        tone="greige"
        eyebrow="Angebote"
        title={
          <>
            Unterstützung, die zu Ihrem <em>Leben</em> passt
          </>
        }
        intro={
          <p>
            Im Mittelpunkt steht die persönliche Begleitung. Dazu kommen Formate zu zweit, in der Gruppe, online und für Unternehmen. Welches
            passt, klären wir gern im kostenlosen Erstgespräch.
          </p>
        }
        actions={
          <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
            Kostenloses Erstgespräch
          </ButtonLink>
        }
      />

      <Sheet crumbs={[{ name: 'Angebote', path: PATH }]}>
        {/* Hauptangebot als eigene Section, die weiteren Formate darunter (je Section ein Bildschirm) */}
        <section aria-label="Hauptangebot" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
          <div className="wrap">
            <Reveal>
              <OfferCard a={ANGEBOTE[0]} main />
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="formate" className="sec bg-greige">
          <div className="wrap">
            <Reveal>
              <p className="t-label text-caramel-700">Weitere Formate</p>
              <h2 id="formate" className="t-h2 mt-3 text-espresso-900">
                Zu zweit, in der Gruppe, <em className="italic text-caramel-600">online</em> oder im Team
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
              <Carousel label="Weitere Formate" arrowLabel="Formate" item="80vw" gridFrom="xl" gridClass="xl:grid-cols-4 xl:gap-6">
                {ANGEBOTE.slice(1).map((a) => (
                  <OfferCard key={a.key} a={a} />
                ))}
              </Carousel>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="wegweiser" className="sec-t pb-[calc(var(--sec-y)+var(--sheet-overlap))]">
          <div className="wrap grid gap-[var(--sec-gap)] xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-4">
              <h2 id="wegweiser" className="t-h2 text-espresso-900">
                Was passt zu mir?
              </h2>
              <p className="mt-[clamp(0.5rem,2svh,1rem)] leading-relaxed text-muted">Eine kurze Orientierung. Und wenn Sie unsicher sind: Genau dafür ist das Erstgespräch da.</p>
              <ButtonLink href={ERSTGESPRAECH} variant="primary" className="mt-[clamp(0.75rem,2.5svh,1.5rem)] max-sm:w-full">
                Gemeinsam herausfinden
              </ButtonLink>
            </Reveal>
            <Reveal delay={0.08} className="xl:col-span-8">
              <ul className="border-t border-line">
                {WEGWEISER.map((w) => (
                  <li key={w.href}>
                    <Link href={w.href} className="group flex min-h-[clamp(3.5rem,8svh,4.5rem)] items-center justify-between gap-4 border-b border-line py-2.5 max-sm:flex-col max-sm:items-start max-sm:gap-1">
                      <span className="text-[0.9375rem] leading-snug text-ink/85 md:text-base">{w.frage}</span>
                      <span className="flex shrink-0 items-center gap-2 font-semibold text-espresso-900 transition-colors duration-500 group-hover:text-caramel-800">
                        {w.ziel}
                        <ArrowRight className="h-4 w-4 text-caramel-600 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      </Sheet>
    </>
  )
}
