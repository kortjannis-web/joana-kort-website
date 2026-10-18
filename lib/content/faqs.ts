import type { Faq } from '@/lib/types'

/**
 * Häufige Fragen, nach Thema. Antworten kurz und direkt (GEO: der erste Satz beantwortet die Frage).
 * Keine Heilversprechen, klare Abgrenzung zur Psychotherapie.
 */

const ERSTGESPRAECH_LINK = '[kostenloses Erstgespräch](/erstgespraech/)'

export const FAQ_GRUNDLAGEN: Faq[] = [
  {
    q: 'Was ist Stressberatung?',
    a: 'Stressberatung ist eine praktische Unterstützung im Umgang mit Stress. Wir schauen gemeinsam, wie Ihr Stress entsteht, wie er sich bei Ihnen zeigt und was Sie konkret tun können, um ihn zu bewältigen und Ihren Alltag zu entlasten. Im Mittelpunkt steht nicht noch mehr Wissen, sondern die Umsetzung in Ihrem Leben.',
  },
  {
    q: 'Was ist der Unterschied zwischen Stressberatung und Stresscoaching?',
    a: 'In der Beratung geht es vor allem um Wissen und Einordnung, im Coaching um die gemeinsame Umsetzung. Meine Begleitung verbindet beides: Ich erkläre verständlich, was bei Stress passiert, und arbeite dann aktiv mit Ihnen an Lösungen, Plänen und Routinen. Deshalb nenne ich mein Hauptangebot [Stresscoaching](/stresscoaching/).',
  },
  {
    q: 'Ist Stresscoaching eine Therapie?',
    a: 'Nein. Meine Begleitung ist keine Psychotherapie und keine Heilbehandlung. Ich stelle keine Diagnosen und behandle keine Erkrankungen. Sie richtet sich an Menschen, die mit Stress im Alltag besser umgehen möchten. Bei Verdacht auf eine psychische oder körperliche Erkrankung ist Ihre Hausärztin, Ihr Hausarzt oder eine psychotherapeutische Praxis die richtige Anlaufstelle. Mehr dazu im Artikel [Stressberatung, Coaching oder Therapie](/ratgeber/stressberatung-coaching-oder-therapie/).',
  },
  {
    q: 'Für wen ist die Begleitung geeignet?',
    a: 'Für Menschen, die wissen, dass sie Stress haben, aber nicht wissen, wo sie anfangen sollen. Für alle, die schon viel über Stress gelesen haben und es trotzdem nicht in ihren Alltag bekommen. Und für alle, die sich eine strukturierte, persönliche Unterstützung wünschen, statt allein herauszufinden, was hilft.',
  },
  {
    q: 'Kann man Stress ganz vermeiden?',
    a: 'Nein, und das ist auch nicht das Ziel. Stress gehört zum Leben, und es wird immer Belastungen geben. Ziel ist, dass Sie Ihren Stress früher erkennen, ihn besser bewältigen und Ihren Alltag so gestalten, dass weniger unnötiger Stress entsteht. Sie gewinnen Ihre Handlungsfähigkeit zurück.',
  },
]

export const FAQ_ABLAUF: Faq[] = [
  {
    q: 'Wie läuft das kostenlose Erstgespräch ab?',
    a: 'Das Erstgespräch dauert etwa 15 Minuten, am Telefon oder per Video. Wir lernen uns kennen, Sie stellen Ihre Fragen, und wir klären gemeinsam, welches Angebot zu Ihrer Situation passen könnte. Es ist unverbindlich, Sie müssen nichts vorbereiten. Hier geht es zum ' + ERSTGESPRAECH_LINK + '.',
  },
  {
    q: 'Wie lange dauert die Begleitung?',
    a: 'Sie wählen zwischen **wöchentlich über drei Monate** (je 45 bis 60 Minuten) und **alle zwei Wochen über sechs Monate** (je 90 Minuten). Beide Programme lassen sich auf die doppelte Laufzeit verlängern (sechs bzw. zwölf Monate), dann erhalten Sie 15 % Rabatt auf jede Sitzung. Alle Varianten folgen denselben drei Schwerpunkten: Stress verstehen, bewältigen und managen.',
  },
  {
    q: 'Warum drei oder sechs Monate und keine Einzelstunden?',
    a: 'Weil Veränderung Zeit und Verbindlichkeit braucht. Wer viel Stress hat, schiebt die Beschäftigung damit gern auf, gerade weil so viel los ist. Ein fester Rahmen sorgt dafür, dass Sie dranbleiben und Ihren Stress systematisch angehen, statt nur punktuell darüber zu sprechen.',
  },
  {
    q: 'Was kostet die Begleitung?',
    a: 'Der Preis richtet sich nach Programm und Format (online oder vor Ort). Ich nenne ihn Ihnen im kostenlosen Erstgespräch, transparent und bevor Sie sich entscheiden. Für Vor-Ort-Termine können Fahrtkosten dazukommen.',
  },
  {
    q: 'Übernimmt die Krankenkasse die Kosten?',
    a: 'In der Regel nicht, weil die Begleitung keine Heilbehandlung ist. Manche Arbeitgeber unterstützen Angebote zur Gesundheitsförderung ihrer Mitarbeitenden. Fragen Sie gern dort nach. Für Teams und Unternehmen gibt es außerdem eigene [Schulungen](/stressmanagement-unternehmen/).',
  },
]

