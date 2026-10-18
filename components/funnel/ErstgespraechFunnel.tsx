'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, CalendarHeart, Check, Mail, Phone } from 'lucide-react'
import { buttonClass } from '@/components/ui/Button'
import { LogoDraw } from '@/components/ui/LogoDraw'
import { FUNNEL, INTERESSEN, type FunnelOption, type FunnelWer, type InteresseKey } from '@/lib/content/angebote'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

/* =====================================================================
   Erstgespräch anfragen (Briefing Ä6): vier Schritte, je höchstens drei Antworten, oben eine Schrittlinie.
   1 Für wen → 2 Situation / Wer / Team → 3 Begleitung / Ort → 4 Name + Telefon ODER E-Mail (Schalter) → Bestätigung.
   Nach dem Absenden freiwillig: Beruf oder Branche, Altersgruppe, Ort, Nachricht (eigene Anfrage "ergaenzung" mit Bezug auf die id).
   Datensparsam: keine Gesundheitsfragen, kein Geburtsdatum. Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO (Hinweis statt Häkchen).
   Offener Block (Regel für Fragebögen und Infoblöcke): nur der Kopf ist ein dunkler, abgerundeter Block mit Versprechen und
   Schrittpunkten (offen Braun, erreicht Bordeaux). Frage, Text und Antworten stehen frei darunter, jede Antwort als eigenes rundes Feld.
   ===================================================================== */

type Kanal = 'Telefon' | 'E-Mail'
type Key = 'wer' | 'lage' | 'umfang'
const KEYS: Key[] = ['wer', 'lage', 'umfang']
const TOTAL = 4

const ALTER = ['unter 25', '25 bis 34', '35 bis 44', '45 bis 54', '55 bis 64', '65 und älter']
const ORT = ['Online', 'Vor Ort', 'Noch offen']

type State = {
  wer?: FunnelWer
  lage?: string
  umfang?: string
  interesse?: InteresseKey
  name: string
  kanal: Kanal
  telefon: string
  email: string
  website: string // Honeypot
}

/** Frage und Antworten eines Schritts (Schritt 2 und 3 hängen von "Für wen" ab, ohne Antwort gilt "ich") */
function question(k: Key, wer: FunnelWer = 'ich') {
  return k === 'wer' ? FUNNEL.wer : FUNNEL[k][wer]
}
function optionTitle(k: Key, wer: FunnelWer | undefined, key?: string): string | undefined {
  if (!key) return undefined
  return question(k, wer).options.find((o) => o.key === key)?.title ?? FUNNEL.extra[key]?.title
}

/** Vorauswahl aus INTERESSEN: beantwortete Schritte und der erste offene Schritt */
function fromPreset(key: InteresseKey | null | undefined) {
  const i = INTERESSEN.find((x) => x.key === key)
  if (!i) return null
  const a = { wer: 'wer' in i ? (i.wer as FunnelWer) : undefined, lage: 'lage' in i ? i.lage : undefined, umfang: 'umfang' in i ? i.umfang : undefined }
  const step = a.umfang ? 3 : a.lage ? 2 : a.wer ? 1 : 0
  return { answers: a, step, interesse: i.key }
}

