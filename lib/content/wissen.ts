import type { Faq, Rich } from '@/lib/types'

/**
 * Wissen "Stress verstehen" (Seite /stress-verstehen/, Teaser auf der Startseite).
 * Aufbau je Thema: Frage als Überschrift (so wird gesucht, GEO), Kurzantwort immer sichtbar, Erklär-Animation mit drei Stichworten,
 * Langtext erst nach Klick auf den Pfeil (steht im HTML, Suchmaschinen und KI lesen ihn).
 * Neue Themen: in eine Gruppe eintragen (am besten in Dreiergruppen), `scene` aus den vorhandenen Animationen wählen.
 * PRÜFEN: Joana liest alle Texte fachlich gegen und ergänzt eigene Themen (siehe WISSEN_DEMNAECHST).
 */

export type SceneKey = 'puls' | 'waage' | 'kette' | 'welle' | 'ebenen' | 'saeulen'

export type Thema = {
  /** Anker auf der Seite (#id) */
  id: string
  scene: SceneKey
  /** Frage als Überschrift */
  frage: string
  /** Kurzantwort, immer sichtbar (ein bis zwei Sätze) */
  kurz: string
  /** Drei Stichworte: Beschriftung der Animation */
  stichworte: [string, string, string]
  /** Langtext hinter dem Pfeil, Absätze mit **fett** und [Link](/pfad/) */
  lang: Rich[]
  /** Passender Ratgeber-Artikel (Slug) */
  ratgeber?: string
}

export type WissenGruppe = { id: string; label: string; title: string; intro: string; themen: Thema[] }

/** Direkte Antwort ganz oben auf der Seite (GEO: "Was ist Stress?") */
export const STRESS_DEFINITION = {
  frage: 'Was ist Stress?',
  antwort:
    'Stress ist die Reaktion von Körper und Psyche auf Anforderungen, die wir als wichtig und schwer zu bewältigen einschätzen. Er ist zunächst ein sinnvoller Schutzmechanismus, der uns wach und leistungsfähig macht. Belastend wird er, wenn er zu oft, zu lange oder ohne ausreichende Erholung auftritt.',
  fakten: [
    { title: 'Ein Schutzmechanismus', text: 'Stress macht kurzfristig leistungsfähig. Er ist kein Zeichen von Schwäche.' },
    { title: 'Bei jedem anders', text: 'Ob etwas stresst, hängt von der eigenen Bewertung und den eigenen Möglichkeiten ab.' },
    { title: 'Veränderbar', text: 'Auslöser, Gedanken und Alltag lassen sich gestalten, Schritt für Schritt.' },
  ],
} as const

