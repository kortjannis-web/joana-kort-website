import type { Artikel } from '@/lib/types'
import { ERSTGESPRAECH } from '@/lib/site'

/**
 * Ratgeber (SEO/GEO): Jede Seite beantwortet eine echte Frage. Unter der H1 eine direkte Kurzantwort in zwei bis drei Sätzen,
 * danach Abschnitte mit H2, eine FAQ und Quellen. Keine Heilversprechen, keine Diagnosen.
 * PRÜFEN: Joana liest alle Artikel gegen (fachlich und im Ton).
 */

const CTA_ERSTGESPRAECH = {
  title: 'Sie möchten Ihren Stress nicht allein sortieren?',
  text: 'Im kostenlosen Erstgespräch (15 Minuten) schauen wir gemeinsam, wo Sie stehen und welche Unterstützung zu Ihnen passt.',
  label: 'Kostenloses Erstgespräch',
  href: ERSTGESPRAECH,
}

export const ARTIKEL: Artikel[] = [
  {
    slug: 'was-ist-stress',
    title: 'Was ist Stress? Einfach erklärt',
    metaTitle: 'Was ist Stress? Einfach erklärt | Joana Kort',
    metaDescription:
      'Was ist Stress, wie entsteht er und warum stresst dieselbe Situation nicht jeden? Körper, Bewertung, Stressoren und Verstärker verständlich erklärt.',
    excerpt: 'Wie Stress im Körper entsteht, warum er zuerst ein Schutzmechanismus ist und wann er zur Belastung wird.',
    answer:
      'Stress ist die Reaktion von Körper und Psyche auf Anforderungen, die wir als wichtig und schwer zu bewältigen einschätzen. Er ist zunächst ein sinnvoller Schutzmechanismus, der uns leistungsfähig macht. Belastend wird er, wenn er zu oft, zu lange oder ohne ausreichende Erholung auftritt.',
    category: 'Stress verstehen',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 6,
    cta: CTA_ERSTGESPRAECH,
    blocks: [
      { type: 'h2', text: 'Stress ist zuerst ein Körperprozess', id: 'koerper' },
      {
        type: 'p',
        text: 'Viele denken bei Stress an das Gefühl, dass es kurz vor zwölf ist und alles über den Kopf wächst. Stress beginnt aber viel früher, und zwar im Körper. Nimmt unser Gehirn eine Anforderung als wichtig und herausfordernd wahr, schaltet es auf Bereitschaft: Stresshormone wie Adrenalin und Cortisol werden ausgeschüttet, Herzschlag und Atmung werden schneller, die Muskeln spannen sich an, die Aufmerksamkeit verengt sich.',
      },
      {
        type: 'p',
        text: 'Diese Reaktion ist uralt und sinnvoll. Sie hat Menschen geholfen, in Gefahr schnell zu kämpfen oder zu fliehen. Auch heute macht sie uns kurzfristig wach und leistungsfähig, etwa vor einer Prüfung oder einem wichtigen Gespräch. Problematisch wird es, wenn der Körper kaum noch aus diesem Bereitschaftsmodus herauskommt.',
      },
      { type: 'h2', text: 'Warum dieselbe Situation nicht jeden stresst', id: 'bewertung' },
      {
        type: 'p',
        text: 'Ob eine Situation Stress auslöst, hängt stark davon ab, wie wir sie bewerten. Das beschreibt das bekannte **transaktionale Stressmodell** der Psychologen Richard Lazarus und Susan Folkman. Vereinfacht stellen wir uns unbewusst zwei Fragen:',
      },
      {
        type: 'ol',
        items: [
          '**Ist das wichtig für mich, ist es bedrohlich oder herausfordernd?**',
          '**Habe ich, was ich brauche, um damit fertigzuwerden?** Zeit, Wissen, Unterstützung, Energie.',
        ],
      },
      {
        type: 'p',
        text: 'Lautet die Antwort "ja, wichtig" und "nein, das schaffe ich nicht", entsteht Stress. Deshalb kann ein voller Terminkalender die eine Person beflügeln und die andere lähmen. Und deshalb liegt hier auch ein wichtiger Ansatzpunkt: An der Bewertung und an den eigenen Möglichkeiten lässt sich arbeiten.',
      },
      { type: 'h2', text: 'Drei Ebenen: Auslöser, Verstärker, Reaktion', id: 'ebenen' },
      {
        type: 'p',
        text: 'In der Stressforschung im deutschsprachigen Raum hat sich ein einfaches Bild bewährt, das unter anderem Gert Kaluza beschreibt. Stress spielt sich auf drei Ebenen ab:',
      },
      {
        type: 'table',
        head: ['Ebene', 'Was gemeint ist', 'Beispiele'],
        rows: [
          ['Stressoren', 'Anforderungen und Belastungen von außen', 'Termindruck, Lärm, Konflikte, Pflege von Angehörigen, ein krankes Kind'],
          ['Persönliche Verstärker', 'Eigene Einstellungen und Muster, die Stress verstärken', '"Ich muss alles allein schaffen", Perfektionismus, schwer Nein sagen können'],
          ['Stressreaktion', 'Was in Körper, Gedanken und Verhalten passiert', 'Anspannung, Grübeln, Gereiztheit, Hektik, Rückzug'],
        ],
      },
      {
        type: 'p',
        text: 'Für den Umgang mit Stress heißt das: Man kann an allen drei Stellen ansetzen. Belastungen reduzieren, hinderliche Muster verändern und die eigene Reaktion besser regulieren. Genau so ist meine Begleitung aufgebaut: [Stress verstehen, bewältigen und managen](/mein-ansatz/).',
      },
      { type: 'h2', text: 'Akuter und chronischer Stress', id: 'akut-chronisch' },
      {
        type: 'p',
        text: 'Kurzer, akuter Stress mit anschließender Erholung ist für den Körper gut zu verkraften. Dauert die Belastung dagegen über Wochen und Monate an und fehlen Pausen, spricht man von chronischem Stress. Dann bleibt der Körper dauerhaft in Alarmbereitschaft, und das kann sich auf Schlaf, Stimmung, Konzentration und langfristig auch auf die Gesundheit auswirken.',
      },
      {
        type: 'callout',
        title: 'Stress ist kein Zeichen von Schwäche',
        text: 'Stress zeigt, dass gerade mehr gefordert wird, als an Möglichkeiten zur Verfügung steht. Laut der TK-Stressstudie 2021 fühlt sich rund jeder vierte Erwachsene in Deutschland häufig gestresst. Sie sind damit also nicht allein.',
      },
      { type: 'h2', text: 'Was Sie daraus mitnehmen können', id: 'fazit' },
      {
        type: 'ul',
        items: [
          'Stress beginnt nicht erst, wenn nichts mehr geht. Je früher Sie ihn bemerken, desto leichter lässt er sich steuern. Wie das geht, lesen Sie im Artikel [Stress erkennen](/ratgeber/stress-erkennen/).',
          'Stress ist individuell. Was bei anderen hilft, muss nicht bei Ihnen helfen.',
          'Sie sind Ihrem Stress nicht ausgeliefert: Bewertung, Muster und Alltag lassen sich verändern, Schritt für Schritt.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Ist Stress immer schlecht?',
        a: 'Nein. Kurzfristiger Stress kann aktivieren und leistungsfähig machen. Belastend wird Stress, wenn er dauerhaft anhält und Erholung fehlt.',
      },
      {
        q: 'Was ist der Unterschied zwischen Eustress und Distress?',
        a: 'Eustress ist positiv erlebter Stress, etwa vor einer Aufgabe, auf die man sich freut. Distress ist Stress, der als überfordernd und unangenehm erlebt wird. Die Unterscheidung geht auf den Stressforscher Hans Selye zurück.',
      },
      {
        q: 'Kann man lernen, besser mit Stress umzugehen?',
        a: 'Ja. Man kann lernen, Stress früher zu erkennen, passende Methoden für akute Momente zu finden und den Alltag so zu gestalten, dass weniger Stress entsteht.',
      },
    ],
    sources: [
      { label: 'Weltgesundheitsorganisation (WHO): Stress, Fragen und Antworten', url: 'https://www.who.int/news-room/questions-and-answers/item/stress' },
      { label: 'Lazarus, R. S. & Folkman, S. (1984): Stress, Appraisal, and Coping. Springer' },
      { label: 'Kaluza, G.: Gelassen und sicher im Stress. Springer' },
      { label: 'Techniker Krankenkasse (2021): Entspann dich, Deutschland! TK-Stressstudie 2021' },
    ],
  },
  {
    slug: 'stress-erkennen',
    title: 'Stress erkennen: Anzeichen in Körper, Gedanken und Verhalten',
    metaTitle: 'Stress erkennen: Anzeichen und Symptome | Joana Kort',
    metaDescription:
      'Woran erkennen Sie Stress? Typische Anzeichen in Körper, Gedanken, Gefühlen und Verhalten und wie Sie Ihre persönlichen Frühwarnzeichen finden.',
    excerpt: 'Typische Stress-Anzeichen auf vier Ebenen und wie Sie Ihre persönlichen Frühwarnzeichen finden, bevor es zu viel wird.',
    answer:
      'Stress zeigt sich auf vier Ebenen: im Körper (zum Beispiel Anspannung, Herzklopfen, Schlafprobleme), in den Gedanken (Grübeln, Konzentrationsprobleme), in den Gefühlen (Gereiztheit, innere Unruhe) und im Verhalten (Hektik, Rückzug). Wer seine persönlichen Frühwarnzeichen kennt, kann früher gegensteuern.',
    category: 'Stress verstehen',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 5,
    cta: CTA_ERSTGESPRAECH,
    blocks: [
      { type: 'h2', text: 'Warum wir Stress oft zu spät bemerken', id: 'zu-spaet' },
      {
        type: 'p',
        text: 'Viele Menschen merken erst, dass sie gestresst sind, wenn gar nichts mehr geht: wenn der Kopf nachts nicht abschaltet oder die kleinste Kleinigkeit zu viel ist. Dabei sendet der Körper meist schon viel früher Signale. Wir haben nur gelernt, sie zu übergehen, weil gerade so viel zu tun ist.',
      },
      {
        type: 'p',
        text: 'Die gute Nachricht: Stress-Anzeichen lassen sich lernen wie eine Sprache. Je besser Sie Ihre eigenen Signale kennen, desto früher können Sie reagieren.',
      },
      { type: 'h2', text: 'Anzeichen im Körper', id: 'koerper' },
      {
        type: 'ul',
        items: [
          'Verspannungen in Nacken, Schultern oder Kiefer',
          'Herzklopfen, flache oder schnelle Atmung',
          'Kopfschmerzen, Magen-Darm-Beschwerden',
          'Ein- oder Durchschlafprobleme',
          'Erschöpfung, obwohl Sie geschlafen haben',
        ],
      },
      { type: 'h2', text: 'Anzeichen in den Gedanken', id: 'gedanken' },
      {
        type: 'ul',
        items: [
          'Grübeln und Gedankenkreisen, besonders abends',
          'Konzentrationsprobleme, Vergesslichkeit',
          'Sätze wie "Ich schaffe das nie" oder "Das muss perfekt sein"',
          'Das Gefühl, nicht mehr klar entscheiden zu können',
        ],
      },
      { type: 'h2', text: 'Anzeichen in den Gefühlen', id: 'gefuehle' },
      {
        type: 'ul',
        items: ['Gereiztheit und Ungeduld', 'Innere Unruhe oder Nervosität', 'Das Gefühl, dass Ihnen alles über den Kopf wächst', 'Niedergeschlagenheit oder Lustlosigkeit'],
      },
      { type: 'h2', text: 'Anzeichen im Verhalten', id: 'verhalten' },
      {
        type: 'ul',
        items: [
          'Hektik, mehrere Dinge gleichzeitig tun',
          'Pausen ausfallen lassen, schneller essen',
          'Mehr Kaffee, Zucker, Bildschirmzeit oder Alkohol',
          'Rückzug von Freunden und Hobbys',
          'Aufschieben, obwohl die Zeit drängt',
        ],
      },
      { type: 'h2', text: 'Ihre persönlichen Frühwarnzeichen finden', id: 'fruehwarnzeichen' },
      {
        type: 'p',
        text: 'Nicht jeder Mensch zeigt alle Anzeichen. Die eine bekommt zuerst Nackenschmerzen, der andere wird gereizt, die dritte kann nicht mehr einschlafen. Ihre persönlichen Frühwarnzeichen sind die zwei oder drei Signale, die bei Ihnen zuverlässig zuerst auftauchen.',
      },
      {
        type: 'p',
        text: 'Ein einfacher Weg, sie zu finden, ist ein [Stresstagebuch](/ratgeber/stresstagebuch-anleitung/): Sie notieren über einige Wochen, wann Sie gestresst waren, wie hoch Ihr Stresslevel war und was Sie in Körper und Gedanken bemerkt haben. Schon nach einer Woche zeigen sich meist erste Muster.',
      },
      {
        type: 'callout',
        title: 'Wann Sie ärztlichen Rat suchen sollten',
        text: 'Halten körperliche Beschwerden, Schlafprobleme oder Niedergeschlagenheit über mehrere Wochen an, oder haben Sie Beschwerden, die Sie sich nicht erklären können, lassen Sie das bitte ärztlich abklären. Stress-Anzeichen können auch andere Ursachen haben. Mehr zur Abgrenzung lesen Sie unter [Stressberatung, Coaching oder Therapie](/ratgeber/stressberatung-coaching-oder-therapie/).',
      },
    ],
    faqs: [
      {
        q: 'Welche körperlichen Symptome kann Stress auslösen?',
        a: 'Häufig sind Verspannungen, Kopfschmerzen, Herzklopfen, Magen-Darm-Beschwerden und Schlafprobleme. Weil diese Beschwerden auch andere Ursachen haben können, sollten anhaltende Symptome ärztlich abgeklärt werden.',
      },
      {
        q: 'Wie merke ich, dass mein Stress zu viel wird?',
        a: 'Ein Warnsignal ist, wenn Erholung nicht mehr gelingt: wenn Sie auch am Wochenende oder im Urlaub nicht abschalten, schlecht schlafen und sich dauerhaft erschöpft fühlen.',
      },
    ],
    sources: [
      { label: 'Weltgesundheitsorganisation (WHO): Stress, Fragen und Antworten', url: 'https://www.who.int/news-room/questions-and-answers/item/stress' },
      { label: 'Kaluza, G.: Gelassen und sicher im Stress. Springer' },
    ],
  },
  {
    slug: 'akuter-stress-was-hilft',
    title: 'Akuter Stress: Was im Moment wirklich hilft',
    metaTitle: 'Akuter Stress: Was sofort hilft | Joana Kort',
    metaDescription:
      'Was hilft bei akutem Stress? Fünf Soforthilfen von verlängertem Ausatmen bis Perspektivwechsel und warum nicht jede Methode bei jedem wirkt.',
    excerpt: 'Fünf einfache Soforthilfen für Momente, in denen es eng wird, und warum Üben in ruhigen Zeiten den Unterschied macht.',
    answer:
      'In akuten Stressmomenten hilft alles, was dem Körper signalisiert, dass keine Gefahr besteht: langsam und länger ausatmen, sich bewegen, die Aufmerksamkeit ins Hier und Jetzt holen oder die Situation kurz verlassen. Welche Methode wirkt, ist individuell. Deshalb lohnt es sich, zwei oder drei auszuprobieren und zu üben, bevor es eng wird.',
    category: 'Stress bewältigen',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 5,
    cta: CTA_ERSTGESPRAECH,
    blocks: [
      { type: 'h2', text: 'Was in einem akuten Stressmoment passiert', id: 'stressmoment' },
      {
        type: 'p',
        text: 'In einer akuten Stresssituation schaltet der Körper in Sekunden auf Alarm: Herz und Atmung beschleunigen sich, die Muskeln spannen an, der Blick wird eng. Klares Denken fällt dann schwer. Deshalb helfen in diesem Moment keine langen Überlegungen, sondern einfache Handgriffe, die den Körper wieder herunterfahren.',
      },
      { type: 'h2', text: 'Fünf Soforthilfen', id: 'soforthilfen' },
      {
        type: 'ol',
        items: [
          '**Länger aus- als einatmen.** Etwa vier Sekunden ein, sechs Sekunden aus, für eine bis zwei Minuten. Langsames Atmen mit verlängertem Ausatmen wird mit einer Aktivierung des beruhigenden Teils des Nervensystems in Verbindung gebracht.',
          '**Bewegen.** Ein paar Treppen steigen, die Arme ausschütteln, einmal um den Block gehen. Bewegung baut die Energie ab, die der Körper für "Kampf oder Flucht" bereitgestellt hat.',
          '**Im Hier und Jetzt ankommen.** Benennen Sie leise fünf Dinge, die Sie sehen, vier, die Sie hören, drei, die Sie spüren. Das holt die Aufmerksamkeit aus dem Gedankenkarussell.',
          '**Kurz raus.** Wenn es geht: die Situation für ein paar Minuten verlassen, ein Glas Wasser holen, ans Fenster gehen. Abstand schafft Spielraum.',
          '**Ein hilfreicher Satz.** Statt "Ich schaffe das nie" zum Beispiel "Eins nach dem anderen" oder "Das ist unangenehm, aber ich komme da durch". Solche Sätze legen Sie sich am besten vorher zurecht.',
        ],
      },
      { type: 'h2', text: 'Warum nicht jede Methode bei jedem wirkt', id: 'individuell' },
      {
        type: 'p',
        text: 'Manchen Menschen hilft Atmen sofort, andere werden dabei eher unruhiger und brauchen Bewegung. Manche beruhigt Musik, andere Stille. Stress ist individuell, und genauso individuell sind die Wege, ihn zu bewältigen. Es geht nicht darum, möglichst viele Methoden zu sammeln, sondern zwei oder drei zu finden, die bei Ihnen wirklich funktionieren.',
      },
      { type: 'h2', text: 'Üben, wenn es ruhig ist', id: 'ueben' },
      {
        type: 'p',
        text: 'Eine Methode, die Sie nur aus einem Artikel kennen, fällt Ihnen im Ernstfall selten ein. Üben Sie deshalb in ruhigen Momenten, zum Beispiel jeden Abend zwei Minuten Atmen. So wird die Methode vertraut und ist abrufbar, wenn Sie sie brauchen.',
      },
      {
        type: 'callout',
        title: 'Soforthilfe ersetzt keine Veränderung',
        text: 'Soforthilfen machen akute Momente erträglicher. Wenn solche Momente aber ständig vorkommen, lohnt sich der Blick auf das Ganze: Was löst den Stress immer wieder aus, und was lässt sich im Alltag ändern? Mehr dazu im Artikel [Stressmanagement im Alltag](/ratgeber/stressmanagement-im-alltag/).',
      },
    ],
    faqs: [
      {
        q: 'Was hilft schnell gegen Stress?',
        a: 'Langsames Atmen mit verlängertem Ausatmen, kurze Bewegung, die Aufmerksamkeit bewusst auf die Umgebung lenken und die Situation kurz verlassen. Welche Methode am besten wirkt, ist individuell.',
      },
      {
        q: 'Wie lange dauert es, bis eine Atemübung wirkt?',
        a: 'Viele Menschen spüren nach ein bis zwei Minuten eine leichte Beruhigung. Mit regelmäßigem Üben in ruhigen Momenten gelingt die Übung im Ernstfall leichter.',
      },
    ],
    sources: [
      {
        label: 'Zaccaro, A. et al. (2018): How Breath-Control Can Change Your Life. Frontiers in Human Neuroscience',
        url: 'https://doi.org/10.3389/fnhum.2018.00353',
      },
      { label: 'Kaluza, G.: Gelassen und sicher im Stress. Springer' },
    ],
  },
  {
    slug: 'stressmanagement-im-alltag',
    title: 'Stressmanagement im Alltag: weniger Stress ohne noch mehr To-dos',
    metaTitle: 'Stressmanagement im Alltag: 5 Prinzipien | Joana Kort',
    metaDescription:
      'Stressmanagement heißt nicht, noch mehr zu leisten. Fünf alltagstaugliche Prinzipien: Minimum statt perfekt, klare Prioritäten, einfache Abläufe.',
    excerpt: 'Warum gute Tipps oft zusätzlichen Druck machen und fünf Prinzipien, die den Alltag wirklich entlasten.',
    answer:
      'Gutes Stressmanagement bedeutet nicht, noch mehr zu leisten, sondern den Alltag so zu gestalten, dass weniger unnötiger Stress entsteht. Dazu gehören realistische Standards, klare Prioritäten, einfachere Abläufe und Routinen, die Entscheidungen abnehmen.',
    category: 'Stress managen',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 6,
    cta: CTA_ERSTGESPRAECH,
    blocks: [
      { type: 'h2', text: 'Warum gute Tipps oft zusätzlichen Stress machen', id: 'tipps' },
      {
        type: 'p',
        text: 'Meditieren, Sport, früher ins Bett, gesünder kochen, Digital Detox: Wer gestresst ist, bekommt viele Ratschläge. Jeder für sich ist sinnvoll. Zusammen werden sie schnell zu einer weiteren To-do-Liste, und das schlechte Gewissen wächst mit jedem Punkt, der nicht klappt.',
      },
      {
        type: 'p',
        text: 'Deshalb verstehe ich Stressmanagement anders: Nicht noch mehr tun, sondern den Alltag so organisieren, dass Sie mit Ihren vorhandenen Kräften gut auskommen. Fünf Prinzipien helfen mir selbst als Mutter und Studentin, und ich nutze sie auch in meiner Begleitung.',
      },
      { type: 'h2', text: '1. Minimum, Standard, Extra', id: 'minimum-standard-extra' },
      {
        type: 'p',
        text: 'Nicht jeder Tag ist gleich. Statt einen Plan zu machen, der nur an guten Tagen funktioniert, legen Sie für wiederkehrende Aufgaben drei Stufen fest:',
      },
      {
        type: 'table',
        caption: 'Beispiel Haushalt',
        head: ['Stufe', 'Wann', 'Was'],
        rows: [
          ['Minimum', 'Schlechter Tag: krank, wenig Schlaf, alles zu viel', 'Nur die zwei, drei wichtigsten Handgriffe, etwa fünf Minuten'],
          ['Standard', 'Normaler Tag', 'Der geplante Tagesfokus, etwa 20 bis 30 Minuten'],
          ['Extra', 'Guter Tag mit Energie und Zeit', 'Kleine Zusatzaufgaben. Nie Pflicht, nie nachholen'],
        ],
      },
      {
        type: 'p',
        text: 'Dazu gehört eine wichtige Regel: **Verpasst ist verpasst.** Ein ausgefallener Tag wird nicht nachgeholt und nicht verdoppelt. Das nimmt enorm Druck heraus.',
      },
      { type: 'h2', text: '2. Prioritäten sichtbar machen', id: 'prioritaeten' },
      {
        type: 'p',
        text: 'Wenn alles gleich wichtig wirkt, ist alles dringend. Ein einziges **Wochenziel** hilft, den Fokus zu halten: Was soll am Ende dieser Woche erledigt sein, damit ich zufrieden bin? Alles andere ist willkommen, aber nicht entscheidend.',
      },
      { type: 'h2', text: '3. Vereinfachen statt beschleunigen', id: 'vereinfachen' },
      {
        type: 'p',
        text: 'Wer gestresst ist, versucht oft, schneller zu werden. Nachhaltiger ist es, Abläufe einfacher zu machen: Dinge streichen, die niemand vermisst, Aufgaben bündeln, feste Plätze für Dinge schaffen. Ein Beispiel ist der Unterschied zwischen "putzen" und "zurücksetzen": Nicht jeden Tag soll alles perfekt sein, ein ordentlicher Grundzustand reicht.',
      },
      { type: 'h2', text: '4. Entscheidungen vorab treffen', id: 'entscheidungen' },
      {
        type: 'p',
        text: 'Viele kleine Entscheidungen am Tag kosten Kraft. Ein Wochenplan für das Essen, feste Tage für wiederkehrende Aufgaben oder eine Abendroutine nehmen Ihnen diese Entscheidungen ab. Sie denken einmal nach und profitieren die ganze Woche.',
      },
      { type: 'h2', text: '5. Erholung einplanen, nicht verdienen', id: 'erholung' },
      {
        type: 'p',
        text: 'Pausen sind keine Belohnung für erledigte Arbeit, sondern Voraussetzung dafür, dass Sie leistungsfähig bleiben. Planen Sie Erholung wie einen Termin ein, gerade in vollen Wochen.',
      },
      { type: 'h2', text: 'Wo Sie anfangen können', id: 'anfangen' },
      {
        type: 'p',
        text: 'Nehmen Sie sich nicht alle fünf Prinzipien auf einmal vor. Wählen Sie eine Stelle in Ihrem Alltag, die Sie besonders stresst, und probieren Sie ein Prinzip zwei Wochen lang aus. Kleine Veränderungen, die bleiben, entlasten mehr als große Vorsätze, die nach drei Tagen kippen.',
      },
      {
        type: 'callout',
        title: 'Individuelle Pläne statt allgemeiner Tipps',
        text: 'In der [persönlichen Begleitung](/stresscoaching/) erstellen wir solche Pläne gemeinsam und passend zu Ihrem Leben, zum Beispiel einen Wochenplan, einen Haushaltsplan oder einen Essensplan. Auf Wunsch erstelle ich den Entwurf nach Ihren Angaben für Sie.',
      },
    ],
    faqs: [
      {
        q: 'Was bedeutet Stressmanagement?',
        a: 'Stressmanagement bedeutet, den eigenen Alltag und den Umgang mit Belastungen bewusst so zu gestalten, dass weniger unnötiger Stress entsteht und vorhandener Stress besser bewältigt werden kann.',
      },
      {
        q: 'Wie fange ich mit Stressmanagement an, wenn ich keine Zeit habe?',
        a: 'Mit einer einzigen kleinen Veränderung an der Stelle, die Sie am meisten stresst. Zum Beispiel ein Minimum für schlechte Tage festlegen oder ein Wochenziel aufschreiben.',
      },
    ],
    sources: [{ label: 'Kaluza, G.: Gelassen und sicher im Stress. Springer' }],
  },
  {
    slug: 'stresstagebuch-anleitung',
    title: 'Stresstagebuch führen: Anleitung mit Beispiel',
    metaTitle: 'Stresstagebuch führen: Anleitung & Beispiel | Joana Kort',
    metaDescription:
      'So führen Sie ein Stresstagebuch: sechs Spalten, Stresslevel von 0 bis 10, ein Beispiel-Eintrag und wie Sie nach vier Wochen Muster erkennen.',
    excerpt: 'Mit einem Stresstagebuch erkennen Sie Ihre Auslöser und Muster. So funktioniert es, mit Beispiel aus meinem eigenen Tagebuch.',
    answer:
      'Ein Stresstagebuch hilft, Muster im eigenen Stress zu erkennen. Sie notieren über einige Wochen Situation, Auslöser, Stresslevel von 0 bis 10, Ihre Reaktion in Körper und Gedanken und was geholfen hat. Nach jeder Woche und am Ende schauen Sie zurück und leiten nächste Schritte ab.',
    category: 'Stress verstehen',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 5,
    cta: {
      title: 'Mit dem Stresstagebuch arbeiten wir auch in der Begleitung',
      text: 'Gemeinsam werten wir Ihre Einträge aus und leiten daraus ab, wo Sie ansetzen können. Im kostenlosen Erstgespräch erfahren Sie mehr.',
      label: 'Kostenloses Erstgespräch',
      href: ERSTGESPRAECH,
    },
    blocks: [
      { type: 'h2', text: 'Wozu ein Stresstagebuch?', id: 'wozu' },
      {
        type: 'p',
        text: 'Im Rückblick verschwimmt Stress schnell zu einem Gefühl von "alles war zu viel". Ein Stresstagebuch macht ihn konkret: Wann genau war es zu viel, was hat es ausgelöst, wie haben Sie reagiert, und was hat geholfen? Schon nach wenigen Wochen zeigen sich Muster, die Sie vorher nicht gesehen haben.',
      },
      {
        type: 'image',
        src: '/images/material/stresstagebuch-anleitung-1400.webp',
        alt: 'Anleitung aus dem Stresstagebuch von Joana Kort mit Beispiel-Eintrag und Skala von 0 bis 10',
        w: 1400,
        h: 990,
        caption: 'Anleitung und Beispiel aus meinem Stresstagebuch (vier Wochen, zum Ausdrucken)',
      },
      { type: 'h2', text: 'Die sechs Spalten', id: 'spalten' },
      {
        type: 'table',
        head: ['Spalte', 'Leitfrage'],
        rows: [
          ['Datum und Uhrzeit', 'Wann war es?'],
          ['Situation und Personen', 'Wo war ich, wer war dabei?'],
          ['Auslöser', 'Was hat den Stress ausgelöst?'],
          ['Stresslevel 0 bis 10', '0 = entspannt, 10 = maximaler Stress'],
          ['Reaktion', 'Was spüre ich im Körper, was denke ich?'],
          ['Meine Reaktion und Lösung', 'Was habe ich getan, was hat geholfen?'],
        ],
      },
      { type: 'h2', text: 'Ein Beispiel-Eintrag', id: 'beispiel' },
      {
        type: 'ul',
        items: [
          '**Wann:** Montag, 8:15 Uhr',
          '**Situation:** Stau auf dem Weg zur Arbeit, Termin um 9 Uhr, allein im Auto',
          '**Auslöser:** Angst, zu spät zu kommen und einen schlechten Eindruck zu machen',
          '**Stresslevel:** 7',
          '**Reaktion:** Herzklopfen, hochgezogene Schultern, Gedanke: "Das schaffe ich nie"',
          '**Lösung:** Dreimal tief ausgeatmet, Kollegin kurz Bescheid gegeben. Nächstes Mal 15 Minuten früher los.',
        ],
      },
      { type: 'h2', text: 'Tipps, damit Sie dranbleiben', id: 'tipps' },
      {
        type: 'ul',
        items: [
          '**Kurz und direkt.** Lieber Stichworte direkt nach der Situation als abends alles rekonstruieren.',
          '**Zwei Einträge pro Tag reichen.** Es geht um Muster, nicht um Vollständigkeit.',
          '**Nicht bewerten.** Das Tagebuch ist kein Zeugnis, sondern eine Beobachtung.',
          '**Fester Ort.** Liegt das Tagebuch sichtbar, denken Sie eher daran.',
        ],
      },
      { type: 'h2', text: 'Der Rückblick: Muster erkennen', id: 'rueckblick' },
      {
        type: 'p',
        text: 'Nach jeder Woche schauen Sie kurz zurück: Was hat mich am meisten gestresst? Was hat geholfen? Was probiere ich nächste Woche aus? Nach vier Wochen folgt der große Rückblick: häufigste Auslöser, Stress-Hochzeiten (Tageszeit, Wochentag, Orte, Personen), wirksamste Lösungen und die kleinste Veränderung, die einen Unterschied machen könnte.',
      },
      {
        type: 'callout',
        title: 'Hinweis',
        text: 'Ein Stresstagebuch dient der Selbstbeobachtung und ersetzt keine ärztliche oder therapeutische Beratung.',
      },
    ],
    faqs: [
      {
        q: 'Wie lange sollte man ein Stresstagebuch führen?',
        a: 'Bewährt haben sich etwa vier Wochen. Das reicht, um wiederkehrende Muster zu erkennen, und ist überschaubar genug, um dranzubleiben.',
      },
      {
        q: 'Muss ich jeden Stressmoment aufschreiben?',
        a: 'Nein. Ein bis zwei Einträge pro Tag genügen. Wichtig ist, möglichst direkt nach der Situation zu schreiben.',
      },
    ],
    sources: [{ label: 'Kaluza, G.: Gelassen und sicher im Stress. Springer' }],
  },
  {
    slug: 'stressberatung-coaching-oder-therapie',
    title: 'Stressberatung, Coaching oder Psychotherapie: Was ist der Unterschied?',
    metaTitle: 'Stressberatung, Coaching oder Therapie? | Joana Kort',
    metaDescription:
      'Stressberatung, Stresscoaching oder Psychotherapie: Was ist der Unterschied, für wen ist was gedacht und woran merken Sie, dass Sie ärztliche Hilfe brauchen?',
    excerpt: 'Wofür Stressberatung und Coaching gedacht sind, wann Psychotherapie der richtige Weg ist und wo Sie sofort Hilfe bekommen.',
    answer:
      'Stressberatung und Stresscoaching unterstützen Menschen dabei, mit Stress im Alltag besser umzugehen. Psychotherapie behandelt psychische Erkrankungen und wird von approbierten Psychotherapeutinnen und Psychotherapeuten oder Ärztinnen und Ärzten durchgeführt. Wenn Sie unsicher sind, ist Ihre Hausarztpraxis eine gute erste Anlaufstelle.',
    category: 'Wissen',
    published: '2026-10-16',
    updated: '2026-10-16',
    readingMinutes: 5,
    cta: CTA_ERSTGESPRAECH,
    blocks: [
      { type: 'h2', text: 'Stressberatung', id: 'beratung' },
      {
        type: 'p',
        text: 'In der Stressberatung geht es um Wissen und Orientierung: Was ist Stress, wie entsteht er bei mir, welche Möglichkeiten habe ich? Eine Beraterin hilft, die eigene Situation einzuordnen und passende Wege aufzuzeigen.',
      },
      { type: 'h2', text: 'Stresscoaching', id: 'coaching' },
      {
        type: 'p',
        text: 'Im Coaching steht die Umsetzung im Mittelpunkt. Über einen längeren Zeitraum werden gemeinsam Ziele gesetzt, Methoden ausprobiert, Pläne erstellt und Veränderungen im Alltag begleitet. Meine Begleitung verbindet beides: Beratung, damit Sie verstehen, und Coaching, damit Sie umsetzen. Mehr dazu unter [Stresscoaching](/stresscoaching/).',
      },
      { type: 'h2', text: 'Psychotherapie', id: 'therapie' },
      {
        type: 'p',
        text: 'Psychotherapie ist eine Heilbehandlung für psychische Erkrankungen wie Depressionen, Angststörungen oder Burnout-Folgeerkrankungen. Sie wird von approbierten Psychologischen Psychotherapeutinnen und Psychotherapeuten oder von Ärztinnen und Ärzten mit entsprechender Weiterbildung durchgeführt und kann von der Krankenkasse übernommen werden.',
      },
      {
        type: 'table',
        head: ['', 'Stressberatung und Coaching', 'Psychotherapie'],
        rows: [
          ['Für wen', 'Menschen, die mit Stress im Alltag besser umgehen möchten', 'Menschen mit einer psychischen Erkrankung'],
          ['Ziel', 'Verstehen, Methoden finden, Alltag entlasten', 'Diagnose und Behandlung einer Erkrankung'],
          ['Wer', 'Beraterinnen und Coaches', 'Approbierte Psychotherapeutinnen und Psychotherapeuten, Ärztinnen und Ärzte'],
          ['Kosten', 'In der Regel selbst getragen', 'Häufig Leistung der Krankenkasse'],
        ],
      },
      { type: 'h2', text: 'Woran Sie merken, dass Sie ärztliche oder therapeutische Hilfe brauchen', id: 'warnzeichen' },
      {
        type: 'ul',
        items: [
          'Niedergeschlagenheit, Antriebslosigkeit oder Freudlosigkeit über mehr als zwei Wochen',
          'Anhaltende Schlafstörungen',
          'Panikattacken oder starke Ängste',
          'Körperliche Beschwerden, die nicht abgeklärt sind',
          'Das Gefühl, den Alltag gar nicht mehr zu bewältigen',
          'Gedanken, sich selbst etwas anzutun',
        ],
      },
      {
        type: 'p',
        text: 'In diesen Fällen ist Ihre Hausarztpraxis eine gute erste Anlaufstelle. Termine für eine psychotherapeutische Sprechstunde vermittelt auch der Patientenservice unter der Telefonnummer **116 117**.',
      },
      {
        type: 'callout',
        title: 'Sofort Hilfe, Tag und Nacht',
        text: 'In einer akuten Krise erreichen Sie die TelefonSeelsorge kostenlos und anonym unter **0800 111 0 111** oder **0800 111 0 222**. Im Notfall wählen Sie **112**.',
      },
      { type: 'h2', text: 'Können sich Coaching und Therapie ergänzen?', id: 'ergaenzen' },
      {
        type: 'p',
        text: 'Ja, aber in der richtigen Reihenfolge. Steht eine Erkrankung im Raum, hat die Behandlung Vorrang. Eine Begleitung im Umgang mit Alltagsstress kann danach oder, in Absprache mit der behandelnden Praxis, ergänzend sinnvoll sein. Im Erstgespräch sage ich Ihnen ehrlich, ob mein Angebot gerade das Richtige für Sie ist.',
      },
    ],
    faqs: [
      {
        q: 'Ist Stresscoaching eine Alternative zur Therapie?',
        a: 'Nein. Coaching ersetzt keine Behandlung einer psychischen Erkrankung. Es richtet sich an Menschen, die mit Stress im Alltag besser umgehen möchten.',
      },
      {
        q: 'Wer darf Psychotherapie anbieten?',
        a: 'In Deutschland approbierte Psychologische Psychotherapeutinnen und Psychotherapeuten, Ärztinnen und Ärzte mit entsprechender Qualifikation sowie Heilpraktikerinnen und Heilpraktiker für Psychotherapie im Rahmen ihrer Erlaubnis.',
      },
    ],
    sources: [
      { label: 'TelefonSeelsorge Deutschland', url: 'https://www.telefonseelsorge.de/' },
      { label: 'Patientenservice 116117 der Kassenärztlichen Vereinigungen', url: 'https://www.116117.de/' },
    ],
  },
]
