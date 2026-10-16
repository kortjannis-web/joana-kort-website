import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ArticleCover } from './ArticleCover'
import type { Artikel } from '@/lib/types'
import { cn } from '@/lib/utils'

export const fmtDatum = (d: string) => new Date(d).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })

/** Kategorie-Chip (Karamell-Fläche, Versalien) */
export function KategorieChip({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center rounded-full bg-caramel-50 px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-caramel-700 md:text-[0.75rem]',
        className
      )}
    >
      {children}
    </span>
  )
}

function Meta({ a }: { a: Artikel }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
      <KategorieChip>{a.category}</KategorieChip>
      <span className="text-[0.8125rem] text-muted md:text-[0.875rem]">
        <time dateTime={a.published}>{fmtDatum(a.published)}</time> · {a.readingMinutes} Min. Lesezeit
      </span>
    </div>
  )
}

/**
 * Artikel-Karte der Ratgeber-Übersicht. Ganze Karte klickbar (Link auf der Überschrift, gestreckt).
 * featured: ab Desktop Bild links (7/12) und Text rechts, Bild mit leichtem Parallax. Sonst: Bild oben, Text darunter.
 * Überschriften h2 (die Karten stehen direkt unter der H1 der Seite).
 */
export function ArticleCard({ a, featured = false, headingLevel = 2 }: { a: Artikel; featured?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const href = `/ratgeber/${a.slug}/`

  return (
    <article
      className={cn(
        'group floaty relative flex h-full flex-col border border-line bg-white p-2 transition-transform duration-500 ease-[var(--ease-soft)] hover:-translate-y-1',
        featured ? 'rounded-lg md:rounded-xl xl:grid xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] xl:p-2.5' : 'rounded-lg'
      )}
    >
      <div
        className={cn(
          'relative min-w-0 shrink-0 overflow-hidden rounded-[0.875rem]',
          featured ? 'h-[13.125rem] md:h-[22rem] xl:h-[27.5rem] xl:rounded-lg' : 'h-[13.125rem] md:h-[15rem] xl:h-[17rem]'
        )}
      >
        <ArticleCover a={a} featured={featured} />
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col gap-3 px-3.5 pb-4 pt-5 md:gap-3.5',
          featured ? 'md:px-6 md:pb-6 md:pt-7 xl:justify-center xl:gap-[1.125rem] xl:px-11 xl:py-10' : 'md:px-[1.375rem] md:pb-[1.375rem] md:pt-[1.625rem]'
        )}
      >
        <Meta a={a} />
        <H
          className={cn(
            'font-serif font-medium text-espresso-900 transition-colors duration-500 ease-[var(--ease-soft)] group-hover:text-caramel-800',
            featured
              ? 'text-[1.4375rem] leading-[1.22] md:text-[1.875rem] xl:text-[2.25rem] xl:leading-[1.15] xl:tracking-[-0.015em]'
              : 'text-[1.4375rem] leading-[1.22] xl:text-[1.6875rem] xl:leading-[1.2]'
          )}
        >
          <Link href={href} className="after:absolute after:inset-0 after:rounded-[inherit]">
            {a.title}
          </Link>
        </H>
        <p className={cn('leading-relaxed text-muted', featured ? 'text-[0.9375rem] md:text-[1.0625rem]' : 'text-[0.9375rem] md:text-base')}>
          {a.excerpt}
        </p>
        {/* Deko-Button: der Link liegt auf der Überschrift (ganze Karte klickbar) */}
        {featured ? (
          <span
            aria-hidden="true"
            className="mt-1 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-[#ddd3c6] bg-white px-6 text-[0.9375rem] font-semibold text-espresso-800 transition-colors duration-500 group-hover:border-espresso-800 xl:mt-2 xl:self-start xl:border-0 xl:bg-espresso-900 xl:text-white xl:group-hover:bg-espresso-800"
          >
            Artikel lesen <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={2} />
          </span>
        ) : (
          <>
            <span
              aria-hidden="true"
              className="mt-1 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-[#ddd3c6] bg-white px-6 text-[0.9375rem] font-semibold text-espresso-800 transition-colors duration-500 group-hover:border-espresso-800 md:hidden"
            >
              Artikel lesen <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </span>
            <span
              aria-hidden="true"
              className="mt-auto hidden self-start pt-1.5 text-[0.9375rem] font-semibold text-espresso-800 underline decoration-caramel-300 decoration-[1.5px] underline-offset-[5px] transition-colors duration-500 group-hover:text-caramel-800 md:inline"
            >
              Artikel lesen
            </span>
          </>
        )}
      </div>
    </article>
  )
}
