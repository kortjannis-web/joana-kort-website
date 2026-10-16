'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef } from 'react'

/**
 * Sprungziele bei interner Navigation (Stapeleffekt-fest):
 * - neuer Pfad ohne Anker: sofort ganz oben (Hero)
 * - neuer Pfad mit Anker: sofort am Ziel, Abstand wie beim Browser (scroll-padding-top + scroll-margin-top)
 * - Link auf die aktuelle Seite (z. B. Logo auf der Startseite): weich nach oben bzw. zum Anker
 * - Zurück/Vorwärts (popstate): nichts tun, der Browser stellt die alte Position wieder her
 *
 * Warum nötig: Next.js scrollt nach einer Navigation nur, wenn das erste Element der neuen Seite NICHT im Viewport
 * liegt. Das erste Element ist der Bild-Hero (StackBack, sticky top-0), seine Oberkante steht immer bei 0, also
 * scrollt Next nicht und man bleibt auf der alten Scrollhöhe (z. B. im Footer). Anker-Sprünge messen außerdem das
 * festgeklebte, verkleinerte <main> (sticky + scale), wenn man im Footer klickt, und landen daneben.
 */
export function RouteScroll() {
  const pathname = usePathname()
  const prevPath = useRef(pathname)
  const fromHistory = useRef(false)

  // Seite ist hydriert: ab jetzt steuert Framer Motion das Einblenden (Notfall-Einblenden in globals.css aus)
  useEffect(() => {
    document.documentElement.dataset.hydrated = ''
  }, [])

  // Klicks auf Links zur aktuellen Seite selbst übernehmen (Next scrollt dort nicht bzw. mit falschem Versatz)
  useEffect(() => {
    const onPop = () => {
      fromHistory.current = true
    }
    const onClick = (e: MouseEvent) => {
      fromHistory.current = false
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href]')
      if (!(a instanceof HTMLAnchorElement)) return
      if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return
      // Reine Sprungmarken (href="#…") und Links im Menü-Dialog behalten ihr eigenes Verhalten
      if ((a.getAttribute('href') ?? '').startsWith('#') || a.closest('[role="dialog"]')) return
      const url = new URL(a.href, window.location.href)
      const here = window.location
      if (url.origin !== here.origin || url.pathname !== here.pathname || url.search !== here.search) return

      e.preventDefault()
      const behavior = smooth()
      if (url.hash.length > 1) {
        if (url.hash !== here.hash) window.history.pushState(null, '', url.hash)
        scrollToHash(url.hash, behavior)
      } else {
        if (here.hash) window.history.pushState(null, '', url.pathname + url.search)
        window.scrollTo({ top: 0, left: 0, behavior })
      }
    }
    window.addEventListener('popstate', onPop)
    // Capture auf window: läuft vor dem onClick von next/link (der bei defaultPrevented nichts mehr tut)
    window.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('click', onClick, true)
    }
  }, [])

  // Pfadwechsel: vor dem Zeichnen an die richtige Stelle (nach dem eigenen Scroll von Next im selben Commit)
  useLayoutEffect(() => {
    // Erster Aufruf (auch Strict-Mode-Wiederholung) und gleicher Pfad: nichts tun
    if (prevPath.current === pathname) return
    prevPath.current = pathname
    // Ab der ersten internen Navigation kein langes Startseiten-Intro mehr (--intro-base in globals.css)
    document.documentElement.dataset.navigated = ''
    if (fromHistory.current) {
      fromHistory.current = false
      return
    }
    const hash = window.location.hash
    if (hash.length > 1 && scrollToHash(hash, 'instant')) {
      // Nach dem ersten Layout (Schriften, Bilder) einmal nachjustieren
      const raf = requestAnimationFrame(() => scrollToHash(hash, 'instant'))
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function smooth(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
}

function scrollToHash(hash: string, behavior: ScrollBehavior) {
  let id = hash.slice(1)
  try {
    id = decodeURIComponent(id)
  } catch {}
  const el = document.getElementById(id)
  if (!el) return false
  const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  window.scrollTo({ top: Math.max(0, Math.round(naturalTop(el) - pad - margin)), left: 0, behavior })
  return true
}

/**
 * Position des Elements im Dokument, wie ohne Stapeleffekt: sticky Vorfahren (<main>, Hero) und Transforms
 * (Zurückweichen, Reveal, Parallax) werden kurz neutralisiert, gemessen und sofort zurückgesetzt (kein Frame dazwischen).
 */
function naturalTop(el: HTMLElement) {
  const touched: { n: HTMLElement; style: string | null }[] = []
  for (let n: HTMLElement | null = el; n && n !== document.body; n = n.parentElement) {
    const cs = getComputedStyle(n)
    const moved =
      cs.position === 'sticky' ||
      cs.transform !== 'none' ||
      (cs.getPropertyValue('translate') || 'none') !== 'none' ||
      (cs.getPropertyValue('scale') || 'none') !== 'none'
    if (!moved) continue
    touched.push({ n, style: n.getAttribute('style') })
    n.style.setProperty('transition', 'none', 'important')
    n.style.setProperty('transform', 'none', 'important')
    n.style.setProperty('translate', 'none', 'important')
    n.style.setProperty('scale', 'none', 'important')
    if (cs.position === 'sticky') n.style.setProperty('position', 'static', 'important')
  }
  const top = el.getBoundingClientRect().top + window.scrollY
  // Zurücksetzen: erst ohne Transition einmal rechnen lassen, damit kein Übergang von "none" zurück startet
  for (const { n, style } of touched) n.setAttribute('style', `${style ?? ''};transition:none !important`)
  if (touched.length) void document.body.offsetHeight
  for (const { n, style } of touched) {
    if (style === null) n.removeAttribute('style')
    else n.setAttribute('style', style)
  }
  return top
}