export const WISSEN_GRUPPEN: WissenGruppe[] = [
  {
    id: 'grundlagen',
    label: 'Grundlagen',
    title: 'So funktioniert Stress',
    intro: 'Drei Bausteine erklären, warum Stress entsteht und warum er sich bei jedem Menschen anders anfühlt.',
    themen: [
      {
        id: 'stressreaktion',
        scene: 'puls',
        frage: 'Was passiert bei Stress im Körper?',
        kurz: 'Ihr Gehirn schaltet auf Bereitschaft: Stresshormone werden ausgeschüttet, Puls und Atmung steigen, die Muskeln spannen sich an. Danach braucht der Körper Erholung.',
        stichworte: ['Ruhe', 'Alarm', 'Erholung'],
        lang: [
          'Innerhalb von Sekunden aktiviert das Gehirn das sympathische Nervensystem. Der Körper schüttet **Adrenalin und Noradrenalin** aus: Das Herz schlägt schneller, der Blutdruck steigt, die Atmung wird schneller, Energie wird bereitgestellt. Etwas langsamer folgt über die sogenannte Stressachse (Hypothalamus, Hypophyse, Nebennierenrinde) das Hormon **Cortisol**, das den Körper länger in Bereitschaft hält.',
          'Der Physiologe Walter Cannon hat diese Reaktion schon Anfang des 20. Jahrhunderts als **Kampf-oder-Flucht-Reaktion** beschrieben. Sie hat Menschen in echter Gefahr geschützt. Heute reagiert der Körper genauso, nur sind die Auslöser andere: ein voller Posteingang, ein Streit, die dritte Nacht mit wenig Schlaf.',
          'Entscheidend ist der zweite Teil: Nach der Anspannung braucht der Körper **Erholung**. Der Parasympathikus, gewissermaßen die Bremse, bringt Puls, Atmung und Muskelspannung wieder herunter. Fehlt diese Phase immer wieder, bleibt der Körper im Bereitschaftsmodus. Genau dort setzt gutes Stressmanagement an.',
        ],
        ratgeber: 'was-ist-stress',
      },
      {
        id: 'bewertung',
        scene: 'waage',
        frage: 'Warum stresst dieselbe Situation nicht jeden?',
        kurz: 'Ob etwas Stress auslöst, hängt davon ab, wie Sie es bewerten. Wiegen die Anforderungen schwerer als Ihre Möglichkeiten, also Zeit, Wissen, Kraft und Unterstützung, entsteht Stress.',
        stichworte: ['Anforderungen', 'Bewertung', 'Möglichkeiten'],
        lang: [
          'Die Psychologen **Richard Lazarus und Susan Folkman** haben das im transaktionalen Stressmodell beschrieben. Stress ist danach weder nur die Situation noch nur die Person, sondern das Zusammenspiel aus beidem. Unbewusst fragen wir uns zuerst: Ist das wichtig für mich, ist es bedrohlich oder herausfordernd? Und dann: Habe ich, was ich brauche, um damit fertigzuwerden?',
          'Deshalb kann ein voller Kalender die eine Person beflügeln und die andere lähmen. Und deshalb ist Stress kein Zeichen von Schwäche, sondern ein Signal: Gerade wird mehr gefordert, als an Möglichkeiten zur Verfügung steht.',
          'Die gute Nachricht: An beiden Seiten der Waage lässt sich arbeiten. Anforderungen lassen sich manchmal verringern oder anders verteilen, und die eigenen Möglichkeiten lassen sich stärken, durch Wissen, passende Methoden, Unterstützung und Erholung.',
        ],
        ratgeber: 'was-ist-stress',
      },
      {
        id: 'ausloeser-verstaerker',
        scene: 'kette',
        frage: 'Wie entsteht Stress? Auslöser, Verstärker, Reaktion',
        kurz: 'Stress hat drei Stellen, an denen Sie ansetzen können: die Auslöser von außen, die eigenen Verstärker im Kopf und die Reaktion in Körper und Verhalten.',
        stichworte: ['Auslöser', 'Verstärker', 'Reaktion'],
        lang: [
          'Im deutschsprachigen Raum hat sich dafür ein einfaches Bild bewährt, das unter anderem der Psychologe **Gert Kaluza** beschreibt. **Stressoren** sind Anforderungen von außen: Termindruck, Lärm, Konflikte, die Pflege eines Angehörigen. **Persönliche Stressverstärker** sind eigene Einstellungen und Muster, etwa Perfektionismus, der Anspruch, alles allein zu schaffen, oder die Schwierigkeit, Nein zu sagen. Die **Stressreaktion** ist das, was dann in Körper, Gedanken und Verhalten passiert.',
          'Die Verstärker sind der Hebel, der am häufigsten übersehen wird. Zwei Menschen mit demselben Terminplan erleben ihn sehr unterschiedlich, je nachdem, welche inneren Sätze mitlaufen. "Das muss perfekt sein" erzeugt mehr Druck als "Das darf gut genug sein".',
          'Für die Praxis heißt das: Sie können an allen drei Stellen ansetzen. Genau so ist meine Begleitung aufgebaut: [Stress verstehen, bewältigen und managen](/mein-ansatz/).',
        ],
        ratgeber: 'stressmanagement-im-alltag',
      },
    ],
  },
  {
    id: 'im-alltag',
    label: 'Im Alltag',
    title: 'Wann Stress zur Belastung wird',
    intro: 'Kurzer Stress gehört zum Leben. Worauf es ankommt: das Verhältnis von Anspannung und Erholung und wie früh Sie Ihre Signale bemerken.',
    themen: [
      {
        id: 'akut-chronisch',
        scene: 'welle',
        frage: 'Wann wird Stress zum Problem?',
        kurz: 'Kurzer Stress mit anschließender Erholung ist gut zu verkraften. Belastend wird er, wenn er über Wochen anhält und die Erholung fehlt. Dann bleibt der Körper dauerhaft in Alarmbereitschaft.',
        stichworte: ['Anspannung', 'Erholung', 'Dauerstress'],
        lang: [
          'Die Stressforschung unterscheidet **akuten und chronischen Stress**. Akuter Stress ist kurz und klingt wieder ab, etwa vor einer Präsentation. Chronischer Stress entsteht, wenn Belastungen lange bestehen und zwischendurch keine echte Erholung stattfindet. Der Neurowissenschaftler Bruce McEwen hat dafür den Begriff der **allostatischen Last** geprägt: die Abnutzung, die entsteht, wenn sich der Körper immer wieder an Belastung anpassen muss.',
          'Auch die bekannte Unterscheidung von **Eustress und Distress** geht auf die Stressforschung zurück, auf Hans Selye. Eustress erleben wir als anregend und positiv, Distress als überfordernd. Ob Stress guttut oder schadet, hängt also auch davon ab, wie lange er dauert und ob wir ihn als bewältigbar erleben.',
          'Laut der TK-Stressstudie 2021 fühlt sich rund jeder vierte Erwachsene in Deutschland häufig gestresst. Dauerstress kann sich auf Schlaf, Stimmung und Konzentration auswirken und langfristig auch auf die Gesundheit. Bei anhaltenden körperlichen oder seelischen Beschwerden ist deshalb immer ärztlicher Rat der erste Schritt.',
        ],
        ratgeber: 'akuter-stress-was-hilft',
      },
      {
        id: 'anzeichen',
        scene: 'ebenen',
        frage: 'Woran erkenne ich Stress?',
        kurz: 'Stress zeigt sich auf drei Ebenen: im Körper, in den Gedanken und im Verhalten. Wer die eigenen Frühwarnzeichen kennt, kann früher gegensteuern.',
        stichworte: ['Körper', 'Gedanken', 'Verhalten'],
        lang: [
          '**Im Körper:** Verspannungen in Nacken und Kiefer, Kopfschmerzen, ein flauer Magen, Herzklopfen, unruhiger Schlaf oder das Gefühl, nie richtig abzuschalten.',
          '**In den Gedanken:** Grübeln, Gedankenkreisen am Abend, Konzentrationsprobleme, Vergesslichkeit, Tunnelblick und Sätze wie "Ich schaffe das alles nicht".',
          '**Im Verhalten:** Gereiztheit, Hektik, mehr Kaffee oder Süßes, weniger Bewegung, Rückzug von Freunden oder das Aufschieben von Dingen, die eigentlich wichtig sind.',
          'Jeder Mensch hat sein eigenes Muster. Ein einfaches Werkzeug, um es kennenzulernen, ist ein Stresstagebuch: Situation, Auslöser, Stresslevel, Reaktion und was geholfen hat. [So funktioniert das Stresstagebuch](/ratgeber/stresstagebuch-anleitung/).',
        ],
        ratgeber: 'stress-erkennen',
      },
      {
        id: 'was-hilft',
        scene: 'saeulen',
        frage: 'Was hilft gegen Stress?',
        kurz: 'Drei Wege ergänzen sich: Belastungen verändern, hinderliche Gedanken prüfen und Erholung stärken. Welche Methoden davon zu Ihnen passen, ist sehr individuell.',
        stichworte: ['Belastungen', 'Gedanken', 'Erholung'],
        lang: [
          'In der Stressforschung spricht man von drei Säulen der Stresskompetenz (unter anderem bei Gert Kaluza). **Instrumentell:** Belastungen direkt verändern, etwa durch Planung, Prioritäten, Absprachen oder ein klares Nein. **Mental:** eigene Einstellungen und Bewertungen prüfen und hilfreicher formulieren. **Regenerativ:** für Ausgleich sorgen, durch Pausen, Bewegung, Entspannung, Schlaf und gute Kontakte.',
          'Allgemeine Tipps helfen deshalb oft nur begrenzt. Was der einen Person hilft, passt bei der anderen nicht in den Alltag. Entscheidend ist, die Methoden zu finden, die zu Ihnen passen, und sie so zu üben, dass Sie sie auch in vollen Wochen anwenden.',
          'Genau hier liegt meist die Lücke zwischen Wissen und Umsetzung. Viele wissen, was ihnen guttun würde, und kommen trotzdem nicht dazu. In meiner [persönlichen Begleitung](/stresscoaching/) arbeiten wir gezielt an dieser Lücke.',
        ],
        ratgeber: 'stressmanagement-im-alltag',
      },
    ],
  },
]