export function ErstgespraechFunnel({
  variant = 'hero',
  idPrefix = 'jk',
  preset,
  className,
  bodyClassName,
}: {
  /** hero: Frage als h2 (Startseite, Erstgespräch-Seite) · embed: als h3, innerhalb einer Section mit eigener h2 */
  variant?: 'hero' | 'embed'
  /** Präfix der Feld-IDs, falls das Formular zweimal im DOM steht (Startseite: mobil im Sheet, Desktop im Hero) */
  idPrefix?: string
  /** Vorauswahl (z. B. von der Unternehmensseite): beantwortet passende Schritte vorab */
  preset?: InteresseKey
  className?: string
  bodyClassName?: string
}) {
  const P = idPrefix
  const initial = fromPreset(preset)
  const [s, setS] = useState<State>({
    ...initial?.answers,
    interesse: initial?.interesse,
    name: '',
    kanal: 'Telefon',
    telefon: '',
    email: '',
    website: '',
  })
  // 0 bis 3 = Schritte, 4 = fertig
  const [step, setStep] = useState(initial?.step ?? 0)
  const [first, setFirst] = useState(initial?.step ?? 0)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [ref, setRef] = useState<string | null>(null)
  const [called, setCalled] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const shownStep = useRef<number | null>(null)
  const advance = useRef<ReturnType<typeof setTimeout> | null>(null)

  const done = step >= TOTAL
  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }))

  // Vorauswahl über die Adresse (?interesse=unternehmen), z. B. Links von den Angebotsseiten
  useEffect(() => {
    if (preset) return
    const r = fromPreset(new URLSearchParams(window.location.search).get('interesse') as InteresseKey | null)
    if (!r) return
    setS((p) => ({ ...p, ...r.answers, interesse: r.interesse }))
    setStep(r.step)
    setFirst(r.step)
  }, [preset])

  // Hero-CTA: Karte leuchtet kurz auf, Fokus auf die aktuelle Frage
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const onCall = () => {
      if (cardRef.current?.offsetParent === null) return
      setCalled(true)
      headingRef.current?.focus({ preventScroll: true })
      clearTimeout(t)
      t = setTimeout(() => setCalled(false), 1600)
    }
    window.addEventListener('jk:funnel-call', onCall)
    return () => {
      window.removeEventListener('jk:funnel-call', onCall)
      clearTimeout(t)
      if (advance.current) clearTimeout(advance.current)
    }
  }, [])

  // Schrittwechsel: Fokus auf die neue Überschrift, Karte bei Bedarf ins Bild
  useEffect(() => {
    const prev = shownStep.current
    shownStep.current = step
    if (prev === null || prev === step) return
    if (bodyRef.current) bodyRef.current.scrollTop = 0
    headingRef.current?.focus({ preventScroll: true })
    const card = cardRef.current
    if (card) {
      const r = card.getBoundingClientRect()
      if (r.top < 80 || r.top > window.innerHeight * 0.6) window.scrollTo({ top: window.scrollY + r.top - 96, behavior: 'smooth' })
    }
  }, [step])

  const go = (n: number) => {
    setError('')
    setStep(n)
  }

  /** Antwort wählen: kurz zeigen, dann weiter (die Linie füllt sich, der nächste Schritt leuchtet auf) */
  const choose = (k: Key, key: string) => {
    setS((p) => {
      const n = { ...p, [k]: key }
      // Andere Antwort bei "Für wen": Folgefragen passen nicht mehr
      if (k === 'wer' && p.wer !== key) Object.assign(n, { lage: undefined, umfang: undefined })
      return n
    })
    if (advance.current) clearTimeout(advance.current)
    advance.current = setTimeout(() => go(KEYS.indexOf(k) + 1), 260)
  }

  const telOk = s.telefon.replace(/\D/g, '').length >= 6
  const mailOk = /^\S+@\S+\.\S+$/.test(s.email.trim())
  const validate = () => {
    if (!s.name.trim()) return 'Bitte geben Sie Ihren Namen an.'
    if (s.kanal === 'Telefon' && !telOk) return 'Bitte geben Sie Ihre Telefonnummer an, damit ich Sie zurückrufen kann.'
    if (s.kanal === 'E-Mail' && !mailOk) return 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
    return ''
  }

  // Fehlermeldung verschwindet, sobald die Eingaben gültig sind
  useEffect(() => {
    if (error && step === 3 && !validate()) setError('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const msg = validate()
    if (msg) return setError(msg)
    if (s.website) return go(TOTAL) // Honeypot: Bots sehen die Bestätigung, es wird nichts gesendet
    setSending(true)
    setError('')
    try {
      const r = await fetch('/api/anfrage/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          typ: 'erstgespraech',
          fuer: optionTitle('wer', s.wer, s.wer) ?? null,
          situation: optionTitle('lage', s.wer, s.lage) ?? null,
          umfang: optionTitle('umfang', s.wer, s.umfang) ?? null,
          interesse: INTERESSEN.find((i) => i.key === s.interesse)?.title ?? null,
          kontaktweg: s.kanal,
          name: s.name.trim(),
          telefon: s.kanal === 'Telefon' ? s.telefon.trim() : null,
          email: s.kanal === 'E-Mail' ? s.email.trim() : null,
          website: s.website,
          seite: window.location.href.split('#')[0],
        }),
      })
      if (r.status === 429) throw new Error('rate')
      if (!r.ok) throw new Error('HTTP ' + r.status)
      const data = (await r.json().catch(() => ({}))) as { id?: string }
      setRef(data.id ?? null)
      go(TOTAL)
    } catch (err) {
      setError(
        err instanceof Error && err.message === 'rate'
          ? `Es wurden zu viele Anfragen gesendet. Bitte versuchen Sie es später erneut oder schreiben Sie mir an ${site.email}.`
          : `Das Senden hat leider nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie mir an ${site.email}.`
      )
    } finally {
      setSending(false)
    }
  }

  const level: 2 | 3 = variant === 'embed' ? 3 : 2
  const h = { headingRef, level }
  const labels = [...KEYS.map((k) => question(k, s.wer).label), 'Kontakt']

  /* Aufleuchten nach Klick auf einen CTA (nur opacity) */
  const glow = (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -inset-px z-10 rounded-[inherit] shadow-[0_0_0_2px_var(--color-caramel-300),0_0_40px_4px_rgb(214_184_146/0.55)] transition-opacity duration-500',
        called ? 'opacity-100' : 'opacity-0'
      )}
    />
  )

  const form = (
    <form onSubmit={onSubmit} noValidate>
      {step < 3 &&
        (() => {
          const k = KEYS[step]
          const q = question(k, s.wer)
          return (
            <Step
              key={k + (s.wer ?? '')}
              title={q.title}
              sub={step === 0 ? 'Drei kurze Fragen, dann melde ich mich persönlich.' : undefined}
              {...h}
            >
              <div className="grid gap-1.5">
                {q.options.map((o, i) => (
                  <Tile key={o.key} o={o} i={i} selected={s[k] === o.key} onClick={() => choose(k, o.key)} />
                ))}
              </div>
              {step > first ? (
                <Back onClick={() => go(step - 1)} />
              ) : (
                <p className="mt-2.5 text-center text-[0.8125rem] text-muted">Unverbindlich · ohne Vorbereitung</p>
              )}
            </Step>
          )
        })()}

      {step === 3 && (
        <Step
          title="Wie erreiche ich Sie?"
          sub="Nur zwei Angaben, ich melde mich persönlich."
          {...h}
        >
          <Field label="Ihr Name" htmlFor={`${P}-name`} className="mt-0">
            <input id={`${P}-name`} autoComplete="name" value={s.name} onChange={(e) => set('name', e.target.value)} className={inputCls} />
          </Field>

          <div className="mt-2.5">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label htmlFor={`${P}-${s.kanal === 'Telefon' ? 'tel' : 'mail'}`} className="text-[0.875rem] font-semibold text-espresso-900">
                {s.kanal === 'Telefon' ? 'Ihre Telefonnummer' : 'Ihre E-Mail-Adresse'}
              </label>
              <KanalSwitch value={s.kanal} onChange={(v) => set('kanal', v)} name={`${P}-kanal`} />
            </div>
            {s.kanal === 'Telefon' ? (
              <input
                key="tel"
                id={`${P}-tel`}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="z. B. 0151 23456789"
                value={s.telefon}
                onChange={(e) => set('telefon', e.target.value)}
                className={cn(inputCls, 'field-in')}
              />
            ) : (
              <input
                key="mail"
                id={`${P}-mail`}
                type="email"
                autoComplete="email"
                placeholder="name@beispiel.de"
                value={s.email}
                onChange={(e) => set('email', e.target.value)}
                className={cn(inputCls, 'field-in')}
              />
            )}
            <p className="mt-1.5 text-[0.8125rem] leading-snug text-muted">
              {s.kanal === 'Telefon' ? 'Ich rufe Sie zurück und wir sprechen 15 Minuten.' : 'Sie erhalten von mir Terminvorschläge per E-Mail.'}
            </p>
          </div>

          <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
            <label>
              Bitte leer lassen
              <input tabIndex={-1} autoComplete="off" value={s.website} onChange={(e) => set('website', e.target.value)} />
            </label>
          </div>
          <ErrorMsg msg={error} />
          <button type="submit" disabled={sending} className={buttonClass('primary', 'md', 'group mt-3 w-full')}>
            {sending ? 'Wird gesendet …' : 'Kostenloses Erstgespräch anfragen'}
            {!sending && <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />}
          </button>
          <p className="mt-2 text-[0.75rem] leading-snug text-muted">
            Ihre Angaben nutze ich nur, um das Erstgespräch mit Ihnen zu vereinbaren. Mehr in der{' '}
            <Link href="/datenschutz/" target="_blank" className="link">
              Datenschutzerklärung
            </Link>
            .
          </p>
          {step > first && <Back onClick={() => go(2)} />}
        </Step>
      )}
    </form>
  )

  const result = done && <Done s={s} refId={ref} idPrefix={P} {...h} />

  return (
    <div ref={cardRef} className={cn('fk-open group/funnel relative flex flex-col text-ink', className)}>
      <div className="grain relative shrink-0 rounded-[1.5rem] bg-espresso-800 text-white shadow-[0_2px_4px_rgba(20,14,10,0.1),0_20px_40px_-22px_rgba(20,14,10,0.55)]">
        {glow}
        <Head labels={labels} current={step} done={done} />
      </div>
      <div ref={bodyRef} className={cn('min-h-0 px-1 pt-5', bodyClassName)}>
        {form}
        {result}
      </div>
    </div>
  )
}

