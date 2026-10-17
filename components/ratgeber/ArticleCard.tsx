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
          featured
            ? 'h-[clamp(8.5rem,22svh,13rem)] md:h-[clamp(11rem,30svh,22rem)] xl:h-[clamp(14rem,calc(100svh-2*var(--sec-y)-3rem),27.5rem)] xl:rounded-lg'
            : 'h-[clamp(7.5rem,19svh,13rem)] md:h-[clamp(7rem,16svh,17rem)]'
        )}
      >
        <ArticleCover a={a} featured={featured} />
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col gap-2.5 px-3.5 pb-3 pt-4 md:gap-3',
          featured ? 'md:px-6 md:pb-5 md:pt-6 xl:justify-center xl:gap-[clamp(0.75rem,2svh,1.125rem)] xl:px-11 xl:py-8' : 'md:px-[1.25rem] md:pb-[clamp(0.75rem,2svh,1.375rem)] md:pt-[clamp(1rem,2.5svh,1.625rem)]'
        )}
      >
        <Meta a={a} />
        <H
          className={cn(
            'font-serif font-medium text-espresso-900 transition-colors duration-500 ease-[var(--ease-soft)] group-hover:text-caramel-800',
            featured
              ? 'text-[1.3125rem] leading-[1.22] md:text-[clamp(1.5rem,1rem+2svh,1.875rem)] xl:text-[clamp(1.75rem,1rem+2.6svh,2.25rem)] xl:leading-[1.15] xl:tracking-[-0.015em]'
              : 'text-[1.25rem] leading-[1.22] xl:text-[clamp(1.375rem,1rem+1.4svh,1.6875rem)] xl:leading-[1.2]'
          )}
        >
          <Link href={href} className="after:absolute after:inset-0 after:rounded-[inherit]">
            {a.title}
          </Link>
        </H>
        <p className={cn('line-clamp-3 leading-relaxed text-muted lowdesk:line-clamp-2', featured ? 'text-[0.9375rem] md:text-[1.0625rem]' : 'text-[0.9375rem] md:text-base')}>
          {a.excerpt}
        </p>
        {/* Deko-Button: der Link liegt auf der Überschrift (ganze Karte klickbar) */}
        {featured ? (
          <span
            aria-hidden="true"
            className="mt-1 inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border border-[#ddd3c6] bg-white px-6 text-[0.9375rem] font-semibold text-espresso-800 transition-colors duration-500 group-hover:border-espresso-800 xl:mt-2 xl:self-start xl:border-0 xl:bg-espresso-900 xl:text-white xl:group-hover:bg-espresso-800"
          >
            Artikel lesen <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={2} />
          </span>
        ) : (
          <>
            <span
              aria-hidden="true"
              className="mt-auto self-start pt-1 text-[0.9375rem] font-semibold text-espresso-800 underline decoration-caramel-300 decoration-[1.5px] underline-offset-[5px] transition-colors duration-500 group-hover:text-caramel-800"
            >
              Artikel lesen
            </span>
          </>
        )}
      </div>
    </article>
  )
}
