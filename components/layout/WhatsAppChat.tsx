'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { CalendarHeart, Mail, MessageCircle, MessageSquareText, X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/icons'
import { buttonClass } from '@/components/ui/Button'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GOOGLE_RATING } from '@/lib/content/reviews'
import { CTA_LABEL, ERSTGESPRAECH, site, whatsappHref } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Kontaktleiste (Briefing Ä6): ab Laptop fest am rechten Rand (Erstgespräch, E-Mail, Kontaktformular, WhatsApp), Beschriftung gleitet beim
 * Hover heraus. Handy/Tablet: ein Knopf unten rechts öffnet dieselben vier Wege (verdeckt keinen Inhalt). Kein Anruf-Knopf.
 * WhatsApp ohne Fremd-Skript: kleines Fenster mit Begrüßung und Datenschutzhinweis,
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

      <ContactRail btnRef={btnRef} showFab={showButton} onDark={onDark} hidden={open} openWhatsApp={() => setOpen(true)} />

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
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white/10 font-serif text-lg text-caramel-200">JK</span>
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10"
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

/** Kontaktwege der Leiste (Reihenfolge = Wichtigkeit) */
function useContactItems(openWhatsApp: () => void) {
  return [
    { label: 'Kostenloses Erstgespräch', href: ERSTGESPRAECH, Icon: CalendarHeart },
    { label: 'E-Mail schreiben', href: `mailto:${site.email}`, Icon: Mail },
    { label: 'Kontaktformular', href: '/erstgespraech/#kontaktformular', Icon: MessageSquareText },
    { label: 'WhatsApp', onClick: openWhatsApp, Icon: WhatsAppIcon },
  ] as { label: string; href?: string; onClick?: () => void; Icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[]
}

function ContactRail({
  btnRef,
  showFab,
  onDark,
  hidden,
  openWhatsApp,
}: {
  btnRef: React.RefObject<HTMLButtonElement | null>
  showFab: boolean
  onDark: boolean
  hidden: boolean
  openWhatsApp: () => void
}) {
  const items = useContactItems(openWhatsApp)
  const [menu, setMenu] = useState(false)
  const pathname = usePathname()
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMenu(false), [pathname])
  useEffect(() => {
    if (!menu) return
    const onDoc = (e: MouseEvent) => boxRef.current && !boxRef.current.contains(e.target as Node) && setMenu(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])

  const itemCls = 'flex items-center gap-3'
  const render = (it: (typeof items)[number], cls: string, inner: ReactNode, close?: () => void) =>
    it.href ? (
      it.href.startsWith('mailto:') ? (
        <a key={it.label} href={it.href} className={cls} onClick={close}>
          {inner}
        </a>
      ) : (
        <Link key={it.label} href={it.href} className={cls} onClick={close}>
          {inner}
        </Link>
      )
    ) : (
      <button
        key={it.label}
        type="button"
        className={cls}
        onClick={() => {
          close?.()
          it.onClick?.()
        }}
      >
        {inner}
      </button>
    )

  return (
    <>
      {/* Laptop/Desktop: Leiste am rechten Rand, mittig. Beschriftung gleitet beim Hover/Fokus nach links heraus */}
      <nav
        aria-label="Kontakt"
        className={cn(
          'fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 flex-col overflow-visible rounded-l-xl bg-espresso-800 shadow-[0_12px_30px_-10px_rgba(20,14,10,0.55)] ring-1 ring-white/10 transition-opacity duration-300 min-[80rem]:flex',
          hidden && 'pointer-events-none opacity-0'
        )}
      >
        {items.map((it, i) =>
          render(
            it,
            cn('group relative grid h-12 w-12 place-items-center text-espresso-100 transition-colors duration-300 hover:bg-espresso-700 hover:text-white focus-visible:bg-espresso-700', i === 0 && 'rounded-tl-xl text-caramel-200', i === items.length - 1 && 'rounded-bl-xl', i > 0 && 'border-t border-white/10'),
            <>
              <it.Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.6} />
              <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-sm bg-espresso-800 px-3 py-2 text-[0.8125rem] font-semibold text-white opacity-0 shadow-[0_8px_20px_-8px_rgba(20,14,10,0.5)] transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                {it.label}
              </span>
              <span className="sr-only">{it.label}</span>
            </>
          )
        )}
      </nav>

      {/* Handy/Tablet: Knopf unten rechts, öffnet die vier Wege darüber */}
      <div ref={boxRef} className={cn('fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 md:bottom-6 md:right-6 min-[80rem]:hidden', hidden && 'hidden')}>
        <ul
          className={cn(
            'absolute bottom-full right-0 mb-2 w-60 origin-bottom-right overflow-hidden rounded-md border border-line bg-white py-1 shadow-[0_24px_50px_-18px_rgba(30,22,17,0.5)] transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-soft)]',
            menu ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
          )}
        >
          {items.map((it) => (
            <li key={it.label}>
              {render(
                it,
                cn(itemCls, 'min-h-12 w-full px-4 text-left text-[0.9375rem] font-semibold text-espresso-900 hover:bg-stone'),
                <>
                  <it.Icon className="h-[1.125rem] w-[1.125rem] shrink-0 text-caramel-700" strokeWidth={1.6} />
                  {it.label}
                </>,
                () => setMenu(false)
              )}
            </li>
          ))}
        </ul>
        <button
          ref={btnRef}
          type="button"
          onClick={() => setMenu((v) => !v)}
          aria-label={menu ? 'Kontaktwege schließen' : 'Kontakt aufnehmen'}
          aria-expanded={menu}
          tabIndex={showFab ? undefined : -1}
          className={cn(
            'inline-flex h-14 w-14 items-center justify-center rounded-md bg-espresso-800 text-white shadow-[0_10px_30px_-8px_rgba(30,22,17,0.55)] ring-1 ring-white/15 transition-[opacity,transform,box-shadow] duration-700 ease-[var(--ease-soft)]',
            showFab ? 'translate-y-0 scale-100 opacity-100 hover:-translate-y-0.5' : 'pointer-events-none translate-y-4 scale-90 opacity-0',
            onDark && 'wa-glow'
          )}
        >
          {menu ? <X className="h-6 w-6" strokeWidth={1.75} /> : <MessageCircle className="h-6 w-6" strokeWidth={1.6} />}
        </button>
      </div>
    </>
  )
}
