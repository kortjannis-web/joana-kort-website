'use client'

import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

/*
 * Gemeinsame Formular-Bausteine im offenen Block (OpenBlock): Felder stehen frei als einzelne, ganz runde weiße Felder,
 * Label immer sichtbar, Fehler inline, Touch-Ziele min. 44 px. Auf dunklen Flächen (OpenBlock tone="dark") werden
 * Labels und Hinweise hell, über group-data-[tone=dark]/ob.
 */

export const inputCls =
  'block h-12 w-full rounded-full border border-white bg-white/90 px-5 text-base text-ink shadow-[0_1px_2px_rgba(30,22,17,0.05),0_8px_20px_-14px_rgba(30,22,17,0.35)] transition-[border-color,box-shadow,background-color] duration-300 ease-[var(--ease-soft)] placeholder:text-muted/70 hover:border-espresso-700/30 focus:border-espresso-700 focus:bg-white focus:outline-none focus:ring-3 focus:ring-espresso-700/15 group-data-[tone=dark]/ob:bg-white'

/** Hinweistext unter Formularen (Datenschutz, Einwilligung): gedämpft, auf Dunkel hell, Links lesbar */
export const noteCls =
  'text-muted group-data-[tone=dark]/ob:text-espresso-200 group-data-[tone=dark]/ob:[&_.link]:text-white group-data-[tone=dark]/ob:[&_.link]:decoration-white/50'

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
    <div className={cn('mt-3.5', className)}>
      <label htmlFor={id} className="mb-1.5 block pl-1 text-[0.875rem] font-semibold text-espresso-900 group-data-[tone=dark]/ob:text-white">
        {label}
        {required && <span className="text-caramel-700 group-data-[tone=dark]/ob:text-caramel-300"> *</span>}{' '}
        {hint && <span className="font-normal text-muted group-data-[tone=dark]/ob:text-espresso-200">({hint})</span>}
      </label>
      {children}
    </div>
  )
}

export function TextInput(props: ComponentProps<'input'>) {
  return <input {...props} className={cn(inputCls, props.className)} />
}

export function TextArea(props: ComponentProps<'textarea'>) {
  return <textarea {...props} className={cn(inputCls, 'h-auto min-h-32 resize-y rounded-[1.375rem] py-3', props.className)} />
}

export function Consent({ checked, onChange, text }: { checked: boolean; onChange: (v: boolean) => void; text?: ReactNode }) {
  return (
    <label className={cn('mt-4 flex cursor-pointer items-start gap-3 pl-1 text-[0.8125rem] leading-relaxed', noteCls)}>
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

/** Fehlermeldung: der Bereich steht immer im DOM (Screenreader), nimmt aber nur Platz ein, wenn es etwas zu sagen gibt */
export function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p role="alert" className={cn('pl-1 text-[0.875rem] text-error group-data-[tone=dark]/ob:text-[#f3b4b4]', msg ? 'mt-3' : 'mt-0')}>
      {msg}
    </p>
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
