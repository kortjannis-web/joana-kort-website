'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { CalendarHeart, X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/icons'
import { buttonClass } from '@/components/ui/Button'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GOOGLE_RATING } from '@/lib/content/reviews'
import { RueckrufDialog, openRueckruf } from '@/components/forms/RueckrufDialog'
import { CTA_LABEL, ERSTGESPRAECH, site, whatsappHref } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Kontakt: drei runde Knöpfe senkrecht unten rechts (Termin buchen, Rückruf, E-Mail), auf allen Breiten.
 * Telefon heißt Rückruf (Entscheidung 18.10.2026): beide öffnen das Rückruf-Fenster (Name + Nummer, Joana ruft zurück). WhatsApp (über das Menü) ohne Fremd-Skript: kleines Fenster mit Begrüßung und Datenschutzhinweis,
 * erst der Klick auf "Chat starten" öffnet WhatsApp (wa.me). Kein Datenfluss vor dem Klick.
 * Solange es Google-Bewertungen gibt, steht im Hero die Bewertung und der Knopf kommt erst nach dem Hero (wie Vorlage),
 * ohne Bewertungen ist der Knopf von Anfang an da. Ohne Nummer (NEXT_PUBLIC_WHATSAPP) führt "Chat starten" zum Erstgespräch.
 */
const Ctx = createContext<() => void>(() => {})
export const useWhatsApp = () => useContext(Ctx)
/** true, sobald das Sheet den Hero zur Hälfte überdeckt (bzw. immer auf Seiten ohne Bild-Hero) */
const PastHeroCtx = createContext(true)
export const usePastHero = () => useContext(PastHeroCtx)

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  // Startseiten-Intro beim ersten Laden: Bewertung kommt zusammen mit dem Header (globals.css)
  const [intro] = useState(pathname === '/')
  // Im Hero: nur die Google-Bewertung (falls vorhanden). Beim Runterscrollen blendet sie aus, der WhatsApp-Knopf blendet ein
  const [pastHero, setPastHero] = useState(false)
  const showButton = pastHero || GOOGLE_RATING.count === 0
  // Bewertung nur, solange der Hero den Bildschirm füllt (sonst läge sie auf der hellen Fläche)
  const [showRating, setShowRating] = useState(false)
  // Knopf liegt über einer dunklen Fläche (Petrol-Section, Footer): leichtes Leuchten von unten, damit er sichtbar bleibt
  const [onDark, setOnDark] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

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
      // Ohne eigenen transform messen: beim Startseiten-Intro steht das Sheet anfangs tiefer (intro-sheet), die Bewertung soll trotzdem kommen
      const shift = sheet ? new DOMMatrix(getComputedStyle(sheet).transform).m42 : 0
      const top = sheet ? sheet.getBoundingClientRect().top - shift : 0
      const overlap = sheet ? -parseFloat(getComputedStyle(sheet).marginTop) || 0 : 0
      setPastHero(!sheet || top < window.innerHeight * 0.55)
      // Nur solange die Sheet-Kante unten im Bild steht (Hero füllt genau den Viewport). Ragt der Hero darüber hinaus, läge sie über dem Text
      setShowRating(!!sheet && top >= window.innerHeight - overlap - 8 && top <= window.innerHeight - overlap + 6)
    }
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

  return (
    <Ctx.Provider value={() => setOpen(true)}>
      <PastHeroCtx.Provider value={pastHero}>
      {children}

      {/* Google-Bewertung frei schwebend im Hero (ohne Rahmen), mit festem Abstand über der Sheet-Kante (Sterne nie an der Kante). Rechts bündig:
          Handy mit dem CTA (Rand 1,25rem), Tablet nah am Rand, Desktop mit dem Rechner (--wrap-wide-x). -0,25rem gleicht px-1 aus */}
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

      <ContactRail btnRef={btnRef} showFab={showButton} onDark={onDark} hidden={open} />
      <RueckrufDialog />

      <div
        role="dialog"
        aria-modal="false"
        aria-labelledby="wa-title"
        className={cn(
          'fixed inset-x-3 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 origin-bottom-right rounded-lg border border-line bg-white shadow-[0_24px_60px_-20px_rgba(30,22,17,0.45)] transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-soft)] md:inset-x-auto md:bottom-6 md:right-6 md:w-[22rem]',
          open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
        )}
      >
        <div className="flex items-center gap-3 rounded-t-lg bg-espresso-800 px-5 py-4 text-white">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 font-serif text-lg italic text-caramel-200">JK</span>
          <div className="min-w-0 flex-1">
            <p id="wa-title" className="font-semibold leading-tight">
              {site.owner}
            </p>
            <p className="text-sm text-espresso-200">Antwortet persönlich</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Chat-Fenster schließen"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>
        <div className="p-5">
          <p className="rounded-lg rounded-tl-none bg-stone px-4 py-3 text-[0.9375rem] leading-relaxed text-ink">
            {site.whatsapp.greeting}
          </p>
          <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">
            Mit dem Klick auf „Chat starten“ öffnen Sie WhatsApp. Dabei gelten die Datenschutzbestimmungen von WhatsApp.
            Mehr dazu in der{' '}
            <Link href="/datenschutz/" className="link" onClick={() => setOpen(false)}>
              Datenschutzerklärung
            </Link>
            .
          </p>
          <a
            href={whatsappHref()}
            {...(site.whatsapp.number ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onClick={() => setOpen(false)}
            className={buttonClass('dark', 'md', 'mt-4 w-full')}
          >
            <WhatsAppIcon className="h-5 w-5" /> Chat starten
          </a>
          <Link href={ERSTGESPRAECH} onClick={() => setOpen(false)} className={buttonClass('primary', 'md', 'mt-2.5 w-full')}>
            <CalendarHeart className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" /> {CTA_LABEL}
          </Link>
        </div>
      </div>
      </PastHeroCtx.Provider>
    </Ctx.Provider>
  )
}

/** Liegt unter dem Punkt (x, y) eine dunkle Fläche? Erste deckende Hintergrundfarbe unter dem Knopf, unsichtbare Ebenen (opacity 0) zählen nicht */
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

/* Eigene runde Symbole (SVG, 24er Raster, Linie 1,7) */
type IconProps = { className?: string }
function IconTermin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="3.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
      <path d="M12 13.4c-.9-1-2.6-.6-2.6.8 0 1.3 2.6 2.8 2.6 2.8s2.6-1.5 2.6-2.8c0-1.4-1.7-1.8-2.6-.8Z" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconRueckruf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.2 4h3l1.5 4-2 1.3a10.5 10.5 0 0 0 5 5l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3.2 6.2 2 2 0 0 1 5.2 4Z" />
      <path d="M15 3.5a5.5 5.5 0 0 1 5.5 5.5M15 7a2 2 0 0 1 2 2" />
    </svg>
  )
}
function IconMail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </svg>
  )
}

