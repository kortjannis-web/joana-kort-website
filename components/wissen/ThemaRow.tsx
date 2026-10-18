import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { InView } from '@/components/ui/InView'
import { More } from '@/components/ui/More'
import { Reveal } from '@/components/ui/Reveal'
import { Rich } from '@/components/ui/Rich'
import { ExplainScene } from './ExplainScene'
import { ARTIKEL } from '@/lib/content/ratgeber'
import type { Thema } from '@/lib/content/wissen'
import { cn } from '@/lib/utils'

/**
 * Ein Wissensthema: Erklär-Animation und Text nebeneinander (ab Tablet quer), mobil Animation oben. Höhe der Animation am Viewport
 * bemessen, damit Thema und Gruppenkopf zusammen in einen Bildschirm passen (eine Folie im Themen-Karussell).
 * Sichtbar: Frage + Kurzantwort. Langtext und Weiterlesen erst nach Klick auf den Pfeil.
 */
export function ThemaRow({ t, index, flip = false }: { t: Thema; index: number; flip?: boolean }) {
  const artikel = t.ratgeber ? ARTIKEL.find((a) => a.slug === t.ratgeber) : undefined
  return (
    <article id={t.id} aria-labelledby={`${t.id}-title`} className="scroll-mt-28 grid items-center gap-[clamp(1rem,3svh,2rem)] md:grid-cols-12 md:gap-x-8 xl:gap-x-16">
      <Reveal className={cn('md:col-span-6', flip && 'md:order-2')}>
        <InView className="explain frame-soft floaty relative overflow-hidden rounded-xl bg-stone px-4 pb-2 pt-6 md:px-8 md:pb-4 md:pt-9 [&_svg]:max-h-[clamp(8rem,24svh,17rem)]" threshold={0.45}>
          <span aria-hidden="true" className="absolute left-5 top-4 font-serif text-[0.9375rem] italic text-caramel-600 md:left-6 md:top-5">
            {String(index).padStart(2, '0')}
          </span>
          <ExplainScene scene={t.scene} labels={t.stichworte} title={t.frage} className="mx-auto max-w-[30rem]" />
        </InView>
      </Reveal>
      <Reveal delay={0.08} className={cn('md:col-span-6', flip && 'md:order-1')}>
        <h3 id={`${t.id}-title`} className="font-serif text-[clamp(1.375rem,1rem+1.6svh,2rem)] leading-[1.15] tracking-[-0.012em] text-espresso-900">
          {t.frage}
        </h3>
        <p className="t-lead mt-[clamp(0.5rem,1.5svh,1rem)] text-ink/80 max-md:text-[0.9375rem] max-md:leading-relaxed">{t.kurz}</p>
        <More label={`Ausführlich: ${t.frage}`} showLabel className="mt-[clamp(0.25rem,1.5svh,1rem)]" bodyClassName="prose-jk max-w-[40rem] space-y-4 pt-4 text-[1.0625rem]">
          {t.lang.map((p, i) => (
            <p key={i}>
              <Rich text={p} />
            </p>
          ))}
          {artikel && (
            <p>
              <Link href={`/ratgeber/${artikel.slug}/`} className="group inline-flex items-center gap-1.5 font-semibold text-espresso-800 underline decoration-caramel-500/60 underline-offset-[0.3em] hover:text-caramel-800">
                Im Ratgeber weiterlesen: {artikel.title}
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </p>
          )}
        </More>
      </Reveal>
    </article>
  )
}