export const FAQ_FORMAT: Faq[] = [
  {
    q: 'Muss ich viel Zeit mitbringen?',
    a: 'Nein. Die Aufgaben zwischen den Sitzungen sind bewusst klein und passen in Ihren Alltag. Es geht nicht darum, noch etwas auf Ihre Liste zu setzen, sondern darum, Belastungen zu reduzieren. Oft entsteht durch die Begleitung sogar Zeit, weil Abläufe einfacher werden.',
  },
  {
    q: 'Findet die Begleitung online oder vor Ort statt?',
    a: 'Beides ist möglich. Online per Video arbeiten wir unabhängig von Ihrem Wohnort. Vor Ort bin ich im Umkreis von etwa 20 Kilometern um Gummersbach für Sie da, für Vor-Ort-Termine berechne ich Fahrtkosten. Mehr dazu: [Stressberatung in Gummersbach](/stressberatung-gummersbach/) und [Stressberatung online](/stressberatung-online/).',
  },
  {
    q: 'Funktioniert Stresscoaching auch online?',
    a: 'Ja. Für viele ist es online sogar leichter: kein Anfahrtsweg, kein zusätzlicher Termin außer Haus, und Sie sind in vertrauter Umgebung. Materialien und Pläne bekommen Sie digital, zum Ausdrucken oder zum Ausfüllen am Bildschirm.',
  },
  {
    q: 'Kann ich die Begleitung auch zu zweit machen?',
    a: 'Ja, zum Beispiel als Paar oder mit einer vertrauten Person. Gerade wenn Sie Alltag, Familie oder Haushalt teilen, kann es sehr entlastend sein, gemeinsam hinzuschauen. Auch kleine Gruppen sind möglich: [Zu zweit oder in der Gruppe](/zu-zweit-und-in-der-gruppe/).',
  },
  {
    q: 'Bleibt vertraulich, was ich erzähle?',
    a: 'Ja. Alles, was Sie mir anvertrauen, behandle ich vertraulich. Ihre Daten nutze ich nur für unsere Zusammenarbeit, Details stehen in der [Datenschutzerklärung](/datenschutz/).',
  },
]

/**
 * Startseite: die 8 wichtigsten Fragen (vor dem Footer), "Alle Fragen" führt zur FAQ-Seite mit 15 Fragen in drei Gruppen.
 * FAQ_ABLAUF: 0 Erstgespräch, 1 Dauer, 2 Warum 3/6, 3 Kosten, 4 Krankenkasse · FAQ_FORMAT: 0 Zeit, 1 Online/vor Ort, 2 Online, 3 Zu zweit, 4 Vertraulich
 */
export const HOME_FAQS: Faq[] = [
  FAQ_GRUNDLAGEN[0],
  FAQ_GRUNDLAGEN[3],
  FAQ_GRUNDLAGEN[2],
  FAQ_ABLAUF[0],
  FAQ_ABLAUF[1],
  FAQ_ABLAUF[3],
  FAQ_FORMAT[1],
  FAQ_FORMAT[0],
]

/** Stresscoaching-Seite */
export const COACHING_FAQS: Faq[] = [FAQ_ABLAUF[1], FAQ_ABLAUF[2], FAQ_FORMAT[0], FAQ_ABLAUF[3], FAQ_GRUNDLAGEN[2], FAQ_FORMAT[2]]

export const UNTERNEHMEN_FAQS: Faq[] = [
  {
    q: 'Für welche Unternehmen sind die Schulungen gedacht?',
    a: 'Vor allem für kleine Unternehmen, Praxen, Büros und Teams, die das Thema Stress gemeinsam angehen möchten. Auch Vereine oder feste Gruppen können eine Schulung anfragen.',
  },
  {
    q: 'Wie lange dauert eine Schulung?',
    a: 'Das richtet sich nach Ihrem Bedarf: von einem kompakten Impuls über einen halben Tag bis zu einer Reihe mit mehreren Terminen. Wir stimmen Inhalte, Umfang und Format im Vorgespräch ab.',
  },
  {
    q: 'Finden die Schulungen online oder bei uns statt?',
    a: 'Beides ist möglich: online per Video oder bei Ihnen vor Ort im Raum Gummersbach. Für Vor-Ort-Termine berechne ich Fahrtkosten.',
  },
  {
    q: 'Ersetzt eine Schulung die Gefährdungsbeurteilung psychischer Belastungen?',
    a: 'Nein. Die Gefährdungsbeurteilung ist eine gesetzliche Pflicht des Arbeitgebers mit eigenem Verfahren. Eine Schulung kann aber ergänzen, indem Mitarbeitende Stress besser verstehen und praktische Werkzeuge für den Arbeitsalltag mitnehmen.',
  },
]

