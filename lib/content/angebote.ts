/**
 * Angebote, Programme und die drei Schwerpunkte: eine Quelle für Navigation, Karten, Formular und Schema.
 * Keine Preise auf der Website (Entscheidung 16.10.2026): Preis im Erstgespräch, später hier nachtragbar.
 */

export type AngebotKey = 'begleitung' | 'zu-zweit' | 'webinar' | 'kurs' | 'unternehmen'

export type Angebot = {
  key: AngebotKey
  title: string
  /** Kurzname (Menü, Chips) */
  short: string
  path: string
  /** Eine Zeile unter dem Titel (Menü, Karten) */
  hint: string
  text: string
  /** buchbar · termine-folgen (Webinar) · in-vorbereitung (Online-Kurs) */
  status: 'buchbar' | 'termine-folgen' | 'in-vorbereitung'
}

export const ANGEBOTE: Angebot[] = [
  {
    key: 'begleitung',
    title: 'Stresscoaching: persönliche Begleitung',
    short: 'Persönliche Begleitung',
    path: '/stresscoaching/',
    hint: 'Eins zu eins über 3 oder 6 Monate',
    text: 'Mein Hauptangebot. Wir gehen Ihren Stress gemeinsam und strukturiert an: verstehen, bewältigen, managen. Mit persönlichem Unterstützungsplan, Materialien und Unterstützung bei der Umsetzung.',
    status: 'buchbar',
  },
  {
    key: 'zu-zweit',
    title: 'Zu zweit oder in der Gruppe',
    short: 'Zu zweit und in Gruppen',
    path: '/zu-zweit-und-in-der-gruppe/',
    hint: 'Als Paar, mit einer vertrauten Person oder in kleiner Runde',
    text: 'Stress betrifft selten nur einen Menschen. Gemeinsam mit Ihrem Partner, einer Freundin oder in einer kleinen Gruppe schauen wir auf das, was Sie zusammen entlasten kann.',
    status: 'buchbar',
  },
  {
    key: 'webinar',
    title: 'Online-Webinar über vier Wochen',
    short: 'Online-Webinar',
    path: '/webinar/',
    hint: 'Zwei bis drei Mal im Jahr, live per Video',
    text: 'Vier Wochen, feste Live-Termine und eingeplante Zeit für das Selbststudium. Für alle, die sich in einer Gruppe strukturiert mit ihrem Stress beschäftigen möchten.',
    status: 'termine-folgen',
  },
  {
    key: 'kurs',
    title: 'Online-Kurs',
    short: 'Online-Kurs',
    path: '/online-kurs/',
    hint: 'In Vorbereitung, Warteliste offen',
    text: 'Mein Wissen und meine Werkzeuge zum Selbstlernen, in Ihrem Tempo. Der Kurs ist in Vorbereitung. Auf der Warteliste erfahren Sie als Erste, wann er startet.',
    status: 'in-vorbereitung',
  },
  {
    key: 'unternehmen',
    title: 'Schulungen für Unternehmen und Teams',
    short: 'Für Unternehmen',
    path: '/stressmanagement-unternehmen/',
    hint: 'Für kleine Unternehmen, Teams und Gruppen',
    text: 'Stress verstehen und im Arbeitsalltag besser damit umgehen: praxisnahe Schulungen für kleine Unternehmen und Teams, online oder bei Ihnen vor Ort.',
    status: 'buchbar',
  },
]

export const angebot = (key: AngebotKey) => ANGEBOTE.find((a) => a.key === key)!

/**
 * Vorauswahl für das Erstgespräch (?interesse=… oder preset). Titel landen in der Mail an Joana.
 * `wer` / `lage` / `umfang` beantworten Funnel-Schritte vorab (siehe FUNNEL).
 */
export const INTERESSEN = [
  { key: 'begleitung', title: 'Persönliche Begleitung', wer: 'ich' },
  { key: 'zu-zweit', title: 'Zu zweit', wer: 'zwei', lage: 'paar' },
  { key: 'gruppe', title: 'Gruppenangebot', wer: 'zwei', lage: 'gruppe' },
  { key: 'unternehmen', title: 'Schulung für ein Unternehmen', wer: 'team' },
  { key: 'webinar', title: 'Online-Webinar', wer: 'ich', lage: 'online', umfang: 'webinar' },
  { key: 'kurs', title: 'Online-Kurs', wer: 'ich', lage: 'online', umfang: 'kurs' },
  { key: 'fragen', title: 'Allgemeine Fragen' },
  { key: 'unsicher', title: 'Noch unsicher' },
] as const
export type InteresseKey = (typeof INTERESSEN)[number]['key']

/**
 * Erstgespräch-Funnel: immer vier Schritte, je höchstens drei Antworten (Briefing Ä6: übersichtlich).
 * 1 Für wen → 2 Situation bzw. Teamgröße → 3 Umfang bzw. Ort → 4 Name + Telefon oder E-Mail. Danach freiwillig: Beruf, Alter, Nachricht.
 * Keine Gesundheitsfragen: Schritt 2 fragt nach dem Alltag, nicht nach Beschwerden.
 */
