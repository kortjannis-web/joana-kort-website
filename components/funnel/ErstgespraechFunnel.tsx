'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, Building2, CalendarHeart, Check, CircleHelp, Compass, Mail, MonitorPlay, Phone, User, Users, UsersRound, Video } from 'lucide-react'
import { buttonClass } from '@/components/ui/Button'
import { LogoDraw } from '@/components/ui/LogoDraw'
import { INTERESSEN, type InteresseKey } from '@/lib/content/angebote'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

/* =====================================================================
   Erstgespräch anfragen (Karte mit Kopfband, Schritte, Fortschritt).
   Briefing: Name, E-Mail, Telefon, Beruf/Branche, Interesse am Angebot. KEIN Anamnesebogen, keine Fragen zu Beschwerden.
   Datensparsam: statt Geburtsdatum nur eine freiwillige Altersgruppe. Anfrage geht per E-Mail an Joana (app/api/anfrage).
   Schritte: Interesse → Gesprächsform → Über Sie (optional) → Kontakt → Bestätigung
   ===================================================================== */

type Form = 'Telefon' | 'Video'
type Spaeter = 'Online' | 'Vor Ort' | 'Noch offen'
type StepId = 'interesse' | 'format' | 'ueber' | 'kontakt'

const ICONS: Record<InteresseKey, typeof User> = {
  begleitung: User,
  'zu-zweit': Users,
  gruppe: UsersRound,
  unternehmen: Building2,
  webinar: MonitorPlay,
  kurs: BookOpen,
  fragen: CircleHelp,
  unsicher: Compass,
}

const ALTER = ['unter 25', '25 bis 34', '35 bis 44', '45 bis 54', '55 bis 64', '65 und älter']
const ZEITEN = ['Vormittags', 'Mittags', 'Nachmittags', 'Abends']
const STEPS: StepId[] = ['interesse', 'format', 'ueber', 'kontakt']

type State = {
  interesse?: InteresseKey
  form?: Form
  spaeter?: Spaeter
  beruf: string
  alter: string
  zeiten: string[]
  vorname: string
  nachname: string
  email: string
  telefon: string
  nachricht: string
  website: string // Honeypot
  dsgvo: boolean
}

