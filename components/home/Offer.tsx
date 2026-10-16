import Link from 'next/link'
import { ArrowRight, Building2, Check, MonitorPlay, UserRound } from 'lucide-react'
import { Carousel } from '@/components/ui/Carousel'
import { CtaRow } from '@/components/ui/CtaRow'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

/**
 * Stufe 5: Das Angebot in drei Wegen (3er-Gruppe, leicht zu merken). Der Hauptweg, die persönliche Begleitung, ist dunkel hervorgehoben.
 * Handy: wischbar, ab Tablet drei Spalten. Jede Karte führt auf ihre Seite, der CTA darunter immer zum Erstgespräch.
 */
const WEGE = [
  {
    key: 'begleitung',
    Icon: UserRound,
    label: 'Hauptangebot',
    title: 'Persönliche Begleitung',
    hint: '3 oder 6 Monate, eins zu eins',
    punkte: ['Wöchentlich 60 oder alle zwei Wochen 90 Minuten', 'Ihr persönlicher Begleitungsplan', 'Auch zu zweit oder als Paar möglich'],
    path: '/stresscoaching/',
    main: true,
  },
  {
    key: 'online',
    Icon: MonitorPlay,
    label: 'Online lernen',
    title: 'Webinar und Online-Kurs',
    hint: 'In der Gruppe oder im eigenen Tempo',
    punkte: ['Webinar über vier Wochen, live per Video', 'Online-Kurs zum Selbstlernen', 'Termine folgen, Warteliste offen'],
    path: '/webinar/',
    main: false,
  },
  {
    key: 'unternehmen',
    Icon: Building2,
    label: 'Für Unternehmen',
    title: 'Schulungen für Teams',
    hint: 'Für kleine Unternehmen und Gruppen',
    punkte: ['Stress im Arbeitsalltag verstehen', 'Praxisnah, online oder vor Ort', 'Auf Ihr Team abgestimmt'],
    path: '/stressmanagement-unternehmen/',
    main: false,
  },
] as const

export function Offer() {
  return (
    <section aria-labelledby="angebot-title" className="bg-greige pb-20 pt-16 md:pb-28 md:pt-24 xl:pb-32 xl:pt-28">
      <div className="wrap">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <p className="t-label text-caramel-700">Angebote</p>
            <h2 id="angebot-title" className="t-h2 mt-3 max-w-[22ch] text-espresso-900">
              Drei Wege, Ihren Stress <em className="italic text-caramel-600">anzugehen</em>
            </h2>
          </div>
          <Link href="/angebote/" className="link hidden shrink-0 font-semibold md:inline-flex">
            Alle Angebote im Überblick
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 md:mt-10">
          <Carousel label="Angebote" arrowLabel="Angebote" item="82vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-5 xl:gap-6">
            {WEGE.map(({ key, Icon, label, title, hint, punkte, path, main }) => (
              <article
                key={key}
                className={cn(
                  'glow-hover group relative flex h-full flex-col rounded-xl p-6 md:p-7 xl:p-8',
                  main ? 'grain floaty-lg bg-espresso-800 text-white' : 'frame-soft floaty bg-white'
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      'glow-icon grid h-12 w-12 place-items-center rounded-full transition-colors duration-500',
                      main ? 'bg-white/[0.08] text-caramel-200' : 'bg-stone text-caramel-700 group-hover:bg-caramel-50'
                    )}
                  >
                    <Icon className="h-[1.375rem] w-[1.375rem]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em]',
                      main ? 'bg-caramel-300/15 text-caramel-200' : 'bg-stone text-caramel-700'
                    )}
                  >
                    {label}
                  </span>
                </div>
                <h3 className={cn('mt-6 font-serif text-[1.6rem] leading-[1.12] tracking-[-0.01em]', main ? 'text-white' : 'text-espresso-900')}>{title}</h3>
                <p className={cn('mt-1.5 text-[0.9375rem] font-semibold', main ? 'text-caramel-200' : 'text-caramel-700')}>{hint}</p>
                <ul className={cn('mt-5 flex-1 space-y-2.5 border-t pt-5 text-[0.9375rem]', main ? 'border-white/12 text-espresso-100/90' : 'border-line text-ink/80')}>
                  {punkte.map((p) => (
                    <li key={p} className="flex gap-2.5 leading-snug">
                      <Check className={cn('mt-[0.2em] h-4 w-4 shrink-0', main ? 'text-caramel-300' : 'text-caramel-600')} strokeWidth={2.25} aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={path}
                  className={cn(
                    'mt-6 inline-flex min-h-11 items-center gap-1.5 self-start font-semibold underline underline-offset-[0.3em] transition-colors duration-500 after:absolute after:inset-0 after:rounded-[inherit]',
                    main ? 'text-white decoration-caramel-300/60 hover:text-caramel-200' : 'text-espresso-800 decoration-caramel-400/70 hover:text-caramel-800'
                  )}
                >
                  Mehr erfahren
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </Carousel>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 md:mt-12">
          <CtaRow align="center" note="Welcher Weg passt? Das klären wir in 15 Minuten." />
        </Reveal>
        <Link href="/angebote/" className="link mt-6 flex justify-center font-semibold md:hidden">
          Alle Angebote im Überblick
        </Link>
      </div>
    </section>
  )
}
