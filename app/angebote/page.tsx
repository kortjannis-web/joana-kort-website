import Link from 'next/link'
import { ArrowRight, BookOpen, Building2, Check, MonitorPlay, User, Users } from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { JsonLd } from '@/components/ui/JsonLd'
import { Reveal } from '@/components/ui/Reveal'
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
        <section aria-label="Alle Angebote" className="pb-16 pt-8 md:pb-24 md:pt-12">
          <div className="wrap grid gap-5 md:grid-cols-2 xl:grid-cols-6 xl:gap-6">
            {ANGEBOTE.map((a, i) => {
              const Icon = ICONS[a.key]
              const main = i === 0
              return (
                <Reveal key={a.key} delay={i * 0.05} className={cn(main ? 'md:col-span-2 xl:col-span-6' : 'xl:col-span-3', i >= 3 && 'xl:col-span-3')}>
                  <article
                    className={cn(
                      'group relative flex h-full flex-col rounded-xl p-6 md:p-8',
                      main ? 'grain floaty-lg overflow-hidden bg-espresso-800 text-white xl:flex-row xl:items-center xl:gap-12 xl:p-10' : 'frame-soft floaty bg-white'
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
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
                      <h2 className={cn('mt-5 font-serif leading-[1.12] tracking-[-0.012em]', main ? 'text-[2rem] md:text-[2.5rem]' : 'text-[1.6rem] text-espresso-900')}>{a.title}</h2>
                      <p className={cn('mt-1.5 font-semibold', main ? 'text-caramel-200' : 'text-caramel-700')}>{a.hint}</p>
                      <p className={cn('mt-4 max-w-[40rem] leading-relaxed', main ? 'text-espresso-100/90' : 'text-muted')}>{a.text}</p>
                    </div>
                    {main && (
                      <ul className="mt-6 space-y-2 text-[0.9375rem] text-espresso-100/90 xl:mt-0 xl:w-[20rem]">
                        {['Stressanalyse und Stresslandkarte', 'Persönlicher Begleitungsplan', 'Methoden, Übungen, Materialien', 'Pläne für Ihren Alltag'].map((t) => (
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
                        'mt-6 inline-flex min-h-11 items-center gap-1.5 self-start font-semibold underline underline-offset-[0.3em] transition-colors duration-500 after:absolute after:inset-0 after:rounded-[inherit] xl:self-auto',
                        main ? 'text-white decoration-caramel-300/60 hover:text-caramel-200 xl:mt-0' : 'text-espresso-800 decoration-caramel-400/70 hover:text-caramel-800'
                      )}
                    >
                      Mehr erfahren
                      <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
                    </Link>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </section>

        <section aria-labelledby="wegweiser" className="bg-stone pb-28 pt-14 md:pb-36 md:pt-20 xl:pb-44">
          <div className="wrap grid gap-8 xl:grid-cols-12 xl:gap-16">
            <Reveal className="xl:col-span-4">
              <h2 id="wegweiser" className="t-h2 text-espresso-900">
                Was passt zu mir?
              </h2>
              <p className="mt-4 leading-relaxed text-muted">Eine kurze Orientierung. Und wenn Sie unsicher sind: Genau dafür ist das Erstgespräch da.</p>
              <ButtonLink href={ERSTGESPRAECH} variant="primary" className="mt-6">
                Gemeinsam herausfinden
              </ButtonLink>
            </Reveal>
            <Reveal delay={0.08} className="xl:col-span-8">
              <ul className="border-t border-line">
                {WEGWEISER.map((w) => (
                  <li key={w.href}>
                    <Link href={w.href} className="group flex min-h-[4.5rem] items-center justify-between gap-4 border-b border-line py-3">
                      <span className="leading-snug text-ink/85">{w.frage}</span>
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