export function ErstgespraechFunnel({
  variant = 'embed',
  idPrefix = 'jk',
  preset,
  className,
  bodyClassName,
}: {
  /** hero: Kopfband in Espresso (Startseite, Erstgespräch-Seite) · embed: schlicht in einer Section */
  variant?: 'hero' | 'embed'
  /** Präfix der Feld-IDs, falls das Formular zweimal im DOM steht (Startseite: mobil im Sheet, Desktop im Hero) */
  idPrefix?: string
  /** Vorauswahl des Interesses (z. B. von der Unternehmensseite), Schritt 1 entfällt dann */
  preset?: InteresseKey
  className?: string
  bodyClassName?: string
}) {
  const P = idPrefix
  const [s, setS] = useState<State>({
    interesse: preset,
    beruf: '',
    alter: '',
    zeiten: [],
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    nachricht: '',
    website: '',
    dsgvo: false,
  })
  const [step, setStep] = useState<StepId | 'fertig'>(preset ? 'format' : 'interesse')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [called, setCalled] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const shownStep = useRef<string | null>(null)

  const total = STEPS.length
  const position = step === 'fertig' ? total : STEPS.indexOf(step) + 1
  const hero = variant === 'hero'
  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }))

  // Vorauswahl über die Adresse (?interesse=unternehmen), z. B. Links von den Angebotsseiten
  useEffect(() => {
    if (preset) return
    const q = new URLSearchParams(window.location.search).get('interesse') as InteresseKey | null
    if (q && INTERESSEN.some((i) => i.key === q)) {
      set('interesse', q)
      setStep('format')
    }
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

  const go = (n: StepId | 'fertig') => {
    setError('')
    setStep(n)
  }
  const next = (from: StepId) => go(STEPS[STEPS.indexOf(from) + 1] ?? 'fertig')
  const back = (from: StepId) => go(STEPS[Math.max(0, STEPS.indexOf(from) - 1)])

  const mailOk = /^\S+@\S+\.\S+$/.test(s.email.trim())
  const telOk = s.telefon.replace(/\D/g, '').length >= 6

  const validate = (st: StepId) => {
    if (st === 'format' && !s.form) return 'Bitte wählen Sie, ob wir telefonieren oder per Video sprechen.'
    if (st === 'kontakt') {
      if (!s.vorname.trim() || !s.nachname.trim()) return 'Bitte geben Sie Vor- und Nachname an.'
      if (!mailOk) return 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
      if (s.form === 'Telefon' && !telOk) return 'Bitte geben Sie Ihre Telefonnummer an, damit ich Sie anrufen kann.'
      if (!s.dsgvo) return 'Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.'
    }
    return ''
  }

  // Fehlermeldung verschwindet, sobald die Eingaben gültig sind
  useEffect(() => {
    if (error && step !== 'fertig' && !validate(step)) setError('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s])

  const submit = (st: StepId) => {
    const msg = validate(st)
    if (msg) return setError(msg)
    next(st)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const msg = validate('kontakt')
    if (msg) return setError(msg)
    if (s.website) return go('fertig') // Honeypot: Bots sehen die Bestätigung, es wird nichts gesendet
    setSending(true)
    setError('')
    try {
      const r = await fetch('/api/anfrage/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          typ: 'erstgespraech',
          interesse: INTERESSEN.find((i) => i.key === s.interesse)?.title ?? 'Nicht angegeben',
          gespraech: s.form,
          spaeter: s.spaeter ?? null,
          beruf: s.beruf.trim() || null,
          alter: s.alter || null,
          zeiten: s.zeiten,
          nachricht: s.nachricht.trim() || null,
          vorname: s.vorname.trim(),
          nachname: s.nachname.trim(),
          email: s.email.trim(),
          telefon: s.telefon.trim() || null,
          einwilligung_dsgvo: true,
          website: s.website,
          seite: window.location.href.split('#')[0],
        }),
      })
      if (r.status === 429) throw new Error('rate')
      if (!r.ok) throw new Error('HTTP ' + r.status)
      go('fertig')
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
  const head = step !== 'fertig'
  const headEl = head ? (
    <div className={cn(hero ? 'shrink-0 rounded-t-lg bg-(--band) px-5 pb-4 pt-4 sm:px-7 sm:pb-5 sm:pt-5 lowdesk:pb-3.5 lowdesk:pt-3.5' : 'mb-6')}>
      <div className="flex items-center justify-between gap-4">
        <span className={cn('t-label whitespace-nowrap text-[0.75rem]', hero ? 'text-caramel-300' : 'text-caramel-700')}>Kostenloses Erstgespräch</span>
        <span aria-live="polite" className={cn('whitespace-nowrap text-[0.875rem] tabular-nums', hero ? 'text-white/75' : 'text-muted')}>
          <span className="sr-only">Schritt </span>
          {position} von {total}
        </span>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {STEPS.map((st, i) => (
          <span key={st} className={cn('h-1 flex-1 overflow-hidden rounded-full', hero ? 'bg-white/15' : 'bg-line')}>
            <span
              className={cn('block h-full origin-left rounded-full transition-transform duration-500 ease-[var(--ease-soft)]', hero ? 'bg-caramel-300' : 'bg-caramel-600')}
              style={{ transform: `scaleX(${i < position ? 1 : 0})` }}
            />
          </span>
        ))}
      </div>
    </div>
  ) : null

  return (
    <div
      ref={cardRef}
      data-hero={hero ? '' : undefined}
      className={cn(
        'group/funnel relative rounded-lg bg-white text-ink',
        hero && 'flex flex-col',
        hero
          ? 'shadow-[0_1px_2px_rgba(30,22,17,0.05),0_12px_26px_-16px_rgba(30,22,17,0.24),0_30px_50px_-36px_rgba(30,22,17,0.3)] xl:shadow-[0_2px_4px_rgba(20,14,10,0.1),0_20px_38px_-18px_rgba(20,14,10,0.45),0_44px_70px_-42px_rgba(20,14,10,0.55)]'
          : 'border border-line shadow-[0_1px_2px_rgba(30,22,17,0.05),0_14px_30px_-16px_rgba(30,22,17,0.22),0_44px_80px_-48px_rgba(30,22,17,0.4)]',
        hero && '[--band:var(--color-espresso-800)]',
        hero && head && 'bg-[linear-gradient(to_bottom,var(--band)_2rem,#fff_2rem)]',
        className
      )}
    >
      {/* Aufleuchten nach Klick auf einen CTA (nur opacity) */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -inset-px rounded-[inherit] shadow-[0_0_0_2px_var(--color-caramel-300),0_0_40px_4px_rgb(214_184_146/0.55)] transition-opacity duration-500',
          called ? 'opacity-100' : 'opacity-0'
        )}
      />

      {hero && headEl}
      <div ref={bodyRef} className={cn('p-5 sm:p-7', hero && 'min-h-0 rounded-b-lg xl:pb-2', hero && head && 'pt-6 sm:pt-6 xl:pt-5', bodyClassName)}>
        {!hero && headEl}

        <form onSubmit={onSubmit} noValidate>
          {step === 'interesse' && (
            <Step title="Wofür interessieren Sie sich?" sub="Wählen Sie, was am ehesten passt. Wir sprechen im Erstgespräch über alles Weitere." {...h}>
              <div className="grid gap-2 sm:grid-cols-2">
                {INTERESSEN.map((i) => {
                  const Icon = ICONS[i.key]
                  return (
                    <Tile
                      key={i.key}
                      size="sm"
                      selected={s.interesse === i.key}
                      onClick={() => {
                        set('interesse', i.key)
                        setTimeout(() => next('interesse'), 140)
                      }}
                      title={i.title}
                      text={hero ? undefined : i.text}
                      icon={<Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} />}
                    />
                  )
                })}
              </div>
              <p className="mt-4 text-center text-[0.8125rem] text-muted">{site.erstgespraechMin} Minuten · kostenlos · unverbindlich</p>
            </Step>
          )}

          {step === 'format' && (
            <Step title="Wie möchten wir sprechen?" sub="Das Erstgespräch dauert etwa 15 Minuten." {...h}>
              <div className="grid grid-cols-2 gap-2.5">
                {(['Telefon', 'Video'] as Form[]).map((f) => (
                  <Tile
                    key={f}
                    selected={s.form === f}
                    onClick={() => set('form', f)}
                    title={f === 'Telefon' ? 'Am Telefon' : 'Per Video'}
                    icon={f === 'Telefon' ? <Phone className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} /> : <Video className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} />}
                  />
                ))}
              </div>
              <fieldset className="mt-5">
                <legend className="mb-2 text-[0.875rem] font-semibold text-espresso-900">
                  Und eine spätere Zusammenarbeit lieber … <span className="font-normal text-muted">(optional)</span>
                </legend>
                <Chips
                  name={`${P}-spaeter`}
                  options={['Online', 'Vor Ort', 'Noch offen']}
                  value={s.spaeter ? [s.spaeter] : []}
                  onToggle={(v) => set('spaeter', s.spaeter === v ? undefined : (v as Spaeter))}
                />
                {s.spaeter === 'Vor Ort' && (
                  <p className="mt-2 text-[0.8125rem] leading-snug text-muted">Vor Ort im Umkreis von etwa {site.radiusKm} km um {site.address.city}, zzgl. Fahrtkosten.</p>
                )}
              </fieldset>
              <ErrorMsg msg={error} />
              <button type="button" onClick={() => submit('format')} className={buttonClass('primary', 'lg', 'mt-3 w-full')}>
                Weiter <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>
              <Nav onBack={() => back('format')} />
            </Step>
          )}

          {step === 'ueber' && (
            <Step title="Ein wenig zu Ihnen" sub="Freiwillig. So kann ich mich gut auf unser Gespräch vorbereiten. Angaben zu Ihrer Gesundheit brauche ich nicht." {...h}>
              <Field label="Beruf oder Branche" hint="optional" htmlFor={`${P}-beruf`}>
                <input
                  id={`${P}-beruf`}
                  autoComplete="organization-title"
                  placeholder="z. B. Lehrerin, Studium, Selbstständig im Handwerk"
                  value={s.beruf}
                  onChange={(e) => set('beruf', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Altersgruppe" hint="optional" htmlFor={`${P}-alter`}>
                <select id={`${P}-alter`} value={s.alter} onChange={(e) => set('alter', e.target.value)} className={inputCls}>
                  <option value="">Keine Angabe</option>
                  {ALTER.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </Field>
              <fieldset className="mt-3.5">
                <legend className="mb-2 text-[0.875rem] font-semibold text-espresso-900">
                  Wann passt Ihnen ein Gespräch? <span className="font-normal text-muted">(optional)</span>
                </legend>
                <Chips
                  name={`${P}-zeiten`}
                  multi
                  options={ZEITEN}
                  value={s.zeiten}
                  onToggle={(v) => set('zeiten', s.zeiten.includes(v) ? s.zeiten.filter((z) => z !== v) : [...s.zeiten, v])}
                />
              </fieldset>
              <button type="button" onClick={() => next('ueber')} className={buttonClass('primary', 'lg', 'mt-5 w-full')}>
                Weiter <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>
              <Nav onBack={() => back('ueber')} onSkip={() => next('ueber')} />
            </Step>
          )}

          {step === 'kontakt' && (
            <Step title="Wie erreiche ich Sie?" sub="Ich melde mich persönlich bei Ihnen und schlage Ihnen einen Termin vor." {...h}>
              <div className="grid gap-x-3 sm:grid-cols-2">
                <Field label="Vorname" htmlFor={`${P}-vn`}>
                  <input id={`${P}-vn`} autoComplete="given-name" value={s.vorname} onChange={(e) => set('vorname', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Nachname" htmlFor={`${P}-nn`}>
                  <input id={`${P}-nn`} autoComplete="family-name" value={s.nachname} onChange={(e) => set('nachname', e.target.value)} className={inputCls} />
                </Field>
              </div>
              <Field label="E-Mail" htmlFor={`${P}-mail`}>
                <input id={`${P}-mail`} type="email" autoComplete="email" placeholder="name@beispiel.de" value={s.email} onChange={(e) => set('email', e.target.value)} className={inputCls} />
              </Field>
              <Field label="Telefon" hint={s.form === 'Telefon' ? 'für den Anruf' : 'optional'} htmlFor={`${P}-tel`}>
                <input id={`${P}-tel`} type="tel" autoComplete="tel" value={s.telefon} onChange={(e) => set('telefon', e.target.value)} className={inputCls} />
              </Field>
              <Field label="Möchten Sie mir vorab etwas sagen?" hint="optional" htmlFor={`${P}-msg`}>
                <textarea id={`${P}-msg`} rows={3} value={s.nachricht} onChange={(e) => set('nachricht', e.target.value)} className={cn(inputCls, 'h-auto min-h-24 resize-y py-3')} />
              </Field>
              <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
                <label>
                  Bitte leer lassen
                  <input tabIndex={-1} autoComplete="off" value={s.website} onChange={(e) => set('website', e.target.value)} />
                </label>
              </div>
              <label className="mt-5 flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-muted">
                <input type="checkbox" checked={s.dsgvo} onChange={(e) => set('dsgvo', e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-espresso-800" />
                <span>
                  Ich bin einverstanden, dass {site.owner} meine Angaben zur Vereinbarung des Erstgesprächs verarbeitet und mich dazu kontaktiert. Ich kann
                  die Einwilligung jederzeit widerrufen. Details in der{' '}
                  <Link href="/datenschutz/" target="_blank" className="link">
                    Datenschutzerklärung
                  </Link>
                  .
                </span>
              </label>
              <ErrorMsg msg={error} />
              <button type="submit" disabled={sending} className={buttonClass('primary', 'lg', 'mt-3 w-full')}>
                {sending ? 'Wird gesendet …' : 'Erstgespräch anfragen'}
              </button>
              <Nav onBack={() => back('kontakt')} />
            </Step>
          )}

          {step === 'fertig' && <Done s={s} {...h} />}
        </form>
      </div>
    </div>
  )
}

/* ---------- Bestätigung ---------- */

function Done({ s, headingRef, level }: { s: State; headingRef: React.RefObject<HTMLHeadingElement | null>; level: 2 | 3 }) {
  return (
    <div>
      <LogoDraw play className="h-12 text-caramel-600 sm:h-14" />
      <p className="t-label mt-4 text-caramel-700">Anfrage erhalten</p>
      <Heading headingRef={headingRef} level={level}>
        Danke, {s.vorname.trim() || 'schön'}! Ich freue mich auf unser Gespräch.
      </Heading>
      <div className="result-in">
        <p className="mt-3 text-base leading-relaxed text-ink/85">So geht es weiter:</p>
        <ul className="mt-2 space-y-2.5 text-[0.9375rem] leading-relaxed">
          {[
            <>
              Ich melde mich persönlich bei Ihnen{s.form === 'Telefon' ? ' per Telefon oder E-Mail' : ' per E-Mail'} und schlage Ihnen einen Termin vor.
            </>,
            <>
              Das Erstgespräch dauert etwa <strong>{site.erstgespraechMin} Minuten</strong>, {s.form === 'Video' ? 'per Video' : 'am Telefon'}. Sie müssen nichts vorbereiten.
            </>,
            <>Danach entscheiden Sie in Ruhe, ob und wie wir zusammenarbeiten. Unverbindlich.</>,
          ].map((t, i) => (
            <li key={i} className="flex gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-caramel-600" strokeWidth={2.5} aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-line pt-5">
          {site.bookingUrl ? (
            <>
              <p className="text-[0.9375rem] leading-relaxed">Sie möchten nicht warten? Wählen Sie gleich einen freien Termin.</p>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'lg', 'mt-4 w-full')}>
                <CalendarHeart className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" /> Termin wählen
                <span className="sr-only"> (öffnet in neuem Fenster)</span>
              </a>
            </>
          ) : (
            <p className="text-[0.9375rem] leading-relaxed">Bis dahin finden Sie im Ratgeber Antworten auf häufige Fragen rund um Stress.</p>
          )}
          <Link href="/ratgeber/" className={buttonClass('outline', 'lg', 'mt-3 w-full')}>
            Zum Ratgeber
          </Link>
          <a href={`mailto:${site.email}`} className="mt-3 flex min-h-11 items-center justify-center gap-2 text-[0.875rem] text-muted transition-colors hover:text-espresso-800">
            <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" /> {site.email}
          </a>
        </div>
      </div>
    </div>
  )
}

/* ---------- Bausteine ---------- */

const inputCls =
  'block h-12 w-full rounded-md border border-[#d5cabc] bg-white px-3.5 text-base text-ink transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-espresso-700 focus:outline-none focus:ring-3 focus:ring-espresso-700/15'

function Step({ title, sub, children, headingRef, level }: { title: string; sub: string; children: ReactNode; headingRef: React.RefObject<HTMLHeadingElement | null>; level: 2 | 3 }) {
  return (
    <div>
      <Heading headingRef={headingRef} level={level}>
        {title}
      </Heading>
      <p className="mt-1.5 text-base leading-snug text-muted group-data-[hero]/funnel:lowdesk:text-[0.9375rem]">{sub}</p>
      <div className="mt-5 group-data-[hero]/funnel:xl:mt-4">{children}</div>
    </div>
  )
}

/** Echte Überschrift (h2/h3), fokussierbar: Screenreader kündigen den neuen Schritt an */
function Heading({ children, headingRef, level }: { children: ReactNode; headingRef: React.RefObject<HTMLHeadingElement | null>; level: 2 | 3 }) {
  const Tag = level === 2 ? 'h2' : 'h3'
  return (
    <Tag ref={headingRef} tabIndex={-1} className="t-h3 text-espresso-900 outline-none">
      {children}
    </Tag>
  )
}

function Tile({ selected, onClick, title, text, icon, size = 'md' }: { selected: boolean; onClick: () => void; title: string; text?: string; icon?: ReactNode; size?: 'sm' | 'md' }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'group flex w-full items-center rounded-md border bg-white text-left transition-[border-color,background-color,box-shadow,transform] duration-300 ease-[var(--ease-soft)] active:scale-[0.985] active:duration-150',
        size === 'sm' ? 'min-h-12 gap-3 px-3 py-2 group-data-[hero]/funnel:lowdesk:min-h-11 group-data-[hero]/funnel:lowdesk:py-1.5' : 'min-h-14 gap-3 px-3.5 py-3',
        selected
          ? 'border-espresso-800 bg-stone shadow-[inset_0_0_0_1px_var(--color-espresso-800)]'
          : 'border-line hover:-translate-y-px hover:border-espresso-800/50 hover:shadow-[0_6px_16px_-8px_rgba(30,22,17,0.25)]'
      )}
    >
      {icon && (
        <span
          className={cn(
            'grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300',
            selected ? 'bg-espresso-800 text-white' : 'bg-stone text-espresso-700 group-hover:bg-caramel-50 group-hover:text-caramel-700'
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-semibold leading-snug text-espresso-900">{title}</span>
        {text && <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{text}</span>}
      </span>
    </button>
  )
}

/** Auswahl-Chips (Radio oder Mehrfachauswahl) */
function Chips({ name, options, value, onToggle, multi }: { name: string; options: string[]; value: string[]; onToggle: (v: string) => void; multi?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o)
        return (
          <label
            key={o}
            className={cn(
              'inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-4 text-[0.9375rem] transition-colors duration-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-caramel-600',
              on ? 'border-espresso-800 bg-stone font-semibold text-espresso-900' : 'border-line bg-white text-ink hover:border-espresso-800/50'
            )}
          >
            <input type={multi ? 'checkbox' : 'radio'} name={name} value={o} checked={on} onChange={() => onToggle(o)} onClick={() => !multi && on && onToggle(o)} className="sr-only" />
            {on && <Check className="h-3.5 w-3.5 text-espresso-800" strokeWidth={3} aria-hidden="true" />}
            {o}
          </label>
        )
      })}
    </div>
  )
}

function Field({ label, hint, htmlFor, children }: { label: string; hint?: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="mt-3.5">
      <label htmlFor={htmlFor} className="mb-1.5 block text-[0.875rem] font-semibold text-espresso-900">
        {label} {hint && <span className="font-normal text-muted">({hint})</span>}
      </label>
      {children}
    </div>
  )
}

function Nav({ onBack, onSkip }: { onBack?: () => void; onSkip?: () => void }) {
  const cls = 'flex min-h-11 items-center gap-1.5 text-[0.875rem] text-muted transition-colors hover:text-espresso-800'
  return (
    <div className="mt-2 flex items-center justify-between gap-4">
      {onBack ? (
        <button type="button" onClick={onBack} className={cls}>
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Zurück
        </button>
      ) : (
        <span />
      )}
      {onSkip ? (
        <button type="button" onClick={onSkip} className={cn(cls, 'font-semibold text-espresso-800')}>
          Überspringen <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
      ) : null}
    </div>
  )
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p role="alert" className="mt-3 min-h-5 text-[0.875rem] text-error">
      {msg}
    </p>
  )
}
