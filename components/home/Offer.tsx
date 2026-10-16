import Link from 'next/link'
import { ArrowRight, BookOpen, Building2, Check, MonitorPlay, Users } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Carousel } from '@/components/ui/Carousel'
import { Reveal } from '@/components/ui/Reveal'
import { ANGEBOTE, PROGRAMME, angebot } from '@/lib/content/angebote'
import { ERSTGESPRAECH } from '@/lib/site'

const ICONS = { 'zu-zweit': Users, webinar: MonitorPlay, kurs: BookOpen, unternehmen: Building2 } as const

const STATUS: Record<string, string | null> = { buchbar: null, 'termine-folgen': 'Termine folgen', 'in-vorbereitung': 'In Vorbereitung' }

/**
 * Stufe 5: Das Angebot. Hauptangebot groß (Briefing Priorität 1): dunkle Karte mit beiden Programmen.
 * Darunter die weiteren Angebote als Karten (Handy: wischbar, ab Tablet Raster), jede verlinkt auf ihre Seite.
 */
export function Offer() {
  const haupt = angebot('begleitung')
  const weitere = ANGEBOTE.filter((a) => a.key !== 'begleitung')
  return (
    <section aria-labelledby="angebot-title" className="bg-greige pb-20 pt-16 md:pb-28 md:pt-24 xl:pb-32 xl:pt-28">
      <div className="wrap">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <p className="t-label text-caramel-700">Angebote</p>
            <h2 id="angebot-title" className="t-h2 mt-3 max-w-[22ch] text-espresso-900">
              Unterstützung, die zu Ihrem Leben passt
            </h2>
          </div>
          <Link href="/angebote/" className="link hidden shrink-0 font-semibold md:inline-flex">
            Alle Angebote im Überblick
          </Link>
        </Reveal>

        {/* Hauptangebot */}
        <Reveal delay={0.08} className="mt-8 md:mt-10">
          <article className="grain floaty-lg relative overflow-hidden rounded-xl bg-espresso-800 p-6 text-white md:p-10 xl:grid xl:grid-cols-12 xl:gap-12 xl:p-12">
            <div className="xl:col-span-5">
              <span className="inline-flex h-8 items-center rounded-full bg-terra-300/15 px-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-terra-200">
                Hauptangebot
              </span>
              <h3 className="mt-4 font-serif text-[1.85rem] leading-[1.1] tracking-[-0.015em] md:text-[2.4rem]">
                Stresscoaching: Ihre <em className="italic text-terra-300">persönliche</em> Begleitung
              </h3>
              <p className="mt-4 leading-relaxed text-espresso-100/90">{haupt.text}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <ButtonLink href={haupt.path} variant="light" size="lg" className="group w-full sm:w-auto">
                  Begleitung ansehen
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
                </ButtonLink>
                <Link href={ERSTGESPRAECH} className="inline-flex min-h-11 items-center justify-center font-semibold text-white underline decoration-terra-300/60 underline-offset-[6px] hover:text-terra-200 sm:justify-start">
                  Erstgespräch anfragen
                </Link>
              </div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:col-span-7 xl:mt-0 xl:gap-4">
              {PROGRAMME.map((p) => (
                <div key={p.key} className="rounded-lg border border-white/12 bg-white/[0.05] p-5 xl:p-6">
                  <p className="font-serif text-[2.75rem] italic leading-none text-terra-300">
                    {p.monate}
                    <span className="ml-1.5 align-middle font-sans text-[0.9375rem] not-italic text-espresso-200">Monate</span>
                  </p>
                  <p className="mt-3 font-semibold">{p.untertitel}</p>
                  <ul className="mt-3 space-y-1.5 text-[0.9375rem] text-espresso-100/85">
                    {[p.rhythmus, p.dauer, p.sitzungen].map((t) => (
                      <li key={t} className="flex gap-2">
                        <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-terra-300" strokeWidth={2.5} aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <ol className="mt-4 flex gap-1.5" aria-label="Phasen">
                    {p.phasen.map((ph, i) => (
                      <li key={ph.title} className="flex-1">
                        <span className="block h-1 rounded-full" style={{ background: ['#d6b892', '#e8a877', '#d98a55'][i] }} />
                        <span className="mt-1.5 block text-[0.6875rem] leading-tight text-espresso-200">{ph.title.replace('Stress ', '')}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        {/* Weitere Angebote */}
        <Reveal delay={0.12} className="mt-6 md:mt-8">
          <Carousel label="Weitere Angebote" arrowLabel="Angebote" item="78vw" gridFrom="md" gridClass="md:grid-cols-2 md:gap-5 xl:grid-cols-4 xl:gap-6">
            {weitere.map((a) => {
              const Icon = ICONS[a.key as keyof typeof ICONS]
              const status = STATUS[a.status]
              return (
                <div key={a.key} className="frame-soft floaty group relative flex h-full flex-col rounded-lg bg-white p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-md bg-stone text-caramel-700 transition-colors duration-500 group-hover:bg-terra-50 group-hover:text-terra-600">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    {status && <span className="rounded-full bg-caramel-50 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-caramel-700">{status}</span>}
                  </div>
                  <h3 className="mt-5 font-serif text-[1.375rem] leading-tight text-espresso-900">{a.title}</h3>
                  <p className="mt-1 text-[0.875rem] font-semibold text-caramel-700">{a.hint}</p>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{a.text}</p>
                  <Link
                    href={a.path}
                    className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-espresso-800 underline decoration-caramel-400/70 underline-offset-[0.3em] transition-colors duration-500 after:absolute after:inset-0 after:rounded-[inherit] hover:text-terra-700"
                  >
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </div>
              )
            })}
          </Carousel>
        </Reveal>
        <Link href="/angebote/" className="link mt-6 inline-flex font-semibold md:hidden">
          Alle Angebote im Überblick
        </Link>
      </div>
    </section>
  )
}
