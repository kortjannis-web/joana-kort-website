'use client'

import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { ArrowLeft, Check } from 'lucide-react'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

/* Gemeinsame Formular-Bausteine: Label immer sichtbar, Fehler inline, Touch-Ziele min. 44 px */

export const inputCls =
  'block h-13 w-full rounded-md border border-[#ddd3c6] bg-white px-4 text-base text-ink transition-[border-color,box-shadow] duration-300 ease-[var(--ease-soft)] placeholder:text-muted/70 hover:border-espresso-700/50 focus:border-espresso-700 focus:outline-none focus:ring-3 focus:ring-espresso-700/15'

export function Field({
  label,
  hint,
  id,
  required,
  children,
  className,
}: {
  label: string
  hint?: string
  id: string
  required?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mt-4', className)}>
      <label htmlFor={id} className="mb-2 block text-[0.875rem] font-semibold text-espresso-900">
        {label}
        {required && <span className="text-caramel-700"> *</span>} {hint && <span className="font-normal text-muted">({hint})</span>}
      </label>
      {children}
    </div>
  )
}

export function TextInput(props: ComponentProps<'input'>) {
  return <input {...props} className={cn(inputCls, props.className)} />
}

export function TextArea(props: ComponentProps<'textarea'>) {
  return <textarea {...props} className={cn(inputCls, 'h-auto min-h-32 resize-y py-3', props.className)} />
}

export function Select({ options, placeholder = 'Bitte wählen …', ...props }: ComponentProps<'select'> & { options: string[]; placeholder?: string }) {
  return (
    <select {...props} className={cn(inputCls, props.className)}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  )
}

/**
 * Auswahl-Kachel (Design ".opt"): weiße Fläche, graue Linie, gewählt = Espresso-Rahmen + Radio-Ring.
 * Optional `icon` (lucide, h-4 w-4) in kleiner Beige-Kachel links.
 */
export function ChoiceTile({
  selected,
  onClick,
  title,
  text,
  multi,
  icon,
}: {
  selected: boolean
  onClick: () => void
  title: string
  text?: string
  multi?: boolean
  icon?: ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'group flex min-h-14 w-full items-center gap-3 rounded-md border bg-white px-3.5 py-2.5 text-left transition-[border-color,box-shadow,background-color] duration-300 ease-[var(--ease-soft)] xl:min-h-15',
        selected ? 'border-espresso-800 shadow-[inset_0_0_0_1px_var(--color-espresso-800)]' : 'border-[#ddd3c6] hover:border-espresso-800'
      )}
    >
      {icon && (
        <span
          aria-hidden="true"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-[0.5rem] bg-espresso-50 text-espresso-800 [&>svg]:h-4 [&>svg]:w-4"
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[0.875rem] font-semibold leading-snug text-ink">{title}</span>
        {text && <span className="block pt-0.5 text-[0.8125rem] leading-snug text-muted">{text}</span>}
      </span>
      {multi ? (
        <span
          aria-hidden="true"
          className={cn(
            'grid h-5 w-5 shrink-0 place-items-center rounded border transition-colors duration-300 ease-[var(--ease-soft)]',
            selected ? 'border-espresso-800 bg-espresso-800 text-white' : 'border-[1.5px] border-espresso-200 text-transparent'
          )}
        >
          <Check className="h-3 w-3" strokeWidth={3} />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            'h-5 w-5 shrink-0 rounded-full transition-[border-width,border-color] duration-300 ease-[var(--ease-soft)]',
            selected ? 'border-[6px] border-espresso-800' : 'border-[1.5px] border-espresso-200 group-hover:border-espresso-300'
          )}
        />
      )}
    </button>
  )
}

export function Consent({ checked, onChange, text }: { checked: boolean; onChange: (v: boolean) => void; text?: ReactNode }) {
  return (
    <label className="mt-5 flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-muted">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-espresso-800" />
      <span>
        {text ??
          `Ich bin einverstanden, dass ${site.owner} meine Angaben zur Bearbeitung meiner Anfrage verarbeitet und mich dazu kontaktiert. Ich kann die Einwilligung jederzeit widerrufen.`}{' '}
        Details in der{' '}
        <Link href="/datenschutz/" target="_blank" className="link">
          Datenschutzerklärung
        </Link>
        .
      </span>
    </label>
  )
}

export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
      <label>
        Bitte leer lassen
        <input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  )
}

export function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p role="alert" className="mt-3 min-h-5 text-[0.875rem] text-error">
      {msg}
    </p>
  )
}

export function BackButton({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'mx-auto mt-3 flex min-h-11 items-center gap-1.5 text-[0.875rem] text-muted transition-colors duration-500 ease-[var(--ease-soft)] hover:text-espresso-800',
        className
      )}
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Zurück
    </button>
  )
}

/** Fortschritt: "Schritt x von y" + ein Segment je Schritt (Design), Füllung wächst per scaleX */
export function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-5 flex flex-col gap-2.5">
      <p className="text-[0.8125rem] font-semibold text-caramel-700" aria-live="polite">
        Schritt {step} von {total}
      </p>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }} aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className="h-1 overflow-hidden rounded-full bg-line">
            <span
              className="block h-full origin-left rounded-full bg-caramel-500 transition-transform duration-500 ease-[var(--ease-soft)]"
              style={{ transform: `scaleX(${i < step ? 1 : 0})` }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

/** Schritt-Überschrift. `plain`: serifenlos und halbfett (Kontaktformular im Design), sonst Serif */
export function StepTitle({ children, sub, plain }: { children: ReactNode; sub?: string; plain?: boolean }) {
  return (
    <div className="mb-4">
      <p
        role="heading"
        aria-level={2}
        className={plain ? 'text-[1.1875rem] font-semibold leading-snug text-espresso-900 md:text-[1.3125rem]' : 't-h3 text-espresso-900'}
      >
        {children}
      </p>
      {sub && <p className="mt-1 text-[0.9375rem] text-muted">{sub}</p>}
    </div>
  )
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('floaty relative rounded-lg border border-line bg-white p-5 sm:p-7', className)}>
      {children}
    </div>
  )
}

export async function postJson(url: string, payload: object): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (r.ok) return { ok: true }
    if (r.status === 429)
      return { ok: false, error: `Es wurden zu viele Anfragen gesendet. Bitte versuchen Sie es später erneut oder schreiben Sie an ${site.email}.` }
    if (r.status === 400) return { ok: false, error: 'Bitte prüfen Sie Ihre Angaben.' }
    return { ok: false, error: `Das Senden hat leider nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie an ${site.email}.` }
  } catch {
    return { ok: false, error: `Das Senden hat leider nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie an ${site.email}.` }
  }
}

export const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim())
