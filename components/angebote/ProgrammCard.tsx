'use client'

import { useId, useState } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { RABATT_LANG, SCHWERPUNKTE, type Programm } from '@/lib/content/angebote'
import { CTA_LABEL } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * Programmkarte mit Schalter "Laufzeit verdoppeln": gleicher Rhythmus, doppelte Laufzeit, RABATT_LANG % auf jede Sitzung.
 * Ohne JS steht die Grundlaufzeit da, der Hinweis zur Verlängerung steht immer unter dem Schalter.
 */
export function ProgrammCard({ p, dark = false, href }: { p: Programm; dark?: boolean; href: string }) {
  const [lang, setLang] = useState(false)
  const id = useId()
  const v = lang ? p.lang : p.kurz
  const muted = dark ? 'text-espresso-200' : 'text-muted'
  const accent = dark ? 'text-caramel-300' : 'text-caramel-700'

  return (
    <article
      className={cn(
        'floaty-lg flex h-full flex-col rounded-xl p-4 md:p-[clamp(1.25rem,3.5svh,2rem)]',
        dark ? 'grain overflow-hidden bg-espresso-800 text-white' : 'bg-white'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className={cn('t-label', accent)}>{p.untertitel}</p>
        <span
          aria-hidden={!lang}
          className={cn(
            'shrink-0 rounded-sm px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] transition-[opacity,transform] duration-500 ease-[var(--ease-lift)]',
            dark ? 'bg-caramel-300 text-espresso-900' : 'bg-espresso-800 text-white',
            lang ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
          )}
        >
          {RABATT_LANG} % pro Sitzung
        </span>
      </div>
      <h3 className="mt-2 font-serif text-[clamp(2rem,1.2rem+3svh,3.2rem)] leading-none" aria-live="polite">
        <span key={v.monate} className={cn('prog-num inline-block', accent)}>
          {v.monate}
        </span>{' '}
        Monate
      </h3>

      <ul className={cn('mt-[clamp(0.625rem,2svh,1.5rem)] divide-y border-y', dark ? 'divide-white/12 border-white/12' : 'divide-line border-line')}>
        {[
          ['Rhythmus', p.rhythmus],
          ['Dauer', p.dauer],
          ['Umfang', v.sitzungen],
        ].map(([k, val]) => (
          <li key={k} className="flex justify-between gap-4 py-[clamp(0.4rem,1.2svh,0.75rem)] text-[0.9375rem]">
            <span className={muted}>{k}</span>
            <span className="text-right font-semibold">{val}</span>
          </li>
        ))}
      </ul>

      {/* Schalter: Laufzeit verdoppeln */}
      <label
        htmlFor={id}
        className={cn(
          'mt-[clamp(0.625rem,1.8svh,1.25rem)] flex cursor-pointer items-center justify-between gap-4 rounded-md border px-3.5 py-2 transition-colors duration-300',
          dark ? 'border-white/15 hover:border-white/30' : 'border-line hover:border-espresso-800/40',
          lang && (dark ? 'border-caramel-300/60 bg-white/[0.04]' : 'border-espresso-800/60 bg-stone')
        )}
      >
        <span className="min-w-0">
          <span className="block text-[0.9375rem] font-semibold leading-snug">Laufzeit verdoppeln</span>
          <span className={cn('block text-[0.8125rem] leading-snug', muted)}>
            {p.lang.monate} Monate, {RABATT_LANG} % Rabatt auf jede Sitzung
          </span>
        </span>
        <span className="relative shrink-0">
          <input id={id} type="checkbox" role="switch" checked={lang} onChange={(e) => setLang(e.target.checked)} className="peer sr-only" />
          <span
            aria-hidden="true"
            className={cn(
              'block h-6 w-11 rounded-full transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-caramel-600',
              lang ? (dark ? 'bg-caramel-300' : 'bg-espresso-800') : dark ? 'bg-white/20' : 'bg-espresso-200'
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(20,14,10,0.35)] transition-transform duration-300 ease-[var(--ease-lift)]',
              lang && 'translate-x-5'
            )}
          />
        </span>
      </label>

      <ol className="mt-[clamp(0.625rem,2svh,1.5rem)] grid flex-1 grid-cols-3 content-start gap-2 max-md:hidden" aria-label="Aufbau">
        {SCHWERPUNKTE.map((s, i) => (
          <li key={s.title}>
            <span className="block h-1.5 rounded-sm" style={{ background: ['#e6d3b8', '#c09a70', '#8f6a44'][i] }} />
            <span className={cn('mt-2 block text-[0.75rem]', muted)}>{v.phasen[i]}</span>
            <span className="block text-[0.8125rem] font-semibold leading-tight md:text-[0.875rem]">{s.title}</span>
          </li>
        ))}
      </ol>
      <p className={cn('mt-[clamp(0.625rem,2svh,1.5rem)] flex-1 text-[0.9375rem] leading-relaxed max-md:hidden lowtab:hidden lowdesk:hidden md:text-base', dark ? 'text-espresso-100/90' : 'text-ink/85')}>{p.fuer}</p>
      <ButtonLink href={href} variant="primary" className="group mt-[clamp(0.75rem,2.5svh,1.75rem)] w-full">
        {CTA_LABEL}
      </ButtonLink>
    </article>
  )
}
