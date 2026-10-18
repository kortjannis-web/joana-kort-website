import { GoogleIcon, Stars } from '@/components/ui/icons'
import { GOOGLE_RATING } from '@/lib/content/reviews'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

/**
 * Google-Bewertung als Vertrauenssignal, verlinkt auf das Google-Profil.
 * float = weiße Pille · bare = ohne Rahmen, frei schwebend über dem Hero-Bild · dark = auf dunklem Grund (Hero) · light = auf hellem Grund
 */
export function GoogleRating({
  tone = 'light',
  rating = GOOGLE_RATING.rating,
  count = GOOGLE_RATING.count,
  showCount = true,
  className,
}: {
  tone?: 'float' | 'bare' | 'dark' | 'light'
  rating?: number
  count?: number
  showCount?: boolean
  className?: string
}) {
  return (
    <a
      href={site.google.reviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${fmt(rating)} von 5 Sternen aus ${count} Google-Bewertungen, Google-Profil öffnen`}
      className={cn(
        'group inline-flex min-h-11 items-center gap-2.5 rounded-full transition-[transform,background-color] duration-200 ease-[var(--ease-lift)]',
        tone === 'float' &&
          'h-14 border border-line bg-white/95 pl-4 pr-5 text-ink shadow-[0_10px_30px_-10px_rgba(30,22,17,0.4)] backdrop-blur-md hover:-translate-y-0.5',
        // bare: hauchzarte, weich auslaufende Abdunklung dahinter, damit Sterne und Note auf hellem Bild lesbar bleiben
        tone === 'bare' &&
          "relative px-1 text-white [filter:drop-shadow(0_1px_6px_rgb(8_20_24/0.7))] before:pointer-events-none before:absolute before:-inset-x-6 before:-inset-y-4 before:-z-10 before:bg-[radial-gradient(closest-side,rgb(8_20_24/0.22),transparent)] before:content-[''] hover:-translate-y-0.5",
        tone === 'dark' && 'border border-white/20 bg-white/[0.07] px-4 text-white backdrop-blur-sm hover:bg-white/[0.12]',
        tone === 'light' && 'border border-line bg-white px-4 text-ink hover:border-espresso-800/30',
        className
      )}
    >
      {/* Reihenfolge: Sterne, Note, Google-Symbol am Ende */}
      <Stars className={cn('inline-flex gap-0.5', tone === 'dark' || tone === 'bare' ? 'text-caramel-300' : 'text-caramel-500')} starClassName="h-3.5 w-3.5" />
      <span className="text-[1rem] font-semibold tabular-nums leading-none">{fmt(rating)}</span>
      <GoogleIcon className="h-5 w-5 shrink-0" />
      {showCount && (
        <span className={cn('whitespace-nowrap text-[0.8125rem] leading-none', tone === 'dark' ? 'text-white/75' : 'text-muted')}>
          {count} Bewertungen
        </span>
      )}
    </a>
  )
}
