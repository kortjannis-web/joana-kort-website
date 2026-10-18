import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Carousel } from '@/components/ui/Carousel'
import { More } from '@/components/ui/More'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

export type Methode = {
  title: string
  text: string
  /** Langtext hinter dem Pfeil (steht im HTML, sichtbar nach Klick) */
  more?: string
  Icon: LucideIcon
}

/**
 * Eine Dreiergruppe von Methoden zu einem der drei Schritte (verstehen, bewältigen, managen).
 * Kopf mit Schrittnummer (kantige Kachel), darunter drei Karten: Handy wischbar (Carousel), ab Tablet drei Spalten.
 * Langtexte hinter dem Pfeil (More), damit jede Section in einen Bildschirm passt.
 */
export function MethodGroup({
  id,
  nr,
  step,
  title,
  intro,
  items,
  tone = 'paper',
}: {
  id: string
  nr: number
  step: string
  title: ReactNode
  intro: string
  items: Methode[]
  tone?: 'paper' | 'stone' | 'greige'
}) {
  return (
    <section
      aria-labelledby={id}
      className={cn('sec scroll-mt-24', tone === 'stone' && 'bg-stone', tone === 'greige' && 'bg-greige', tone === 'paper' && 'bg-paper')}
    >
      <div className="wrap">
        <Reveal className="grid gap-x-10 gap-y-[clamp(0.5rem,1.5svh,1rem)] lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3">
              <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-md bg-espresso-800 text-[0.9375rem] font-semibold text-caramel-200">
                {nr}
              </span>
              <span className="t-label text-caramel-700">
                Schritt {nr} · {step}
              </span>
            </p>
            <h2 id={id} className="t-h2 mt-[clamp(0.75rem,2svh,1.25rem)] max-w-[22ch] text-espresso-900">
              {title}
            </h2>
          </div>
          <p className="max-w-[36rem] text-[0.9375rem] leading-relaxed text-muted compact:hidden md:text-[1.0625rem] lg:col-span-5">{intro}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-[var(--sec-gap)]">
          <Carousel label={step} arrowLabel="Methoden" item="82vw" gridFrom="md" gridClass="md:grid-cols-3 md:gap-5 xl:gap-6">
            {items.map(({ title: t, text, more, Icon }) => (
              <article key={t} className="lift-hover floaty flex h-full flex-col rounded-lg border border-line bg-white p-5 md:p-[clamp(1.25rem,3svh,1.75rem)]">
                <span className="lift-tile grid h-11 w-11 place-items-center rounded-md bg-stone text-espresso-800">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-[clamp(0.75rem,2svh,1.25rem)] text-[1.125rem] font-semibold leading-snug text-espresso-900 md:text-[1.1875rem]">{t}</h3>
                <p className="mt-1.5 flex-1 text-[0.9375rem] leading-relaxed text-muted">{text}</p>
                {more && (
                  <More label={`Mehr zu: ${t}`} className="mt-2" bodyClassName="text-[0.9375rem] leading-relaxed text-ink/85">
                    {more}
                  </More>
                )}
              </article>
            ))}
          </Carousel>
        </Reveal>
      </div>
    </section>
  )
}
