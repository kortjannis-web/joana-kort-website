import type { ReactNode } from 'react'
import { StackBack } from './Stack'
import { HeroLine } from './HeroLine'
import { cn } from '@/lib/utils'

export type HeroImage = {
  src: string
  srcSet?: string
  mobileSrc?: string
  alt: string
  w: number
  h: number
  position?: string
}

/**
 * Hero der Unterseiten (dunkles Vollbild, Header liegt transparent darüber, steht beim Scrollen,
 * das folgende <Sheet> schiebt sich darüber). Deshalb direkt danach IMMER <Sheet> mit dem restlichen Inhalt rendern.
 * Ohne Foto (Standard, solange es keine Fotos von Joana gibt): Espresso-Fläche mit Papierkörnung, warmem Licht von rechts oben
 * und der Markenlinie. `aside`: Bild oder Materialien rechts (ab Desktop), `image`: Foto als Hintergrund (später).
 * Mobil fast bildschirmhoch, Text unten. Ab Tablet vertikal mittig. Nie höher als der Viewport. Kein Reveal (oberhalb der Falz).
 */
export function PageHero({
  image,
  eyebrow,
  title,
  intro,
  actions,
  aside,
  id = 'hero-title',
  size = 'md',
  tone = 'espresso',
  className,
}: {
  image?: HeroImage
  eyebrow?: ReactNode
  title: ReactNode
  intro?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
  id?: string
  size?: 'md' | 'lg'
  /** Grundfarbe ohne Foto: espresso (Standard) · mocha (etwas wärmer, für Abwechslung zwischen Seiten) */
  tone?: 'espresso' | 'mocha'
  className?: string
}) {
  return (
    <StackBack className={cn(tone === 'mocha' ? 'bg-espresso-700' : 'bg-espresso-900', 'text-white', className)}>
      <section aria-labelledby={id} className="relative">
        <div className="grain absolute inset-0 overflow-hidden">
          {image ? (
            <>
              <picture>
                {image.mobileSrc && <source media="(max-width: 767px)" srcSet={image.mobileSrc} />}
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes="100vw"
                  alt={image.alt}
                  width={image.w}
                  height={image.h}
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className={cn('h-full w-full object-cover', image.position ?? 'object-center')}
                />
              </picture>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(23_17_13/0.72)_0%,rgb(23_17_13/0.45)_32%,rgb(23_17_13/0.6)_60%,rgb(23_17_13/0.9)_100%)] xl:bg-[linear-gradient(90deg,rgb(23_17_13/0.9)_0%,rgb(23_17_13/0.62)_45%,rgb(23_17_13/0.15)_85%)]" />
            </>
          ) : (
            <>
              {/* Warmes Licht wie durch ein Fenster, rechts oben */}
              <div className="absolute -right-[20%] -top-[30%] h-[85%] w-[80%] rounded-full bg-[radial-gradient(closest-side,rgb(232_168_119/0.16),rgb(214_184_146/0.06)_55%,transparent)] blur-2xl" />
              <HeroLine variant="page" className="text-caramel-300/25" />
            </>
          )}
        </div>

        <div
          className={cn(
            'wrap-wide relative flex min-h-[max(30rem,100svh)] flex-col justify-end pb-[calc(var(--sheet-overlap)+2.75rem)] pt-24 md:justify-center md:pb-[calc(var(--sheet-overlap)+2.5rem)] md:pt-[calc(4.5rem+2.5rem)] xl:pb-[calc(var(--sheet-overlap)+3rem)] xl:pt-[calc(5.25rem+3rem)]',
            size === 'lg' ? 'md:min-h-[min(44rem,100svh)] xl:min-h-[min(52rem,100svh)]' : 'md:min-h-[min(40rem,100svh)] xl:min-h-[min(46rem,100svh)]',
            aside && 'xl:grid xl:grid-cols-12 xl:content-center xl:items-center xl:gap-12'
          )}
        >
          <div className={cn('max-w-[46rem]', aside && 'xl:col-span-7')}>
            <div className="max-md:-translate-y-[24px]">
              {eyebrow && <p className="t-label text-caramel-300">{eyebrow}</p>}
              <h1 id={id} className="t-hero-sub mt-4 text-white short:mt-2.5 [&_em]:italic [&_em]:text-terra-300">
                {title}
              </h1>
              {intro && (
                <div className="t-lead mt-5 max-w-[39rem] space-y-4 text-white/85 short:mt-3 short:text-base short:leading-normal md:mt-6">{intro}</div>
              )}
            </div>
            {actions && <div className="mt-8 flex flex-col gap-3 short:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">{actions}</div>}
          </div>
          {aside && <div className="mt-10 hidden xl:col-span-5 xl:mt-0 xl:block">{aside}</div>}
        </div>
      </section>
    </StackBack>
  )
}
