'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ComponentProps } from 'react'
import { BookOpen, Building2, CalendarHeart, ChevronDown, ChevronRight, Mail, MonitorPlay, User, Users } from 'lucide-react'
import { Logo } from './Logo'
import { MAIN_NAV, type NavGroup } from './nav'
import { MobileMenu } from './MobileMenu'
import { ERSTGESPRAECH, site } from '@/lib/site'
import { cn } from '@/lib/utils'

/** Seiten OHNE Bild-Hero: Header von Anfang an hell. Alle anderen Seiten haben einen dunklen Bild-Hero (PageHero). */
const SOLID = [/^\/(impressum|datenschutz)\/$/]

/** Erstgespräch: Buchungstool (NEXT_PUBLIC_BOOKING_URL), solange keins eingetragen ist das Anfrageformular */
const TERMIN_HREF = site.bookingUrl || ERSTGESPRAECH
const TERMIN_EXTERN = TERMIN_HREF.startsWith('http')

/** Symbole im Dropdown (Design: Kachel links neben dem Eintrag) */
const ICONS: Record<string, typeof User> = {
  '/stresscoaching/': User,
  '/zu-zweit-und-in-der-gruppe/': Users,
  '/webinar/': MonitorPlay,
  '/online-kurs/': BookOpen,
  '/stressmanagement-unternehmen/': Building2,
}

/**
 * Header (Design): Logo links, Navigation als Glas-Pille in der Mitte (Telefon-Knopf am Ende), CTA rechts.
 * Über dem dunklen Bild-Hero transparent. Sobald sich das Sheet unter den Header schiebt, wird er hell.
 * Mobil/Tablet: Pille mit Telefon + Menü-Knopf.
 */