export const WISSEN_THEMEN = WISSEN_GRUPPEN.flatMap((g) => g.themen)

/** Drei Themen für den Teaser auf der Startseite */
export const WISSEN_TEASER = ['stressreaktion', 'bewertung', 'akut-chronisch'].map((id) => WISSEN_THEMEN.find((t) => t.id === id)!)

/** Platzhalter: Themen, die als Nächstes kommen. PRÜFEN: Joana liefert Inhalte, dann als Thema in eine Gruppe übernehmen */
export const WISSEN_DEMNAECHST = [
  { title: 'Stress und Schlaf', text: 'Warum der Kopf abends nicht abschaltet und was Ihrem Schlaf hilft.' },
  { title: 'Mental Load in der Familie', text: 'Die unsichtbare Organisationsarbeit im Alltag und wie man sie teilt.' },
  { title: 'Stress im Beruf', text: 'Druck, Erreichbarkeit und Pausen: was im Arbeitsalltag entlastet.' },
]

export const WISSEN_FAQS: Faq[] = [
  {
    q: 'Ist Stress immer schlecht?',
    a: 'Nein. Kurzer Stress aktiviert und macht leistungsfähig, etwa vor einer Prüfung. Belastend wird Stress, wenn er dauerhaft anhält und die Erholung fehlt. Die Stressforschung unterscheidet dafür Eustress (anregend) und Distress (überfordernd).',
  },
  {
    q: 'Was ist der Unterschied zwischen Stress und Burn-out?',
    a: 'Stress ist eine Reaktion auf Anforderungen und gehört zum Leben. Burn-out beschreibt die Weltgesundheitsorganisation (ICD-11) als Folge von chronischem Stress am Arbeitsplatz, der nicht erfolgreich bewältigt wurde: Erschöpfung, innere Distanz zur Arbeit und verringerte Leistungsfähigkeit. Bei Verdacht auf Burn-out ist ärztlicher oder psychotherapeutischer Rat der richtige Weg. [Coaching oder Therapie?](/ratgeber/stressberatung-coaching-oder-therapie/)',
  },
  {
    q: 'Kann man lernen, besser mit Stress umzugehen?',
    a: 'Ja. Man kann lernen, Stress früher zu erkennen, passende Methoden für akute Momente zu finden und den Alltag so zu gestalten, dass weniger Stress entsteht. Genau darum geht es in meiner [persönlichen Begleitung](/stresscoaching/).',
  },
]

export const WISSEN_QUELLEN = [
  { label: 'Weltgesundheitsorganisation (WHO): Stress, Fragen und Antworten', url: 'https://www.who.int/news-room/questions-and-answers/item/stress' },
  {
    label: 'WHO (2019): Burn-out an "occupational phenomenon", ICD-11',
    url: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases',
  },
  { label: 'Lazarus, R. S. & Folkman, S. (1984): Stress, Appraisal, and Coping. Springer' },
  { label: 'Kaluza, G.: Gelassen und sicher im Stress. Springer' },
  { label: 'McEwen, B. S. (1998): Protective and damaging effects of stress mediators. New England Journal of Medicine' },
  { label: 'Selye, H. (1974): Stress without Distress' },
  { label: 'Techniker Krankenkasse (2021): Entspann dich, Deutschland! TK-Stressstudie 2021' },
]