/** Kontaktwege unten rechts (Reihenfolge von oben: Termin, Rückruf, E-Mail). Ohne href: öffnet das Rückruf-Fenster */
const RAIL_ITEMS: { label: string; href?: string; Icon: (p: IconProps) => React.ReactElement; tone: string }[] = [
  { label: 'Termin buchen', href: ERSTGESPRAECH, Icon: IconTermin, tone: 'btn-cta' },
  { label: 'Rückruf anfordern', Icon: IconRueckruf, tone: 'bg-espresso-800 text-white ring-1 ring-white/15 hover:bg-espresso-700' },
  { label: 'E-Mail schreiben', href: `mailto:${site.email}`, Icon: IconMail, tone: 'bg-white text-espresso-800 ring-1 ring-espresso-800/10 hover:bg-caramel-50' },
]

/**
 * Drei runde Kontakt-Knöpfe, senkrecht übereinander unten rechts (alle Breiten): Termin buchen (Knopf-Braun), Rückruf (Espresso), E-Mail (weiß).
 * Ab Laptop gleitet beim Hover links die Beschriftung heraus. Über dunklen Flächen leuchten sie leicht (wa-glow).
 */
function ContactRail({ btnRef, showFab, onDark, hidden }: { btnRef: React.RefObject<HTMLButtonElement | null>; showFab: boolean; onDark: boolean; hidden: boolean }) {
  return (
    <nav
      aria-label="Kontakt"
      className={cn(
        'fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 flex flex-col items-center gap-2.5 transition-[opacity,transform] duration-700 ease-[var(--ease-soft)] md:bottom-6 md:right-6 md:gap-3',
        showFab && !hidden ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      )}
    >
      {RAIL_ITEMS.map((it, i) => {
        const cls = cn(
          'group relative grid h-12 w-12 place-items-center rounded-full shadow-[0_10px_26px_-10px_rgba(30,22,17,0.55)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 md:h-[3.25rem] md:w-[3.25rem]',
          it.tone,
          onDark && 'wa-glow'
        )
        const inner = (
          <>
            <it.Icon className="h-[1.375rem] w-[1.375rem]" />
            <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full bg-espresso-800 px-3.5 py-2 text-[0.8125rem] font-semibold text-white opacity-0 shadow-[0_8px_20px_-8px_rgba(20,14,10,0.5)] transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 xl:block">
              {it.label}
            </span>
            <span className="sr-only">{it.label}</span>
          </>
        )
        if (!it.href)
          return (
            <button key={it.label} ref={i === 1 ? btnRef : undefined} type="button" onClick={openRueckruf} tabIndex={showFab ? undefined : -1} className={cls}>
              {inner}
            </button>
          )
        return it.href.startsWith('/') ? (
          <Link key={it.label} href={it.href} tabIndex={showFab ? undefined : -1} className={cls}>
            {inner}
          </Link>
        ) : (
          <a key={it.label} href={it.href} tabIndex={showFab ? undefined : -1} className={cls}>
            {inner}
          </a>
        )
      })}
    </nav>
  )
}
