'use client'

import Link from 'next/link'
import { useEffect, useState, type FormEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CheckCircle2, PhoneCall, X } from 'lucide-react'
import { buttonClass } from '@/components/ui/Button'
import { OpenBlock } from '@/components/ui/OpenBlock'
import { ErrorMsg, Field, Honeypot, TextInput, noteCls, postJson } from './fields'
import { cn } from '@/lib/utils'

/** Öffnet das Rückruf-Fenster von überall (Telefon-Knopf, Kontaktleiste, Erstgespräch-Seite) */
export const openRueckruf = () => window.dispatchEvent(new Event('jk:rueckruf'))

/**
 * Rückruf statt direktem Anruf (Entscheidung 18.10.2026): Wer auf "Anrufen" tippt, hinterlässt Name und Telefonnummer, Joana ruft zurück.
 * Geht als Erstgespräch-Anfrage mit Kontaktweg Telefon an /api/anfrage (Mail an Joana mit "bitte anrufen"). Offener Block im Dialog.
 * Datenschutzhinweis statt Häkchen (Art. 6 Abs. 1 lit. b DSGVO), wie im Funnel.
 */
export function RueckrufDialog() {
  const [open, setOpen] = useState(false)
  const [p, setP] = useState({ name: '', telefon: '' })
  const [hp, setHp] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('jk:rueckruf', onOpen)
    return () => window.removeEventListener('jk:rueckruf', onOpen)
  }, [])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!p.name.trim()) return setError('Bitte geben Sie Ihren Namen an.')
    if (p.telefon.replace(/\D/g, '').length < 6) return setError('Bitte geben Sie Ihre Telefonnummer an, damit ich Sie zurückrufen kann.')
    setError('')
    setSending(true)
    const res = await postJson('/api/anfrage/', {
      typ: 'erstgespraech',
      interesse: 'Rückruf',
      kontaktweg: 'Telefon',
      name: p.name.trim(),
      telefon: p.telefon.trim(),
      website: hp,
      seite: window.location.href.split('#')[0],
    })
    setSending(false)
    if (res.ok) setDone(true)
    else setError(res.error!)
  }

  const vorname = p.name.trim().split(/\s+/)[0]

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-espresso-950/45 backdrop-blur-[2px] data-[state=open]:animate-[fade-in_.2s_ease-out]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="paper-grain fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 max-h-[calc(100svh-1.5rem)] overflow-y-auto rounded-[2rem] bg-paper p-4 pb-5 shadow-[0_30px_80px_-24px_rgba(20,14,10,0.6)] outline-none data-[state=open]:animate-[fade-in_.25s_var(--ease-soft)] sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(27rem,calc(100vw-2rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:p-5"
        >
          <Dialog.Close
            aria-label="Schließen"
            className="absolute right-6 top-6 z-10 grid h-10 w-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-7 sm:top-7"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </Dialog.Close>
          <OpenBlock
            icon={<PhoneCall strokeWidth={1.75} aria-hidden="true" />}
            kicker="Rückruf"
            title={
              <Dialog.Title asChild>
                <span>
                  Ich rufe Sie <em>zurück</em>
                </span>
              </Dialog.Title>
            }
          >
            {done ? (
              <div className="pl-1">
                <CheckCircle2 className="h-9 w-9 text-bordeaux" strokeWidth={1.5} aria-hidden="true" />
                <p role="heading" aria-level={3} className="mt-3 font-serif text-[1.25rem] leading-snug text-espresso-900">
                  Danke{vorname ? `, ${vorname}` : ''}! Ich rufe Sie persönlich zurück.
                </p>
                <p className="mt-2 leading-relaxed text-muted">
                  In der Regel am nächsten Werktag unter <strong className="text-espresso-900">{p.telefon.trim()}</strong>. Das Gespräch ist
                  kostenlos und unverbindlich.
                </p>
                <Dialog.Close className={buttonClass('outline', 'md', 'mt-5 w-full')}>Schließen</Dialog.Close>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="relative">
                <p className="pl-1 text-[0.9375rem] leading-snug text-muted">
                  Hinterlassen Sie Ihren Namen und Ihre Nummer. Ich melde mich persönlich, in der Regel am nächsten Werktag.
                </p>
                <Field label="Ihr Name" id="rr-name" required className="mt-4">
                  <TextInput id="rr-name" autoComplete="name" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} />
                </Field>
                <Field label="Ihre Telefonnummer" id="rr-tel" required>
                  <TextInput
                    id="rr-tel"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="z. B. 0151 23456789"
                    value={p.telefon}
                    onChange={(e) => setP({ ...p, telefon: e.target.value })}
                  />
                </Field>
                <Honeypot value={hp} onChange={setHp} />
                <ErrorMsg msg={error} />
                <button type="submit" disabled={sending} className={buttonClass('primary', 'lg', 'mt-5 w-full')}>
                  <PhoneCall className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.9} aria-hidden="true" />
                  {sending ? 'Wird gesendet …' : 'Rückruf anfordern'}
                </button>
                <p className={cn('mt-3 pl-1 text-[0.75rem] leading-snug', noteCls)}>
                  Ihre Angaben nutze ich nur für den Rückruf. Mehr in der{' '}
                  <Link href="/datenschutz/" target="_blank" className="link">
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </form>
            )}
          </OpenBlock>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/** Knopf oder Textlink, der das Rückruf-Fenster öffnet (für Server-Seiten) */
export function RueckrufButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={openRueckruf} className={className}>
      {children}
    </button>
  )
}
