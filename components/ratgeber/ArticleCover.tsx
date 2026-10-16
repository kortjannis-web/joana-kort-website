import { LogoMark } from '@/components/layout/Logo'
import { MATERIAL } from '@/lib/images'
import type { Artikel } from '@/lib/types'
import { cn } from '@/lib/utils'

/** Artikel mit eigenem Bild (Material aus Joanas Vorlagen), alle anderen bekommen ein typografisches Titelbild */
const BILDER: Record<string, (typeof MATERIAL)[keyof typeof MATERIAL]> = {
  'stresstagebuch-anleitung': MATERIAL.tagebuchAnleitung,
  'stressmanagement-im-alltag': MATERIAL.wochenfokus,
}

/** Farbwelt je Kategorie: verstehen = Greige, bewältigen = Apricot, managen = Espresso, Wissen = Karamell */
const TONE: Record<Artikel['category'], { bg: string; word: string; line: string; label: string }> = {
  'Stress verstehen': { bg: 'bg-greige', word: 'text-espresso-800', line: 'text-caramel-500', label: 'text-caramel-700' },
  'Stress bewältigen': { bg: 'bg-terra-100', word: 'text-terra-700', line: 'text-terra-500', label: 'text-terra-700' },
  'Stress managen': { bg: 'bg-espresso-800', word: 'text-terra-300', line: 'text-caramel-300', label: 'text-caramel-300' },
  Wissen: { bg: 'bg-caramel-100', word: 'text-caramel-800', line: 'text-caramel-500', label: 'text-caramel-700' },
}

/**
 * Titelbild einer Artikel-Karte: entweder ein Material (Papier schwebt auf Beige) oder typografisch:
 * Schwerpunkt-Wort groß in Playfair kursiv, darunter die Markenlinie. Füllt den Rahmen (absolute inset-0).
 */
export function ArticleCover({ a, featured = false }: { a: Artikel; featured?: boolean }) {
  const bild = BILDER[a.slug]
  const t = TONE[a.category]
  if (bild)
    return (
      <div className="paper-grain absolute inset-0 grid place-items-center bg-stone p-6">
        <img
          src={bild.src}
          srcSet={bild.srcSet}
          sizes="(min-width: 1200px) 40vw, 90vw"
          alt={bild.alt}
          width={bild.w}
          height={bild.h}
          loading="lazy"
          decoding="async"
          className={cn(
            'paper h-auto max-h-full w-auto max-w-[86%] rounded-[3px] object-contain transition-transform duration-1000 ease-[var(--ease-soft)] group-hover:-rotate-1 group-hover:scale-[1.03]',
            bild.h > bild.w ? 'max-h-[92%] -rotate-3' : 'rotate-[-2deg]'
          )}
        />
      </div>
    )
  const word = a.category === 'Wissen' ? 'Wissen' : a.category.replace('Stress ', '')
  return (
    <div className={cn(t.bg, a.category === 'Stress managen' ? 'grain' : 'paper-grain', 'absolute inset-0 flex flex-col justify-between p-6 md:p-7')}>
      <span className={cn('t-label text-[0.6875rem]', t.label)}>{a.category === 'Wissen' ? 'Wissen' : 'Stress'}</span>
      <div>
        <span
          className={cn(
            'block font-serif italic leading-[0.95] tracking-[-0.02em] transition-transform duration-1000 ease-[var(--ease-soft)] group-hover:translate-x-1',
            t.word,
            featured ? 'text-[3.4rem] md:text-[5.25rem] xl:text-[6rem]' : 'text-[3.2rem] md:text-[3.6rem]'
          )}
        >
          {word}
        </span>
        <LogoMark className={cn('mt-3 w-28 md:w-36', t.line)} strokeWidth={1.8} />
      </div>
    </div>
  )
}