export type FunnelWer = 'ich' | 'zwei' | 'team'
export type FunnelOption = { key: string; title: string; text?: string }

export const FUNNEL = {
  wer: {
    label: 'Für wen',
    title: 'Für wen suchen Sie Unterstützung?',
    options: [
      { key: 'ich', title: 'Für mich selbst', text: 'Persönliche Begleitung, eins zu eins' },
      { key: 'zwei', title: 'Zu zweit oder als Gruppe', text: 'Als Paar, mit einer vertrauten Person oder in kleiner Runde' },
      { key: 'team', title: 'Für ein Team oder Unternehmen', text: 'Schulung oder Workshop' },
    ] as FunnelOption[],
  },
  lage: {
    ich: {
      label: 'Situation',
      title: 'Was trifft am ehesten auf Sie zu?',
      options: [
        { key: 'zu-viel', title: 'Mir wird alles zu viel' },
        { key: 'anfang', title: 'Ich weiß nicht, wo ich anfangen soll' },
        { key: 'struktur', title: 'Ich wünsche mir mehr Struktur im Alltag' },
      ],
    },
    zwei: {
      label: 'Wer',
      title: 'Wer wäre dabei?',
      options: [
        { key: 'paar', title: 'Wir sind zu zweit', text: 'z. B. als Paar oder mit einer Freundin' },
        { key: 'gruppe', title: 'Eine kleine Gruppe', text: 'Etwa drei bis acht Personen' },
        { key: 'offen', title: 'Das ist noch offen' },
      ],
    },
    team: {
      label: 'Team',
      title: 'Wie groß ist Ihr Team?',
      options: [
        { key: 'bis-10', title: 'Bis 10 Personen' },
        { key: 'bis-50', title: '11 bis 50 Personen' },
        { key: 'mehr', title: 'Mehr als 50 Personen' },
      ],
    },
  } as Record<FunnelWer, { label: string; title: string; options: FunnelOption[] }>,
  umfang: {
    ich: {
      label: 'Begleitung',
      title: 'Wie oft möchten Sie begleitet werden?',
      options: [
        { key: 'woechentlich', title: 'Wöchentlich', text: '3 Monate, je 45 bis 60 Minuten' },
        { key: 'zweiwoechentlich', title: 'Alle zwei Wochen', text: '6 Monate, je 90 Minuten' },
        { key: 'unsicher', title: 'Weiß ich noch nicht', text: 'Ich empfehle Ihnen, was passt' },
      ],
    },
    zwei: {
      label: 'Ort',
      title: 'Wo möchten Sie am liebsten arbeiten?',
      options: [
        { key: 'online', title: 'Online per Video' },
        { key: 'vor-ort', title: 'Vor Ort im Raum Gummersbach', text: 'Im Umkreis von etwa 20 km' },
        { key: 'offen', title: 'Ist mir egal' },
      ],
    },
    team: {
      label: 'Ort',
      title: 'Wo soll die Schulung stattfinden?',
      options: [
        { key: 'online', title: 'Online per Video' },
        { key: 'vor-ort', title: 'Bei uns vor Ort' },
        { key: 'offen', title: 'Noch offen' },
      ],
    },
  } as Record<FunnelWer, { label: string; title: string; options: FunnelOption[] }>,
  /** Vorauswahl Webinar/Kurs: Antworten, die es im Funnel nicht als Option gibt */
  extra: {
    online: { key: 'online', title: 'Online lernen' },
    webinar: { key: 'webinar', title: 'Online-Webinar (Warteliste)' },
    kurs: { key: 'kurs', title: 'Online-Kurs (Warteliste)' },
  } as Record<string, FunnelOption>,
}

/** Die drei Schwerpunkte: Slogan, Konzept und Aufbau jeder Begleitung */
export const SCHWERPUNKTE = [
  {
    nr: 1,
    title: 'Stress verstehen',
    kurz: 'Wie entsteht Ihr Stress, und wie zeigt er sich bei Ihnen?',
    text: 'Wir schauen gemeinsam, wie Stress funktioniert und wie er bei Ihnen persönlich entsteht. Sie lernen Ihre Signale früher zu erkennen und einzuordnen, im Körper, in den Gedanken und im Verhalten.',
    fragen: [
      'Was passiert in meinem Körper, wenn ich gestresst bin?',
      'Welche Gedanken verstärken meinen Stress?',
      'Welche Situationen lösen bei mir Stress aus?',
      'Woran erkenne ich meinen Stress frühzeitig?',
    ],
  },
  {
    nr: 2,
    title: 'Stress bewältigen',
    kurz: 'Was hilft Ihnen, wenn es eng wird?',
    text: 'Jeder Mensch erlebt Stress anders, deshalb hilft nicht jedem dasselbe. Wir finden die Methoden, die zu Ihnen und Ihrem Alltag passen, und üben sie so, dass Sie sie in akuten Momenten wirklich anwenden.',
    fragen: [
      'Welche Methoden helfen mir persönlich?',
      'Wie gehe ich mit akutem Stress um?',
      'Welche Strategien passen zu meinem Alltag?',
      'Wie setze ich das praktisch um?',
    ],
  },
  {
    nr: 3,
    title: 'Stress managen',
    kurz: 'Wie gestalten Sie Ihren Alltag so, dass weniger Stress entsteht?',
    text: 'Stress managen heißt nicht, noch mehr zu leisten. Wir vereinfachen Abläufe, setzen Prioritäten und entwickeln Pläne, die Sie entlasten. So entsteht ein Alltag, in dem unnötiger Stress gar nicht erst aufkommt.',
    fragen: [
      'Wie organisiere ich Aufgaben und Verantwortung besser?',
      'Welche Abläufe kann ich vereinfachen oder streichen?',
      'Welche Pläne entlasten mich langfristig?',
      'Wie bleibe ich dran, auch wenn es voll wird?',
    ],
  },
] as const

