'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { CheckCircle2, MessageSquareText } from 'lucide-react'
import { buttonClass } from '@/components/ui/Button'
import { OpenBlock } from '@/components/ui/OpenBlock'
import { ErrorMsg, Field, Honeypot, TextArea, TextInput, isEmail, noteCls, postJson } from './fields'
import { cn } from '@/lib/utils'

/**
 * Kontaktformular für allgemeine Fragen (Kontaktleiste "Kontaktformular", /erstgespraech/#kontaktformular).
 * Name, E-Mail, Nachricht. Geht an /api/anfrage (typ kontakt), Bestätigung per E-Mail. Fürs Erstgespräch gibt es den Funnel.
 * Offener Block: dunkler Kopf, Felder frei darunter.
 */
export function KontaktForm({ className }: { className?: string }) {
  const [p, setP] = useState({ vorname: '', email: '', nachricht: '' })
  const [hp, setHp] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!p.vorname.trim() || !isEmail(p.email)) return setError('Bitte geben Sie Ihren Namen und eine gültige E-Mail-Adresse an.')
    if (!p.nachricht.trim()) return setError('Bitte schreiben Sie mir kurz, worum es geht.')
    setError('')
    setSending(true)
    const res = await postJson('/api/anfrage/', { typ: 'kontakt', anliegen: 'Kontaktformular', ...p, website: hp, seite: window.location.href.split('?')[0] })
    setSending(false)
    if (res.ok) setDone(true)
    else setError(res.error!)
  }

  const head = {
    icon: <MessageSquareText strokeWidth={1.75} aria-hidden="true" />,
    kicker: 'Kontaktformular',
    title: (
      <>
        Ich antworte Ihnen <em>persönlich</em>
      </>
    ),
  }

  if (done)
    return (
      <OpenBlock {...head} className={className}>
        <CheckCircle2 className="h-9 w-9 text-ok" strokeWidth={1.5} aria-hidden="true" />
        <p role="heading" aria-level={3} className="mt-3 font-serif text-[1.25rem] leading-snug text-espresso-900">
          Danke, Ihre Nachricht ist angekommen.
        </p>
        <p className="mt-2 leading-relaxed text-muted">Ich melde mich persönlich bei Ihnen. Eine Bestätigung ist unterwegs in Ihr Postfach.</p>
      </OpenBlock>
    )

  return (
    <OpenBlock {...head} className={className}>
      <form onSubmit={submit} noValidate className="relative">
        <div className="grid gap-x-3 sm:grid-cols-2">
          <Field label="Name" id="kf-name" required className="mt-0">
            <TextInput id="kf-name" autoComplete="name" value={p.vorname} onChange={(e) => setP({ ...p, vorname: e.target.value })} />
          </Field>
          <Field label="E-Mail" id="kf-mail" required className="max-sm:mt-3.5 sm:mt-0">
            <TextInput id="kf-mail" type="email" autoComplete="email" value={p.email} onChange={(e) => setP({ ...p, email: e.target.value })} />
          </Field>
        </div>
        <Field label="Ihre Nachricht" id="kf-msg" required>
          <TextArea id="kf-msg" rows={4} className="min-h-28" value={p.nachricht} onChange={(e) => setP({ ...p, nachricht: e.target.value })} />
        </Field>
        <Honeypot value={hp} onChange={setHp} />
        <ErrorMsg msg={error} />
        <button type="submit" disabled={sending} className={buttonClass('primary', 'lg', 'mt-4 w-full sm:w-auto')}>
          {sending ? 'Wird gesendet …' : 'Nachricht senden'}
        </button>
        <p className={cn('mt-3 pl-1 text-[0.75rem] leading-relaxed', noteCls)}>
          Ihre Angaben nutze ich nur, um Ihre Nachricht zu beantworten. Bitte keine Angaben zu Ihrer Gesundheit. Mehr in der{' '}
          <Link href="/datenschutz/" target="_blank" className="link">
            Datenschutzerklärung
          </Link>
          .
        </p>
      </form>
    </OpenBlock>
  )
}
