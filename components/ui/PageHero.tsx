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
 * Hero der Unterseiten (helles Vollbild wie die Startseite, Header liegt transparent darüber, steht beim Scrollen,
 * das folgende <Sheet> schiebt sich darüber). Deshalb direkt danach IMMER <Sheet> mit dem restlichen Inhalt rendern.
 * Ohne Foto (Standard, solange es keine Fotos von Joana gibt): beige Papierfläche mit Körnung, weichem Licht und der Markenlinie.
 * `tone="greige"` für Abwechslung zwischen Seiten. `aside`: Materialien rechts (ab Desktop), `image`: Foto als Hintergrund (später).
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
  tone = 'light',
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
  /** Grundfarbe ohne Foto: light (Beige, Standard) · greige (etwas kühler, für Abwechslung zwischen Seiten) */
  tone?: 'light' | 'greige'
  className?: string
}) {
  return (
    <StackBack className={cn(image ? 'bg-espresso-900 text-white' : tone === 'greige' ? 'bg-greige text-ink' : 'bg-stone text-ink', className)}>
      <section aria-labelledby={id} className="page-hero relative">
        <div className={cn(image ? 'grain' : 'paper-grain', 'absolute inset-0 overflow-hidden')}>
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
              {/* Weiches Licht links oben, warmer Schimmer rechts unten (wie Startseite) */}
              <div className="absolute -left-[12%] -top-[22%] h-[80%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.8),rgb(255_255_255/0)_70%)] blur-2xl" />
              <div className="absolute -bottom-[30%] -right-[10%] h-[75%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgb(214_184_146/0.3),transparent)] blur-2xl" />
              <HeroLine variant="page" draw className="text-caramel-500/35" />
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
              {eyebrow && <p className={cn('intro-rise t-label [--d:0s]', image ? 'text-caramel-300' : 'text-caramel-700')}>{eyebrow}</p>}
              <h1
                id={id}
                className={cn(
                  'intro-rise t-hero-sub mt-4 [--d:0.12s] short:mt-2.5',
                  image ? 'text-white [&_em]:text-caramel-300' : 'text-espresso-900 [&_em]:font-normal [&_em]:text-caramel-600'
                )}
              >
                {title}
              </h1>
              {intro && (
                <div
                  className={cn(
                    'intro-rise t-lead mt-5 max-w-[39rem] space-y-4 [--d:0.28s] short:mt-3 short:text-base short:leading-normal md:mt-6',
                    image ? 'text-white/85' : 'text-ink/75'
                  )}
                >
                  {intro}
                </div>
              )}
            </div>
            {actions && (
              <div className="intro-rise mt-8 flex flex-col gap-3 [--d:0.42s] short:mt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">{actions}</div>
            )}
          </div>
          {aside && <div className="intro-rise mt-10 hidden [--d:0.5s] xl:col-span-5 xl:mt-0 xl:block">{aside}</div>}
        </div>
      </section>
    </StackBack>
  )
}
