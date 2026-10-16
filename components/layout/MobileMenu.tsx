'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CalendarHeart, ChevronDown, ChevronRight, Mail, Menu, X } from 'lucide-react'
import { MAIN_NAV } from './nav'
import { Logo } from './Logo'
import { buttonClass } from '@/components/ui/Button'
import { ERSTGESPRAECH, site } from '@/lib/site'

/** Menü für Handy/Tablet: dunkle Espresso-Fläche, Angebote als Akkordeon, Erstgespräch und E-Mail unten */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const terminHref = site.bookingUrl || ERSTGESPRAECH

  useEffect(() => setOpen(false), [pathname])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Menü öffnen"
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-espresso-900 shadow-[0_2px_8px_-2px_rgba(30,22,17,0.25)] transition-transform duration-300 active:scale-95"
      >
        <Menu className="h-5 w-5" strokeWidth={1.8} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-espresso-950/50 data-[state=open]:animate-[fade-in_.2s_ease-out]" />
        <Dialog.Content
          className="grain fixed inset-0 z-50 flex flex-col overflow-y-auto bg-espresso-950 text-white outline-none data-[state=open]:animate-[fade-in_.25s_var(--ease-soft)] md:inset-y-0 md:left-auto md:w-full md:max-w-md md:data-[state=open]:animate-[slide-in_.32s_var(--ease-drawer)]"
          aria-describedby={undefined}
          // Link auf die aktuelle Seite: kein Pfadwechsel, Menü trotzdem schließen
          onClick={(e) => (e.target as HTMLElement).closest('a[href^="/"]') && setOpen(false)}
        >
          <div className="flex min-h-16 items-center justify-between px-5 pt-[env(safe-area-inset-top)] md:min-h-[4.5rem] md:px-8">
            <Link href="/" aria-label="Zur Startseite" className="-ml-1 rounded-md p-1">
              <Logo tone="light" />
            </Link>
            <Dialog.Close
              aria-label="Menü schließen"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/18 bg-white/10 text-white transition-colors hover:bg-white/15"
            >
              <X className="h-5 w-5" strokeWidth={1.8} />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>

          <nav aria-label="Mobile Navigation" className="flex-1 px-5 pb-10 pt-4 md:px-8">
            <ul className="border-t border-white/12">
              {MAIN_NAV.map((item) =>
                item.children ? (
                  <li key={item.label} className="border-b border-white/12">
                    <details className="group" open={item.children.some((c) => c.href === pathname) || item.label === 'Angebote'}>
                      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between font-serif text-[1.75rem] leading-tight">
                        {item.label}
                        <ChevronDown className="h-5 w-5 text-terra-300 transition-transform duration-300 group-open:rotate-180" strokeWidth={1.8} aria-hidden="true" />
                      </summary>
                      <ul className="pb-3.5 pl-0.5 pt-1">
                        {item.children.map((c) => (
                          <li key={c.href + c.label}>
                            <Link href={c.href} className="flex min-h-11 items-center justify-between text-[1rem] text-espresso-200 hover:text-white">
                              {c.label}
                              <ChevronRight className="h-4 w-4 text-caramel-400" strokeWidth={1.8} aria-hidden="true" />
                            </Link>
                          </li>
                        ))}
                        {/* Online und vor Ort: klappt die Links auf */}
                        {item.extra && (
                          <li>
                            <details className="group/orte" open={item.extra.links.some((l) => l.href === pathname)}>
                              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-[1rem] text-espresso-200 hover:text-white">
                                {item.extra.title}
                                <ChevronDown className="h-4 w-4 text-caramel-400 transition-transform duration-300 group-open/orte:rotate-180" strokeWidth={1.8} aria-hidden="true" />
                              </summary>
                              <ul className="mb-1 ml-1 border-l border-white/12 pl-4">
                                {item.extra.links.map((l) => (
                                  <li key={l.href}>
                                    <Link
                                      href={l.href}
                                      aria-current={l.href === pathname ? 'page' : undefined}
                                      className="flex min-h-11 items-center justify-between text-[0.9375rem] text-espresso-200 hover:text-white aria-[current=page]:text-white"
                                    >
                                      {l.label}
                                      <ChevronRight className="h-4 w-4 text-caramel-400" strokeWidth={1.8} aria-hidden="true" />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          </li>
                        )}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={item.label} className="border-b border-white/12">
                    <Link href={item.href} className="flex min-h-16 items-center font-serif text-[1.75rem] leading-tight">
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* Erstgespräch: Buchungstool in neuem Fenster, sonst Anfrageformular */}
            {site.bookingUrl ? (
              <a href={terminHref} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'lg', 'mt-8 w-full')}>
                <CalendarHeart className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" /> Kostenloses Erstgespräch
                <span className="sr-only"> (öffnet in neuem Fenster)</span>
              </a>
            ) : (
              <Link href={terminHref} className={buttonClass('primary', 'lg', 'mt-8 w-full')}>
                <CalendarHeart className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" /> Kostenloses Erstgespräch
              </Link>
            )}
            <a href={`mailto:${site.email}`} className={buttonClass('outline-light', 'lg', 'mt-2.5 w-full')}>
              <Mail className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" /> E-Mail schreiben
            </a>

            <p className="mt-8 text-center font-serif text-[1.0625rem] italic text-caramel-300">{site.slogan}</p>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