/* ---------- Kopf ---------- */

/** "2 von 4" bzw. "Geschafft", für Screenreader als Schritt angesagt */
function StepCount({ current, done }: { current: number; done: boolean }) {
  return (
    <span aria-live="polite" className="whitespace-nowrap text-[0.8125rem] tabular-nums text-white/60">
      {done ? (
        'Geschafft'
      ) : (
        <>
          <span className="sr-only">Schritt </span>
          {current + 1} von {TOTAL}
        </>
      )}
    </span>
  )
}

/** Dunkler Kopf: Versprechen und große Schrittpunkte */
function Head({ labels, current, done }: { labels: string[]; current: number; done: boolean }) {
  return (
    <div className="px-5 pb-4 pt-4">
      <div className="flex items-center justify-between gap-4">
        <span className="t-label whitespace-nowrap text-[0.6875rem] text-caramel-300">Kostenlos · {site.erstgespraechMin} Minuten</span>
        <StepCount current={current} done={done} />
      </div>
      <p className="mt-1 font-serif text-[1.1875rem] leading-snug text-white">
        In 1 Minute zu Ihrem <em className="italic text-caramel-300">kostenlosen Erstgespräch</em>
      </p>
      <Dots labels={labels} current={current} />
    </div>
  )
}

/**
 * Schrittpunkte mit Linie: offen Braun, erreicht Bordeaux. Beim Weitergehen füllt sich die Linie, dann "tippt" der nächste Punkt
 * (hüpft kurz und leuchtet auf, .fk-dot in globals.css).
 */
