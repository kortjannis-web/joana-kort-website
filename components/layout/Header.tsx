'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { BookOpen, CalendarDays, Building2, ChevronDown, GraduationCap, Layers, Mail, MonitorPlay, User, Wrench } from 'lucide-react'
import { Logo } from './Logo'
import { MAIN_NAV, type NavGroup } from './nav'
import { MobileMenu } from './MobileMenu'
import { CTA_LABEL, ERSTGESPRAECH, site } from '@/lib/site'
import { cn } from '@/lib/utils'

/** Symbole im Dropdown (Kachel links neben dem Eintrag) */
const ICONS: Record<string, typeof User> = {
  '/stresscoaching/': User,
  '/webinar/': MonitorPlay,
  '/stressmanagement-unternehmen/': Building2,
  '/mein-ansatz/': Layers,
  '/methoden/': Wrench,
  '/stress-verstehen/': BookOpen,
  '/joana-kort/': User,
  '/qualifikationen-und-referenzen/': GraduationCap,
}

/**
 * Header-CTA "Kostenloses Erstgespräch" bzw. "Termin buchen" mit Kalender-Symbol (Anrufen nur über den Telefon-Knopf unten rechts). Steht auf der Seite ein Funnel (Startseite), scrollt der Klick
 * dorthin und lässt ihn aufleuchten, sonst führt er zur Erstgespräch-Seite.
 */
function CtaLink({ className, children, tabIndex, hidden }: { className: string; children: React.ReactNode; tabIndex?: number; hidden?: boolean }) {
  return (
    <Link
      href={ERSTGESPRAECH}
      aria-label={hidden ? undefined : CTA_LABEL}
      className={className}
      tabIndex={tabIndex}
      aria-hidden={hidden}
      onClick={(e) => {
        const target = Array.from(document.querySelectorAll<HTMLElement>('[data-funnel-anchor]')).find((el) => el.offsetParent !== null)
        if (!target) return
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.dispatchEvent(new CustomEvent('jk:funnel-call'))
      }}
    >
      {children}
    </Link>
  )
}

/**
 * Header (Aufbau wie Vorlage, hell): Textlogo links, Navigation als Glas-Leiste in der Mitte (E-Mail am Ende), "Kostenloses Erstgespräch" rechts.
 * Ganz oben über dem hellen Hero transparent, sobald gescrollt wird Papier mit feiner Linie und Schatten.
 * Handy: feste Pille mit E-Mail + Menü, nichts fährt aus (Entscheidung 22.10.2026). Termin buchen steht unten rechts bei den Kontakt-Knöpfen.
 */