export const WEBINAR_FAQS: Faq[] = [
  {
    q: 'Wie läuft das Webinar ab?',
    a: 'Das Webinar dauert vier Wochen. Es gibt feste Live-Termine per Video und dazwischen eingeplante Zeit für das Selbststudium mit Übungen und Materialien. So setzen Sie das Gelernte direkt in Ihrem Alltag um.',
  },
  {
    q: 'Wann findet das nächste Webinar statt?',
    a: 'Geplant sind zwei bis drei Durchgänge im Jahr. Die Termine stehen noch nicht fest. Tragen Sie sich in die Warteliste ein, dann erfahren Sie als Erste, wann es losgeht.',
  },
  {
    q: 'Muss ich mich vor der Gruppe öffnen?',
    a: 'Nein. Sie entscheiden selbst, was Sie teilen. Viele Inhalte bearbeiten Sie für sich, die Live-Termine sind für Wissen, Fragen und Austausch da.',
  },
]

export const KURS_FAQS: Faq[] = [
  {
    q: 'Wann startet der Online-Kurs?',
    a: 'Der Kurs ist in Vorbereitung. Inhalte, Preis und Starttermin stehen noch nicht fest. Auf der Warteliste erfahren Sie als Erste, wann er verfügbar ist.',
  },
  {
    q: 'Was ist der Unterschied zur persönlichen Begleitung?',
    a: 'Im Online-Kurs lernen Sie selbstständig und in Ihrem Tempo. In der [persönlichen Begleitung](/stresscoaching/) erarbeiten wir gemeinsam Lösungen für Ihre Situation, und ich unterstütze Sie aktiv bei der Umsetzung.',
  },
]

export const ZUZWEIT_FAQS: Faq[] = [
  {
    q: 'Für wen ist die Begleitung zu zweit gedacht?',
    a: 'Für Paare, Eltern, Mitbewohner oder zwei vertraute Menschen, die Alltag und Verantwortung teilen und gemeinsam entlasten möchten. Jede und jeder bringt die eigene Sicht mit, die Lösungen entstehen gemeinsam.',
  },
  {
    q: 'Ist das eine Paartherapie?',
    a: 'Nein. Es geht um Stress und die Organisation Ihres gemeinsamen Alltags, nicht um die Bearbeitung von Beziehungskonflikten. Dafür sind Paarberatungsstellen oder Paartherapie die richtige Adresse.',
  },
  {
    q: 'Wie groß sind die Gruppen?',
    a: 'Bewusst klein, damit jede und jeder zu Wort kommt. Die genaue Größe und den Rahmen besprechen wir vorab.',
  },
]

export const GUMMERSBACH_FAQS: Faq[] = [
  {
    q: 'Wo finden Termine in Gummersbach statt?',
    a: 'Vor-Ort-Termine finden im Umkreis von etwa 20 Kilometern um Gummersbach statt. Wo genau, stimmen wir gemeinsam ab. Für Vor-Ort-Termine berechne ich Fahrtkosten.',
  },
  {
    q: 'Welche Orte gehören zum Umkreis?',
    a: 'Unter anderem Gummersbach, Bergneustadt, Wiehl, Marienheide, Engelskirchen, Reichshof, Nümbrecht, Lindlar und Meinerzhagen. Wenn Sie etwas weiter entfernt wohnen, ist die Begleitung online jederzeit möglich.',
  },
  FAQ_FORMAT[2],
]

export const ONLINE_FAQS: Faq[] = [
  FAQ_FORMAT[2],
  {
    q: 'Was brauche ich für die Online-Begleitung?',
    a: 'Einen Computer, ein Tablet oder ein Smartphone mit Kamera und Mikrofon, eine stabile Internetverbindung und einen ruhigen Ort, an dem Sie ungestört sprechen können. Den Link zur Videositzung bekommen Sie vorab per E-Mail.',
  },
  {
    q: 'Kann ich online aus ganz Deutschland teilnehmen?',
    a: 'Ja. Online-Sitzungen, Webinare und der Online-Kurs sind unabhängig von Ihrem Wohnort.',
  },
]

/** Alle Fragen der FAQ-Seite: 15 Fragen in drei Gruppen zu je fünf */
export const FAQ_GRUPPEN = [
  { id: 'grundlagen', title: 'Stressberatung und Stresscoaching', faqs: FAQ_GRUNDLAGEN },
  { id: 'ablauf', title: 'Ablauf, Dauer und Kosten', faqs: FAQ_ABLAUF },
  { id: 'alltag', title: 'Format und Alltag', faqs: FAQ_FORMAT },
]

export const FAQS: Faq[] = FAQ_GRUPPEN.flatMap((g) => g.faqs)