export function Header() {
  const pathname = usePathname()
  const overlayPage = !SOLID.some((r) => r.test(pathname))
  const [overHero, setOverHero] = useState(overlayPage)
  // Handy: beim Runterscrollen fährt "Erstgespräch" zwischen Telefon und Menü-Knopf aus, die Pille deckt das Logo bis aufs Haus ab. Beim Hochscrollen fährt sie wieder ein
  const [expanded, setExpanded] = useState(false)
  // Breite der ausgeklappten Pille: vom rechten Rand bis kurz hinter das Logo-Haus (gemessen, damit es bei jeder Handybreite passt)
  const slotRef = useRef<HTMLDivElement>(null)
  const [pillW, setPillW] = useState<number | null>(null)
  // Intro nur beim ersten Laden direkt auf der Startseite: Header kommt zuletzt, Logo-Haus zeichnet sich (globals.css)
  const [intro] = useState(pathname === '/')

  useEffect(() => {
    // Toleranz: erst wenn seit dem Wendepunkt (tiefster bzw. höchster Punkt) mehr als TOL px in die neue Richtung gescrollt wurde.
    // Kleine Rückbewegungen (Finger setzt auf, Nachfedern) lassen die Pille stehen
    const TOL = 12
    let turn = window.scrollY
    let down = false
    const onScroll = () => {
      const y = window.scrollY
      if (y <= 80) {
        down = false
        turn = y
        setExpanded(false)
      } else if (down) {
        if (y > turn) turn = y
        else if (turn - y > TOL) { down = false; turn = y; setExpanded(false) }
      } else {
        if (y < turn) turn = y
        else if (y - turn > TOL) { down = true; turn = y; setExpanded(true) }
      }
      const sheet = document.querySelector('[data-sheet]')
      if (!sheet) return setOverHero(false)
      // Header ist 4 bis 5rem hoch: hell, sobald die Sheet-Kante darunter angekommen ist
      setOverHero(sheet.getBoundingClientRect().top > 56)
    }
    setExpanded(false)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  useEffect(() => {
    const measure = () => {
      const house = document.querySelector('header svg')
      const slot = slotRef.current
      if (!house || !slot) return
      setPillW(Math.round(slot.getBoundingClientRect().right - house.getBoundingClientRect().right - 2))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [pathname])

  const transparent = overlayPage && overHero

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-soft)]',
        // Hell: feine Linie plus weicher, tiefer Schatten nach unten, damit der Kasten über dem Inhalt schwebt
        transparent ? 'bg-transparent' : 'bg-paper/90 shadow-[0_1px_0_var(--color-line),0_12px_26px_-14px_rgba(30,22,17,0.32)] backdrop-blur-md'
      )}
    >
      <div className={cn('wrap-wide flex h-16 items-center justify-between gap-2 min-[380px]:gap-4 md:h-[4.5rem] xl:grid xl:h-[5.25rem] xl:grid-cols-[1fr_auto_1fr] xl:gap-6')}>
        <Link href="/" aria-label="Joana Kort Stressberatung, zur Startseite" className="-ml-1 shrink-0 justify-self-start rounded-md p-1">
          <Logo tone={transparent ? 'light' : 'dark'} draw={intro} />
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className={cn(
            intro && 'intro-down [--d:0.54s] xl:[--d:0.99s]',
            'relative hidden items-center gap-0.5 rounded-full border p-[5px] transition-[background-color,border-color,box-shadow] duration-500 xl:flex',
            transparent
              ? 'border-white/18 bg-white/10 shadow-none backdrop-blur-[14px]'
              : 'border-line bg-white/80 shadow-[0_2px_4px_rgba(30,22,17,0.07),0_9px_18px_-8px_rgba(30,22,17,0.34)]'
          )}
        >
          <ul className="flex items-center gap-0.5">
            {MAIN_NAV.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <NavDropdown item={item} transparent={transparent} pathname={pathname} />
                ) : (
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={cn(
                      'inline-flex h-10 items-center rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors duration-300',
                      pillLink(transparent, pathname === item.href)
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          {/* E-Mail am Ende der Pille, mit Abstand zu "Kontakt" */}
          <a
            href={`mailto:${site.email}`}
            aria-label={`E-Mail schreiben: ${site.email}`}
            className={cn(
              'group ml-2.5 grid h-10 w-10 place-items-center rounded-full transition-colors duration-300',
              transparent ? 'bg-white/14 text-white hover:bg-white/24' : 'bg-espresso-800/[0.06] text-espresso-800 hover:bg-espresso-800/[0.12]'
            )}
          >
            <Mail className="h-[1.125rem] w-[1.125rem] transition-transform duration-300 group-hover:-rotate-6" strokeWidth={1.8} />
          </a>
        </nav>

        {/* Intro: Logo zuerst (zeichnet sich), Navigation und Aktionen erst nach Text und Rechner */}
        <div className={cn(intro && 'intro-down [--d:0.54s] xl:[--d:0.99s]', 'flex items-center gap-2 justify-self-end md:gap-3')}>
          {/* Tablet: Pille wie bisher (immer sichtbar: über dem Hero als Glas, danach weiß mit orangem Rand) */}
          <TerminLink
            className={cn(
              'hidden h-[3.375rem] items-center justify-center whitespace-nowrap rounded-full border px-6 text-[0.9375rem] font-semibold transition-[background-color,border-color,color] duration-500 ease-[var(--ease-soft)] md:inline-flex xl:hidden',
              transparent
                ? 'border-white/50 bg-white/45 text-white backdrop-blur-[14px] hover:bg-white/55'
                : 'border-terra-400 bg-white text-espresso-800 hover:bg-terra-50'
            )}
          >
            Erstgespräch
          </TerminLink>
          {/* Desktop: erst sichtbar, wenn der Header hell ist (Hero verlassen). Wächst aus einem Punkt in der Mitte zur Pille auf (clip-path,
              wie auf dem Handy aus dem Menü-Kreis). Der Schatten liegt als drop-shadow auf der Hülle, weil clip-path ihn am Button abschneiden würde */}
          <span className="hidden xl:block [filter:drop-shadow(0_8px_9px_rgba(20,14,10,0.3))]">
            <TerminLink
              tabIndex={transparent ? -1 : 0}
              aria-hidden={transparent}
              className={cn(
                'inline-flex h-[3.25rem] w-[12.5rem] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cta text-[0.9375rem] font-semibold text-white hover:bg-cta-hover',
                'transition-[clip-path,visibility,background-color] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150',
                transparent
                  ? 'pointer-events-none invisible [clip-path:inset(calc(50%_-_0.375rem)_round_9999px)]'
                  : 'visible [clip-path:inset(0_round_9999px)]'
              )}
            >
              <CalendarHeart className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={1.8} aria-hidden="true" />
              Erstgespräch
            </TerminLink>
          </span>
          {/* Handy/Tablet: Pille mit Telefon + Menü (Design). Handy: fester Platz (Slot), die Pille wächst darin nach links über das Logo
              (Breite `--pill-w`, gemessen: bis 2 px hinter das Logo-Haus) */}
          <div ref={slotRef} className="relative h-[3.375rem] w-[6.5rem] shrink-0 md:h-auto md:w-auto xl:hidden">
            <div
              style={pillW ? ({ '--pill-w': `${pillW}px` } as React.CSSProperties) : undefined}
              className={cn(
                'relative flex items-center rounded-full border p-1 max-md:shadow-[0_8px_22px_-10px_rgba(30,22,17,0.5)] max-md:absolute max-md:right-0 max-md:top-0 max-md:z-10 max-md:h-[3.375rem] md:gap-1.5',
                'max-md:transition-[width,background-color,border-color,box-shadow] max-md:duration-[650ms] max-md:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:max-md:duration-150',
                expanded
                  ? 'border-line bg-white max-md:w-[var(--pill-w,17rem)] '
                  : cn('max-md:w-[6.5rem]', transparent ? 'border-white/18 bg-white/12 backdrop-blur-[14px]' : 'border-line bg-white/80')
              )}
            >
              <a
                href={`mailto:${site.email}`}
                aria-label={`E-Mail schreiben: ${site.email}`}
                className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-full', transparent && !expanded ? 'text-white' : 'text-espresso-800')}
              >
                <Mail className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={1.8} />
              </a>
              {/* Handy: Erstgespräch liegt unter dem Menü-Kreis und fährt aus ihm heraus: rechts am Menü-Knopf verankert, die Breite wächst mit
                  der Pille (44 px = ganz unter dem Kreis bis Pille minus 60 px = bis kurz hinter das Telefon). Der Inhalt steht fest, die runde
                  linke Kante des Buttons gibt ihn frei bzw. nimmt ihn beim Einfahren mit in den Kreis */}
              <TerminLink
                tabIndex={expanded ? 0 : -1}
                aria-hidden={!expanded}
                className={cn(
                  'absolute right-1 top-1 h-11 overflow-hidden rounded-full bg-cta text-[0.9375rem] font-semibold text-white shadow-[0_6px_14px_-6px_rgba(20,14,10,0.5)] hover:bg-cta-hover md:hidden',
                  'transition-[width,background-color,visibility] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150',
                  expanded ? 'visible w-[calc(var(--pill-w,17rem)-60px)]' : 'pointer-events-none invisible w-11'
                )}
              >
                <span className="absolute inset-y-0 right-11 flex w-[calc(var(--pill-w,17rem)-104px)] items-center justify-center gap-2 whitespace-nowrap">
                  <CalendarHeart className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  Erstgespräch
                </span>
              </TerminLink>
              <span className="relative z-10 ml-auto shrink-0">
                <MobileMenu />
              </span>
            </div>
          </div>
        </div>
      </div>

    </header>
  )
}

/** Link auf die Terminbuchung: intern per next/link (Kontaktseite), mit Buchungstool in neuem Fenster */
function TerminLink({ className, children, ...rest }: Omit<ComponentProps<'a'>, 'href'>) {
  const sr = TERMIN_EXTERN ? <span className="sr-only"> (öffnet in neuem Fenster)</span> : null
  if (TERMIN_EXTERN)
    return (
      <a href={TERMIN_HREF} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
        {children}
        {sr}
      </a>
    )
  return (
    <Link href={TERMIN_HREF} className={className} {...rest}>
      {children}
    </Link>
  )
}

function pillLink(transparent: boolean, active: boolean) {
  if (transparent) return active ? 'bg-white text-espresso-900' : 'text-white hover:bg-white/14'
  return active ? 'bg-espresso-800 text-white' : 'text-ink/80 hover:bg-espresso-800/[0.06] hover:text-espresso-800'
}

function NavDropdown({ item, transparent, pathname }: { item: NavGroup; transparent: boolean; pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const active = item.children?.some((c) => c.href === pathname) || item.extra?.links.some((l) => l.href === pathname)

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
          // Maus: Hover öffnet bereits, Klick soll nicht wieder schließen. Tastatur/Touch: umschalten.
          const pt = (e.nativeEvent as PointerEvent).pointerType
          setOpen((v) => (pt === 'mouse' ? true : !v))
        }}
        className={cn(
          'inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors duration-300',
          pillLink(transparent, !!active)
        )}
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
        <div
          className={cn(
            'floaty-lg relative grid gap-2 rounded-[1.5rem] bg-white p-4',
            item.extra ? 'w-[45rem] grid-cols-2' : 'w-[22rem] grid-cols-1'
          )}
        >
          <ul className="flex flex-col gap-1">
            {item.children!.map((c) => {
              const Icon = ICONS[c.href] ?? User
              return (
                <li key={c.href + c.label}>
                  <Link
                    href={c.href}
                    className={cn(
                      'group flex items-start gap-4 rounded-[0.875rem] px-4 py-3.5 transition-colors duration-300 hover:bg-stone',
                      pathname === c.href && 'bg-stone'
                    )}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-stone text-caramel-700 transition-colors duration-300 group-hover:bg-terra-50 group-hover:text-terra-600">
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
              <ul className="mt-2 grid gap-x-4">
                {item.extra.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="flex min-h-9 items-center gap-2 text-[0.9375rem] text-ink hover:text-terra-700">
                      <ChevronRight className="h-3.5 w-3.5 text-caramel-500" strokeWidth={2} aria-hidden="true" />
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