/** Rabatt pro Sitzung bei doppelter Laufzeit (Schalter auf der Programmkarte) */
export const RABATT_LANG = 15

/**
 * Programme der persönlichen Begleitung (Stand 18.10.2026): links wöchentlich, rechts alle zwei Wochen.
 * Jede Karte hat einen Schalter "Laufzeit verdoppeln": gleicher Rhythmus, doppelte Laufzeit, RABATT_LANG % auf jede Sitzung.
 * PRÜFEN mit Joana: Sitzungsdauer wöchentlich (45 bis 60 Minuten) und alle zwei Wochen (90 Minuten).
 */
export const PROGRAMME = [
  {
    key: 'woechentlich',
    untertitel: 'Kompakt und intensiv',
    rhythmus: 'Eine Sitzung pro Woche',
    dauer: 'je 45 bis 60 Minuten',
    fuer: 'Für alle, die ihren Stress jetzt gezielt angehen und in überschaubarer Zeit spürbar entlasten möchten.',
    kurz: { monate: 3, sitzungen: 'etwa 12 Sitzungen', phasen: ['Monat 1', 'Monat 2', 'Monat 3'] },
    lang: { monate: 6, sitzungen: 'etwa 24 Sitzungen', phasen: ['Monat 1 und 2', 'Monat 3 und 4', 'Monat 5 und 6'] },
  },
  {
    key: 'zweiwoechentlich',
    untertitel: 'Mehr Zeit zum Umsetzen',
    rhythmus: 'Eine Sitzung alle zwei Wochen',
    dauer: 'je 90 Minuten',
    fuer: 'Für alle, die mehr Raum für jedes Thema und zwischen den Terminen Zeit zum Ausprobieren im Alltag möchten.',
    kurz: { monate: 6, sitzungen: 'etwa 12 Sitzungen', phasen: ['Monat 1 und 2', 'Monat 3 und 4', 'Monat 5 und 6'] },
    lang: { monate: 12, sitzungen: 'etwa 24 Sitzungen', phasen: ['Monat 1 bis 4', 'Monat 5 bis 8', 'Monat 9 bis 12'] },
  },
] as const
export type Programm = (typeof PROGRAMME)[number]

/** Bestandteile beider Programme: drei Gruppen à drei (leicht zu merken) */
export const BESTANDTEILE = [
  {
    title: 'Analyse',
    items: ['Individuelle Stressanalyse', 'Ihre persönliche Stresslandkarte', 'Ein persönlicher Unterstützungsplan, abgestimmt auf Sie'],
  },
  {
    title: 'Wissen und Methoden',
    items: ['Wissenschaftlich fundierte Inhalte, verständlich erklärt', 'Individuell ausgewählte Methoden zur Stressbewältigung', 'Konkrete Übungen zwischen den Sitzungen'],
  },
  {
    title: 'Alltag',
    items: ['Materialien und Handouts, z. B. Stresstagebuch', 'Pläne für Ihren Alltag (z. B. Wochen-, Haushalts- oder Essensplan)', 'Unterstützung bei der Umsetzung, bis es trägt'],
  },
]

/** Ablauf der Begleitung (Startseite, Stresscoaching): bewusst drei Schritte, leicht zu merken */
export const ABLAUF = [
  {
    title: 'Kostenloses Erstgespräch',
    text: '15 Minuten am Telefon oder per Video. Vorab drei kurze Fragen (eine Minute), damit ich vorbereitet bin. Sie stellen Ihre Fragen, wir schauen, was passt.',
  },
  {
    title: 'Ihr persönlicher Plan',
    text: 'Stressanalyse und Stresslandkarte: Wo entsteht Ihr Stress, was hilft schon? Daraus entsteht Ihr persönlicher Unterstützungsplan mit Zielen, Methoden und Materialien.',
  },
  {
    title: 'Umsetzen und verankern',
    text: 'In festen Sitzungen gehen wir Schritt für Schritt vor: verstehen, bewältigen, managen. Bis Ihr Alltag Sie spürbar entlastet und es auch danach trägt.',
  },
]
