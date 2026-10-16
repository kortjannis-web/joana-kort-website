'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { CalendarHeart, Mail, X } from 'lucide-react'
import { buttonClass } from '@/components/ui/Button'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GOOGLE_RATING } from '@/lib/content/reviews'
import { ERSTGESPRAECH, site } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Schnellkontakt: im Hero nur die Google-Bewertung (sobald es welche gibt),
 * nach dem Hero ein runder Knopf unten rechts. Er öffnet ein kleines Fenster mit Weg zum Erstgespräch und E-Mail.
 * Kein Fremd-Skript, kein Datenfluss.
 */
const Ctx = createContext<() => void>(() => {})
export const useQuickContact = () => useContext(Ctx)
/** true, sobald das Sheet den Hero zur Hälfte überdeckt (bzw. immer auf Seiten ohne Hero) */
const PastHeroCtx = createContext(true)
export const usePastHero = () => useContext(PastHeroCtx)

export function QuickContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [intro] = useState(pathname === '/')
  const [pastHero, setPastHero] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const termin = site.bookingUrl || ERSTGESPRAECH

  useEffect(() => {
    let raf = 0
    const checkDark = () => {
      raf = 0
      const btn = btnRef.current
      if (!btn) return
      const r = btn.getBoundingClientRect()
      setOnDark(isDarkAt(r.left + r.width / 2, r.top + r.height / 2, btn))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(checkDark)
      const sheet = document.querySelector('[data-sheet]')
      // Ohne eigenen transform messen: beim Startseiten-Intro steht das Sheet anfangs tiefer (intro-sheet)
      const shift = sheet ? new DOMMatrix(getComputedStyle(sheet).transform).m42 : 0
      const top = sheet ? sheet.getBoundingClientRect().top - shift : 0
      const overlap = sheet ? -parseFloat(getComputedStyle(sheet).marginTop) || 0 : 0
      setPastHero(!sheet || top < window.innerHeight * 0.55)
      setShowRating(!!sheet && top >= window.innerHeight - overlap - 8 && top <= window.innerHeight - overlap + 6)
    }
    setOpen(false)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Auf der Erstgespräch-Seite selbst braucht es den Knopf nicht
  const hideButton = pathname === '/erstgespraech/'

  return (
    <Ctx.Provider value={() => setOpen(true)}>
      <PastHeroCtx.Provider value={pastHero}>
        {children}

        {GOOGLE_RATING.count > 0 && (
          <GoogleRating
            tone="bare"
            showCount={false}
            className={cn(
              intro && 'intro-up [--d:0.765s] xl:[--d:1.215s]',
              'fixed bottom-[calc(var(--sheet-overlap)-0.25rem)] right-4 z-30 transition-[opacity,transform,visibility] duration-500 ease-[var(--ease-soft)] md:bottom-[calc(var(--sheet-overlap)+0.5rem)] md:right-2 xl:right-[calc(var(--wrap-wide-x)-0.25rem)]',
              !showRating || open ? 'pointer-events-none invisible translate-y-3 opacity-0' : 'visible opacity-100'
            )}
          />
        )}

        {!hideButton && (
          <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Kontakt öffnen: Erstgespräch oder E-Mail"
            aria-expanded={open}
            tabIndex={pastHero ? undefined : -1}
            className={cn(
              'fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-espresso-800 text-white shadow-[0_10px_30px_-8px_rgba(30,22,17,0.55)] transition-[opacity,transform,box-shadow] duration-700 ease-[var(--ease-soft)] md:bottom-6 md:right-6',
              pastHero ? 'translate-y-0 scale-100 opacity-100 hover:-translate-y-0.5' : 'pointer-events-none translate-y-4 scale-90 opacity-0',
              onDark && 'wa-glow',
              open && 'hidden'
            )}
          >
            <CalendarHeart className="h-6 w-6 text-terra-200" strokeWidth={1.6} aria-hidden="true" />
          </button>
        )}

        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="qc-title"
          className={cn(
            'fixed inset-x-3 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 origin-bottom-right rounded-lg border border-line bg-white shadow-[0_24px_60px_-20px_rgba(30,22,17,0.45)] transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-soft)] md:inset-x-auto md:bottom-6 md:right-6 md:w-[22rem]',
            open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
          )}
        >
          <div className="grain flex items-center gap-3 overflow-hidden rounded-t-lg bg-espresso-800 px-5 py-4 text-white">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 font-serif text-lg italic text-terra-200">JK</span>
            <div className="min-w-0 flex-1">
              <p id="qc-title" className="font-semibold leading-tight">
                {site.owner}
              </p>
              <p className="text-sm text-espresso-200">Antwortet persönlich</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fenster schließen"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
          <div className="p-5">
            <p className="rounded-lg rounded-tl-none bg-stone px-4 py-3 text-[0.9375rem] leading-relaxed text-ink">
              Hallo, ich bin Joana. Sie möchten wissen, ob eine Begleitung zu Ihnen passt? Im kostenlosen Erstgespräch ({site.erstgespraechMin}{' '}
              Minuten) klären wir das gemeinsam.
            </p>
            {termin.startsWith('http') ? (
              <a href={termin} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={buttonClass('primary', 'md', 'mt-4 w-full')}>
                <CalendarHeart className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" /> Erstgespräch buchen
                <span className="sr-only"> (öffnet in neuem Fenster)</span>
              </a>
            ) : (
              <Link href={termin} onClick={() => setOpen(false)} className={buttonClass('primary', 'md', 'mt-4 w-full')}>
                <CalendarHeart className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" /> Erstgespräch anfragen
              </Link>
            )}
            <a href={`mailto:${site.email}`} className={buttonClass('outline', 'md', 'mt-2.5 w-full')}>
              <Mail className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" /> E-Mail schreiben
            </a>
            <p className="mt-3 text-center text-[0.8125rem] text-muted">Unverbindlich, am Telefon oder per Video</p>
          </div>
        </div>
      </PastHeroCtx.Provider>
    </Ctx.Provider>
  )
}

/** Liegt unter dem Punkt (x, y) eine dunkle Fläche? Erste deckende Hintergrundfarbe unter dem Knopf */
function isDarkAt(x: number, y: number, self: HTMLElement) {
  for (const el of document.elementsFromPoint(x, y)) {
    if (self.contains(el)) continue
    const cs = getComputedStyle(el)
    if (cs.opacity === '0' || cs.visibility === 'hidden') continue
    const m = cs.backgroundColor.match(/[\d.]+/g)
    if (!m || (m.length > 3 && Number(m[3]) < 0.5)) continue
    const [r, g, b] = m.map(Number)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 110
  }
  return false
}
