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
    text: 'Mein Hauptangebot. Wir gehen Ihren Stress gemeinsam und strukturiert an: verstehen, bewältigen, managen. Mit Begleitungsplan, Materialien und Unterstützung bei der Umsetzung.',
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

/** Auswahl im Erstgespräch-Formular (Briefing: Interesse am Angebot, keine Abfrage von Beschwerden) */
export const INTERESSEN = [
  { key: 'begleitung', title: 'Persönliche Begleitung', text: 'Eins zu eins, 3 oder 6 Monate' },
  { key: 'zu-zweit', title: 'Zu zweit', text: 'Als Paar oder mit einer vertrauten Person' },
  { key: 'gruppe', title: 'Gruppenangebot', text: 'In einer kleinen Runde' },
  { key: 'unternehmen', title: 'Schulung', text: 'Für ein Unternehmen oder Team' },
  { key: 'webinar', title: 'Online-Webinar', text: 'Vier Wochen, live per Video' },
  { key: 'kurs', title: 'Online-Kurs', text: 'Zum Selbstlernen' },
  { key: 'fragen', title: 'Allgemeine Fragen', text: 'Zu meinen Angeboten' },
  { key: 'unsicher', title: 'Ich bin noch unsicher', text: 'Wir finden es gemeinsam heraus' },
] as const
export type InteresseKey = (typeof INTERESSEN)[number]['key']

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

/** Programme der persönlichen Begleitung. PRÜFEN: Sitzungsdauer 3 Monate (60 oder 45 Minuten) */
export const PROGRAMME = [
  {
    key: '3',
    monate: 3,
    name: 'Drei Monate',
    untertitel: 'Der strukturierte Einstieg',
    rhythmus: 'Eine Sitzung pro Woche',
    dauer: 'je 60 Minuten',
    sitzungen: 'etwa 12 Sitzungen',
    fuer: 'Für alle, die ihren Stress jetzt gezielt angehen und in überschaubarer Zeit spürbar entlasten möchten.',
    phasen: [
      { zeit: 'Monat 1', title: 'Stress verstehen' },
      { zeit: 'Monat 2', title: 'Stress bewältigen' },
      { zeit: 'Monat 3', title: 'Stress managen' },
    ],
  },
  {
    key: '6',
    monate: 6,
    name: 'Sechs Monate',
    untertitel: 'Mehr Zeit für Tiefe und Umsetzung',
    rhythmus: 'Eine Sitzung alle zwei Wochen',
    dauer: 'je 90 Minuten',
    sitzungen: 'etwa 12 bis 13 Sitzungen',
    fuer: 'Für alle, die mehr Raum für jedes Thema und eine längere Begleitung bei der Umsetzung im Alltag möchten.',
    phasen: [
      { zeit: 'Monat 1 und 2', title: 'Stress verstehen' },
      { zeit: 'Monat 3 und 4', title: 'Stress bewältigen' },
      { zeit: 'Monat 5 und 6', title: 'Stress managen' },
    ],
  },
] as const

/** Bestandteile beider Programme: drei Gruppen à drei (leicht zu merken) */
export const BESTANDTEILE = [
  {
    title: 'Analyse',
    items: ['Individuelle Stressanalyse', 'Ihre persönliche Stresslandkarte', 'Ein Begleitungsplan, abgestimmt auf Sie'],
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
    text: '15 Minuten am Telefon oder per Video. Vorab ein kurzer Fragebogen (zwei Minuten), damit ich vorbereitet bin. Sie stellen Ihre Fragen, wir schauen, was passt.',
  },
  {
    title: 'Ihr persönlicher Plan',
    text: 'Stressanalyse und Stresslandkarte: Wo entsteht Ihr Stress, was hilft schon? Daraus entsteht Ihr Begleitungsplan mit Zielen, Methoden und Materialien.',
  },
  {
    title: 'Umsetzen und verankern',
    text: 'In festen Sitzungen gehen wir Schritt für Schritt vor: verstehen, bewältigen, managen. Bis Ihr Alltag Sie spürbar entlastet und es auch danach trägt.',
  },
]