function Dots({ labels, current }: { labels: string[]; current: number }) {
  return (
    <ol className="fk-dark mt-3.5 flex items-start" aria-label="Fortschritt">
      {labels.map((l, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'todo'
        return (
          <li key={i} className={cn('flex min-w-0 items-start', i < labels.length - 1 && 'flex-1')} aria-current={state === 'active' ? 'step' : undefined}>
            <span className="flex w-[3.25rem] shrink-0 flex-col items-center">
              <span
                data-state={state}
                className="fk-dot relative grid h-8 w-8 place-items-center rounded-full border text-[0.8125rem] font-bold tabular-nums"
              >
                <span className="sr-only">{`Schritt ${i + 1}: ${l}${state === 'done' ? ', erledigt' : state === 'active' ? ', aktuell' : ''}`}</span>
                {state === 'done' ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : <span aria-hidden="true">{i + 1}</span>}
              </span>
              <span
                aria-hidden="true"
                className={cn('mt-1.5 truncate text-[0.6875rem] font-medium leading-none transition-colors duration-500', state === 'todo' ? 'text-espresso-300/70' : 'text-white/90')}
              >
                {l}
              </span>
            </span>
            {i < labels.length - 1 && (
              <span aria-hidden="true" className="relative -mx-3 mt-[0.9375rem] h-0.5 flex-1 overflow-hidden rounded-full bg-espresso-600">
                <span className={cn('fk-fill absolute inset-0 origin-left bg-bordeaux-bright', i < current ? 'scale-x-100' : 'scale-x-0')} />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

/* ---------- Bestätigung + freiwillige Ergänzung ---------- */

function Done({
  s,
  refId,
  idPrefix: P,
  headingRef,
  level,
}: {
  s: State
  refId: string | null
  idPrefix: string
} & HeadingProps) {
  const [open, setOpen] = useState(false)
  const [x, setX] = useState({ beruf: '', alter: '', ort: '', nachricht: '' })
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const vorname = s.name.trim().split(/\s+/)[0]
  const inp = cn(inputCls, 'h-10')
  const fieldCls = 'mt-2.5'

  const send = async (e: FormEvent) => {
    e.preventDefault()
    if (!x.beruf.trim() && !x.alter && !x.ort && !x.nachricht.trim()) return setOpen(false)
    setState('sending')
    try {
      const r = await fetch('/api/anfrage/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          typ: 'ergaenzung',
          ref: refId,
          name: s.name.trim(),
          telefon: s.kanal === 'Telefon' ? s.telefon.trim() : null,
          email: s.kanal === 'E-Mail' ? s.email.trim() : null,
          beruf: x.beruf.trim() || null,
          alter: x.alter || null,
          ort: x.ort || null,
          nachricht: x.nachricht.trim() || null,
          website: s.website,
          seite: window.location.href.split('#')[0],
        }),
      })
      if (!r.ok) throw new Error()
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <LogoDraw play className="h-7 text-caramel-600" />
        <p className="t-label text-caramel-700">Anfrage erhalten</p>
      </div>
      <Heading headingRef={headingRef} level={level} srOnly={open}>
        Danke{vorname ? `, ${vorname}` : ''}! Ich melde mich persönlich bei Ihnen.
      </Heading>
      {/* Die optionale Ergänzung ersetzt die Liste, damit der Block nicht wächst (passt in den Hero) */}
      {!open && (
        <ul className="result-in mt-2.5 space-y-1.5 text-[0.875rem] leading-snug">
          {[
            s.kanal === 'Telefon' ? <>Ich rufe Sie unter <strong>{s.telefon.trim()}</strong> zurück, in der Regel am nächsten Werktag.</> : <>Sie erhalten von mir Terminvorschläge an <strong className="break-all">{s.email.trim()}</strong>.</>,
            <>In {site.erstgespraechMin} Minuten klären wir Ihr Anliegen, und ich empfehle Ihnen den Weg, der zu Ihnen passt.</>,
            <>Kostenlos und unverbindlich. Danach entscheiden Sie in Ruhe.</>,
          ].map((t, i) => (
            <li key={i} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-caramel-600" strokeWidth={2.5} aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="result-in mt-3.5 border-t border-line pt-3">
        {state === 'sent' ? (
          <p className="flex items-center gap-2 text-[0.9375rem] font-semibold text-espresso-900">
            <Check className="h-4 w-4 text-caramel-600" strokeWidth={2.5} aria-hidden="true" /> Danke, das hilft mir bei der Vorbereitung.
          </p>
        ) : !open ? (
          <button type="button" onClick={() => setOpen(true)} className={buttonClass('outline', 'md', 'w-full')}>
            Optional: noch etwas über sich ergänzen
          </button>
        ) : (
          <form onSubmit={send} noValidate className="field-in">
            <p className="text-[0.875rem] leading-snug text-muted">Alles freiwillig, Angaben zur Gesundheit brauche ich nicht.</p>
            <Field label="Beruf oder Branche" hint="optional" htmlFor={`${P}-beruf`} className={fieldCls}>
              <input id={`${P}-beruf`} autoComplete="organization-title" placeholder="z. B. Lehrerin, Pflege, selbstständig" value={x.beruf} onChange={(e) => setX({ ...x, beruf: e.target.value })} className={inp} />
            </Field>
            <div className="grid gap-x-3 sm:grid-cols-2">
              <Field label="Altersgruppe" htmlFor={`${P}-alter`} className={fieldCls}>
                <select id={`${P}-alter`} value={x.alter} onChange={(e) => setX({ ...x, alter: e.target.value })} className={inp}>
                  <option value="">Keine Angabe</option>
                  {ALTER.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </Field>
              <Field label="Online oder vor Ort?" htmlFor={`${P}-ort`} className={fieldCls}>
                <select id={`${P}-ort`} value={x.ort} onChange={(e) => setX({ ...x, ort: e.target.value })} className={inp}>
                  <option value="">Keine Angabe</option>
                  {ORT.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Möchten Sie mir vorab etwas sagen?" htmlFor={`${P}-msg`} className={fieldCls}>
              <textarea
                id={`${P}-msg`}
                rows={2}
                value={x.nachricht}
                onChange={(e) => setX({ ...x, nachricht: e.target.value })}
                className={cn(inp, 'h-auto min-h-16 resize-y rounded-[1.25rem] py-2.5')}
              />
            </Field>
            {state === 'error' && <ErrorMsg msg={`Das hat leider nicht geklappt. Sie können mir auch an ${site.email} schreiben.`} />}
            <button type="submit" disabled={state === 'sending'} className={buttonClass('primary', 'md', 'mt-3 w-full')}>
              {state === 'sending' ? 'Wird gesendet …' : 'Angaben senden'}
            </button>
          </form>
        )}
        {site.bookingUrl && (
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'md', 'mt-3 w-full')}>
            <CalendarHeart className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" /> Gleich einen Termin wählen
            <span className="sr-only"> (öffnet in neuem Fenster)</span>
          </a>
        )}
        {!(open && state !== 'sent') && (
          <a href={`mailto:${site.email}`} className="mt-1 flex min-h-10 items-center justify-center gap-2 text-[0.875rem] text-muted transition-colors hover:text-espresso-800">
            <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" /> {site.email}
          </a>
        )}
      </div>
    </div>
  )
}

/* ---------- Bausteine ---------- */

/** Eingabefelder als freistehende, ganz runde Felder (offener Block) */
const inputCls =
  'block h-11 w-full rounded-full border border-white bg-white/90 px-4 text-base text-ink shadow-[0_1px_2px_rgba(30,22,17,0.05),0_8px_20px_-14px_rgba(30,22,17,0.35)] transition-[border-color,box-shadow,background-color] placeholder:text-muted/70 focus:border-espresso-700 focus:bg-white focus:outline-none focus:ring-3 focus:ring-espresso-700/15'

type HeadingProps = { headingRef: React.RefObject<HTMLHeadingElement | null>; level: 2 | 3 }

function Step({ title, sub, children, headingRef, level }: { title: string; sub?: string; children: ReactNode } & HeadingProps) {
  return (
    <div className="step-in">
      <Heading headingRef={headingRef} level={level}>
        {title}
      </Heading>
      {sub && <p className="mt-1 text-[0.875rem] leading-snug text-muted">{sub}</p>}
      <div className="mt-3">{children}</div>
    </div>
  )
}

/** Echte Überschrift (h2/h3), fokussierbar: Screenreader kündigen den neuen Schritt an */
function Heading({ children, headingRef, level, srOnly }: { children: ReactNode; srOnly?: boolean } & HeadingProps) {
  const Tag = level === 2 ? 'h2' : 'h3'
  return (
    <Tag ref={headingRef} tabIndex={-1} className={cn('font-serif text-[1.25rem] leading-snug text-espresso-900 outline-none', srOnly && 'sr-only')}>
      {children}
    </Tag>
  )
}

/** Antwort als freistehendes weißes Feld: großer kursiver Buchstabe links, Titel, optional eine Zeile. Gewählt: Espresso-Rahmen, Haken */
function Tile({ o, i, selected, onClick }: { o: FunnelOption; i: number; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      style={{ '--d': `${0.05 + i * 0.06}s` } as React.CSSProperties}
      className={cn(
        'tile-in group flex min-h-[3.375rem] w-full items-center gap-3 rounded-[1.5rem] border px-3.5 py-2 text-left transition-[border-color,background-color,box-shadow,transform] duration-300 ease-[var(--ease-soft)] active:scale-[0.99] active:duration-150',
        selected
          ? 'border-espresso-800 bg-white shadow-[inset_0_0_0_1px_var(--color-espresso-800)]'
          : 'border-line/70 bg-white shadow-[0_6px_18px_-14px_rgba(30,22,17,0.4)] hover:translate-x-1 hover:border-espresso-800/30'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'grid h-8 w-6 shrink-0 place-items-center font-serif text-[1.375rem] italic transition-colors duration-300',
          selected ? 'text-espresso-900' : 'text-caramel-600'
        )}
      >
        {selected ? <Check className="h-4 w-4" strokeWidth={2.5} /> : String.fromCharCode(65 + i)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.90625rem] font-semibold leading-snug text-espresso-900">{o.title}</span>
        {o.text && <span className="mt-0.5 block text-[0.78125rem] leading-snug text-muted">{o.text}</span>}
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-espresso-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-espresso-800" strokeWidth={1.75} aria-hidden="true" />
    </button>
  )
}

/** Umschalter Telefon / E-Mail (wie ein Schalter am Handy): Fläche gleitet zur gewählten Seite */
function KanalSwitch({ value, onChange, name }: { value: Kanal; onChange: (v: Kanal) => void; name: string }) {
  const opts: { v: Kanal; label: string; Icon: typeof Phone }[] = [
    { v: 'Telefon', label: 'Tel', Icon: Phone },
    { v: 'E-Mail', label: 'Mail', Icon: Mail },
  ]
  return (
    <div role="radiogroup" aria-label="Wie darf ich Sie erreichen?" className="relative grid shrink-0 grid-cols-2 rounded-full bg-espresso-800/[0.07] p-[3px]">
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-y-[3px] left-[3px] w-[calc(50%-3px)] rounded-full bg-espresso-800 shadow-[0_2px_6px_-2px_rgba(20,14,10,0.45)] transition-transform duration-300 ease-[var(--ease-lift)]',
          value === 'E-Mail' && 'translate-x-full'
        )}
      />
      {opts.map(({ v, label, Icon }) => (
        <label
          key={v}
          className={cn(
            'relative z-10 flex h-8 min-w-[4.25rem] cursor-pointer rounded-full items-center justify-center gap-1.5 px-2.5 text-[0.8125rem] font-semibold transition-colors duration-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-caramel-600',
            value === v ? 'text-white' : 'text-espresso-700 hover:text-espresso-900'
          )}
        >
          <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} className="sr-only" aria-label={v} />
          <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
          {label}
        </label>
      ))}
    </div>
  )
}

function Field({ label, hint, htmlFor, className, children }: { label: string; hint?: string; htmlFor: string; className?: string; children: ReactNode }) {
  return (
    <div className={className ?? 'mt-3.5'}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[0.875rem] font-semibold text-espresso-900">
        {label} {hint && <span className="font-normal text-muted">({hint})</span>}
      </label>
      {children}
    </div>
  )
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mt-1 flex min-h-10 items-center gap-1.5 text-[0.875rem] text-muted transition-colors hover:text-espresso-800">
      <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" /> Zurück
    </button>
  )
}

/** Fehlermeldung: der Bereich steht immer im DOM (Screenreader), nimmt aber nur Platz ein, wenn es etwas zu sagen gibt */
function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p role="alert" className={cn('text-[0.875rem] text-error', msg ? 'mt-3' : 'mt-0')}>
      {msg}
    </p>
  )
}
