import { OfferLayout } from '@/components/angebote/OfferLayout'
import { WEBINAR_FAQS } from '@/lib/content/faqs'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Online-Webinar Stressbewältigung: 4 Wochen live | Joana Kort',
  description:
    'Vier Wochen Online-Webinar zu Stress: Live-Termine per Video, Übungen und Selbststudium. Stress verstehen, bewältigen, managen. Kostenloses Erstgespräch.',
  path: '/webinar/',
})

export default function WebinarPage() {
  return (
    <OfferLayout
      current="webinar"
      interesse="webinar"
      hero={{
        tone: 'greige',
        eyebrow: 'Online-Webinar',
        title: (
          <>
            Vier Wochen, die Ihren Umgang mit Stress <em>verändern</em> können
          </>
        ),
        intro:
          'Live per Video, mit festen Terminen und eingeplanter Zeit zum Selbststudium. Für alle, die sich strukturiert und in Gemeinschaft mit ihrem Stress beschäftigen möchten.',
      }}
      intro={{
        title: 'Lernen, ausprobieren, dranbleiben',
        text: [
          'Das Webinar läuft über vier Wochen. In den Live-Terminen vermittle ich Wissen über Stress verständlich und praxisnah, beantworte Fragen und gebe Raum für Austausch. Zwischen den Terminen arbeiten Sie mit Übungen und Materialien selbstständig weiter.',
          'So bleibt es nicht bei Theorie: Sie probieren direkt in Ihrem Alltag aus, was Sie gelernt haben, und bringen Ihre Erfahrungen in den nächsten Termin mit.',
        ],
      }}
      facts={[
        ['Dauer', 'Vier Wochen, live per Video'],
        ['Dazwischen', 'Übungen und Selbststudium'],
        ['Nächster Start', 'Termine folgen'],
      ]}
      themesTitle="Was Sie in vier Wochen erwartet"
      themes={[
        'Woche 1: Was Stress ist und wie er bei Ihnen entsteht',
        'Woche 2: Signale erkennen, Muster verstehen (mit Stresstagebuch)',
        'Woche 3: Methoden für akute Stressmomente finden und üben',
        'Woche 4: Den Alltag entlasten: Prioritäten, Routinen, Pläne',
        'Materialien zum Ausdrucken und Ausfüllen',
        'Raum für Fragen und Austausch in der Gruppe',
      ]}
      stepsTitle="So nehmen Sie teil"
      steps={[
        { title: 'Kostenloses Erstgespräch', text: 'In 15 Minuten klären wir, ob das Webinar zu Ihnen passt. Danach sind Sie für den nächsten Durchgang vorgemerkt.' },
        { title: 'Platz sichern', text: 'Sobald die Termine feststehen, bekommen Sie alle Details zu Ablauf und Kosten und entscheiden in Ruhe.' },
        { title: 'Vier Wochen dabei sein', text: 'Live-Termine, Übungen und Materialien. Den Link zur Videositzung erhalten Sie vorab per E-Mail.' },
      ]}
      cta={{
        title: 'Seien Sie beim nächsten Durchgang dabei',
        text: 'Die Termine für das nächste Webinar stehen noch nicht fest. Im kostenlosen Erstgespräch klären wir, ob das Webinar zu Ihnen passt, und ich merke Sie vor.',
      }}
      warteliste={{
        angebot: 'webinar',
        label: 'Webinar: Bescheid sagen, wenn es losgeht',
        title: 'Lieber nur informiert werden? Zur Warteliste',
        text: 'Tragen Sie sich unverbindlich ein. Ich melde mich, sobald die Termine feststehen. Jederzeit wieder austragbar.',
      }}
      faqs={WEBINAR_FAQS}
    />
  )
}