export function Header() {
  const pathname = usePathname()
  const [solid, setSolid] = useState(false)
  // Intro nur beim ersten Laden direkt auf der Startseite (globals.css)
  const [intro] = useState(pathname === '/')

  useEffect(() => {
    // Hell hinterlegt, sobald gescrollt wird: der Hero läuft ohne Überlappung normal unter dem Header durch
    const onScroll = () => setSolid(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-soft)]',
        solid ? 'bg-paper/90 shadow-[0_1px_0_var(--color-line),0_12px_26px_-14px_rgba(30,22,17,0.28)] backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <div className="wrap-wide flex h-16 items-center justify-between gap-2 min-[380px]:gap-4 md:h-[4.5rem] xl:grid xl:h-[5.25rem] xl:grid-cols-[1fr_auto_1fr] xl:gap-6">
        <Link href="/" aria-label="Joana Kort Stressberatung, zur Startseite" className="-ml-1 shrink-0 justify-self-start rounded-md p-1">
          <Logo draw={intro} />
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className={cn(
            intro && 'intro-down [--d:0.5s]',
            'relative hidden items-center gap-0.5 rounded-full border p-[5px] transition-[background-color,border-color,box-shadow] duration-500 xl:flex',
            solid
              ? 'border-line bg-white/85 shadow-[0_2px_4px_rgba(30,22,17,0.06),0_9px_18px_-8px_rgba(30,22,17,0.3)]'
              : 'border-espresso-800/10 bg-white/55 shadow-[0_8px_24px_-14px_rgba(30,22,17,0.25)] backdrop-blur-[14px]'
          )}
        >
          <ul className="flex items-center gap-0.5">
            {MAIN_NAV.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <NavDropdown item={item} pathname={pathname} />
                ) : (
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={cn('inline-flex h-10 items-center rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-300', pillLink(pathname === item.href))}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${site.email}`}
            aria-label={`E-Mail schreiben: ${site.email}`}
            className="group ml-2 grid h-10 w-10 place-items-center rounded-full bg-espresso-800/[0.06] text-espresso-800 transition-colors duration-300 hover:bg-espresso-800/[0.12]"
          >
            <Mail className="h-[1.125rem] w-[1.125rem] transition-transform duration-300 group-hover:-rotate-6" strokeWidth={1.8} />
          </a>
        </nav>

        <div className={cn(intro && 'intro-down [--d:0.6s]', 'flex items-center gap-2 justify-self-end md:gap-3')}>
          {/* Tablet und Desktop: Erstgespräch immer sichtbar */}
          <CtaLink className="btn-cta group hidden h-[3.25rem] items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[0.9375rem] font-semibold transition-[background-color,transform,box-shadow] duration-300 md:inline-flex">
            <CalendarDays className="h-[1.0625rem] w-[1.0625rem] shrink-0" strokeWidth={1.9} aria-hidden="true" />
            <span className="xl:hidden">Termin buchen</span>
            <span className="hidden xl:inline">{CTA_LABEL}</span>
          </CtaLink>
          {/* Handy/Tablet: Pille mit E-Mail + Menü */}
          <div className="shrink-0 xl:hidden">
            <div
              className={cn(
                'flex items-center gap-1 rounded-full border p-1 shadow-[0_8px_22px_-10px_rgba(30,22,17,0.4)] transition-[background-color,border-color] duration-500 md:gap-1.5 md:shadow-none',
                solid ? 'border-line bg-white/85' : 'border-espresso-800/10 bg-white/60 backdrop-blur-[14px]'
              )}
            >
              <a href={`mailto:${site.email}`} aria-label={`E-Mail schreiben: ${site.email}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-espresso-800">
                <Mail className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={1.8} />
              </a>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function pillLink(active: boolean) {
  return active ? 'bg-espresso-800 text-white' : 'text-ink/80 hover:bg-espresso-800/[0.06] hover:text-espresso-800'
}

function NavDropdown({ item, pathname }: { item: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const active = pathname === item.href || item.children?.some((c) => c.href === pathname) || item.extra?.links.some((l) => l.href === pathname)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  const enter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 140)
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        aria-expanded={open}
        onClick={(e) => {
          const pt = (e.nativeEvent as PointerEvent).pointerType
          setOpen((v) => (pt === 'mouse' ? true : !v))
        }}
        className={cn('inline-flex h-10 items-center gap-1 rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-300', pillLink(!!active))}
      >
        {item.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')} strokeWidth={1.75} />
      </button>

      <div
        className={cn(
          'absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-[opacity,transform] duration-200 ease-[var(--ease-soft)]',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        )}
      >
        <span aria-hidden="true" className="absolute left-1/2 top-[0.6rem] h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-[2px] bg-white" />
        <div className={cn('floaty-lg relative grid gap-2 rounded-[1.5rem] bg-white p-4', item.extra ? 'w-[40rem] grid-cols-[1.25fr_1fr]' : 'w-[22rem] grid-cols-1')}>
          <ul className="flex flex-col gap-1">
            {item.children!.map((c) => {
              const Icon = ICONS[c.href] ?? User
              return (
                <li key={c.href + c.label}>
                  <Link
                    href={c.href}
                    className={cn('group flex items-start gap-4 rounded-[0.875rem] px-4 py-3.5 transition-colors duration-300 hover:bg-stone', pathname === c.href && 'bg-stone')}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-stone text-caramel-700 transition-colors duration-300 group-hover:bg-white group-hover:text-caramel-800">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold text-espresso-900">{c.label}</span>
                      {c.hint && <span className="mt-0.5 block text-sm text-muted">{c.hint}</span>}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          {item.extra && (
            <div className="rounded-lg bg-stone px-5 py-5">
              <p className="t-label text-[0.75rem] text-caramel-700">{item.extra.title}</p>
              <ul className="mt-2">
                {item.extra.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="flex min-h-9 items-center gap-2 text-[0.9375rem] text-ink hover:text-caramel-800">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
