'use client'

import { useState, type FormEvent } from 'react'
import { BellRing, CheckCircle2 } from 'lucide-react'
import { buttonClass } from '@/components/ui/Button'
import { Consent, ErrorMsg, Field, Honeypot, TextArea, TextInput, isEmail, postJson } from './fields'
import { cn } from '@/lib/utils'

/**
 * Warteliste für Angebote ohne feste Termine (Webinar, Online-Kurs, Gruppen): Vorname, E-Mail, optional Nachricht.
 * Geht an /api/anfrage (typ warteliste), Bestätigung per E-Mail. Austragen jederzeit per Antwort.
 */
export function WartelisteForm({ angebot, label, className }: { angebot: 'webinar' | 'kurs' | 'gruppe'; label: string; className?: string }) {
  const [p, setP] = useState({ vorname: '', nachname: '', email: '' })
  const [nachricht, setNachricht] = useState('')
  const [dsgvo, setDsgvo] = useState(false)
  const [hp, setHp] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const id = `wl-${angebot}`

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!p.vorname.trim() || !isEmail(p.email)) return setError('Bitte geben Sie Ihren Vornamen und eine gültige E-Mail-Adresse an.')
    if (!dsgvo) return setError('Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.')
    setError('')
    setSending(true)
    const res = await postJson('/api/anfrage/', {
      typ: 'warteliste',
      angebot,
      ...p,
      nachricht,
      einwilligung_dsgvo: true,
      website: hp,
      seite: window.location.href.split('?')[0],
    })
    setSending(false)
    if (res.ok) setDone(true)
    else setError(res.error!)
  }

  if (done)
    return (
      <div className={cn('floaty rounded-lg border border-line bg-white p-6 md:p-8', className)}>
        <CheckCircle2 className="h-10 w-10 text-ok" strokeWidth={1.5} aria-hidden="true" />
        <p role="heading" aria-level={3} className="t-h3 mt-4 text-espresso-900">
          Danke, Sie stehen auf der Warteliste.
        </p>
        <p className="mt-3 leading-relaxed text-muted">Sobald es Neuigkeiten gibt, erfahren Sie es als Erste. Eine Bestätigung ist unterwegs in Ihr Postfach.</p>
      </div>
    )

  return (
    <form onSubmit={submit} noValidate className={cn('floaty relative rounded-lg border border-line bg-white p-6 md:p-8', className)}>
      <p className="flex items-center gap-2.5 text-terra-600">
        <BellRing className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        <span className="t-label text-[0.75rem]">Warteliste</span>
      </p>
      <p role="heading" aria-level={3} className="t-h3 mt-3 text-espresso-900">
        {label}
      </p>
      <div className="grid gap-x-3 sm:grid-cols-2">
        <Field label="Vorname" id={`${id}-vn`} required>
          <TextInput id={`${id}-vn`} autoComplete="given-name" value={p.vorname} onChange={(e) => setP({ ...p, vorname: e.target.value })} />
        </Field>
        <Field label="Nachname" hint="optional" id={`${id}-nn`}>
          <TextInput id={`${id}-nn`} autoComplete="family-name" value={p.nachname} onChange={(e) => setP({ ...p, nachname: e.target.value })} />
        </Field>
      </div>
      <Field label="E-Mail" id={`${id}-mail`} required>
        <TextInput id={`${id}-mail`} type="email" autoComplete="email" value={p.email} onChange={(e) => setP({ ...p, email: e.target.value })} />
      </Field>
      <Field label="Ihre Wünsche oder Fragen" hint="optional" id={`${id}-msg`}>
        <TextArea id={`${id}-msg`} rows={3} className="min-h-24" value={nachricht} onChange={(e) => setNachricht(e.target.value)} />
      </Field>
      <Honeypot value={hp} onChange={setHp} />
      <Consent checked={dsgvo} onChange={setDsgvo} />
      <ErrorMsg msg={error} />
      <button type="submit" disabled={sending} className={buttonClass('primary', 'lg', 'mt-2 w-full sm:w-auto')}>
        {sending ? 'Wird gesendet …' : 'Auf die Warteliste'}
      </button>
    </form>
  )
}
