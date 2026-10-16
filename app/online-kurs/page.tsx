import { OfferLayout } from '@/components/angebote/OfferLayout'
import { KURS_FAQS } from '@/lib/content/faqs'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Online-Kurs Stressmanagement: in Vorbereitung | Joana Kort',
  description:
    'Online-Kurs zu Stress zum Selbstlernen: verstehen, bewältigen, managen in Ihrem Tempo. Der Kurs ist in Vorbereitung, die Warteliste ist offen.',
  path: '/online-kurs/',
})

export default function OnlineKursPage() {
  return (
    <OfferLayout
      current="kurs"
      interesse="kurs"
      hero={{
        eyebrow: 'Online-Kurs',
        title: (
          <>
            Stress verstehen und managen, in <em>Ihrem</em> Tempo
          </>
        ),
        intro:
          'Mein Wissen und meine Werkzeuge zum Selbstlernen. Der Kurs ist gerade in Vorbereitung. Auf der Warteliste erfahren Sie als Erste, wann er startet.',
      }}
      intro={{
        title: 'Für alle, die selbstständig lernen möchten',
        text: [
          'Nicht jede und jeder möchte oder kann direkt eine persönliche Begleitung beginnen. Der Online-Kurs bietet einen strukturierten Einstieg, den Sie zeitlich flexibel durcharbeiten.',
          'Er folgt den drei Schwerpunkten Stress verstehen, bewältigen und managen und enthält Materialien und Übungen, mit denen Sie das Gelernte direkt im Alltag anwenden.',
        ],
      }}
      facts={[
        ['Status', 'In Vorbereitung'],
        ['Format', 'Online, im eigenen Tempo'],
        ['Inhalte', 'Wissen, Übungen, Materialien'],
      ]}
      themesTitle="Was geplant ist"
      themes={[
        'Verständliche Lektionen zu Stress, Körper und Gedanken',
        'Übungen zum Erkennen der eigenen Stresssignale',
        'Methoden für akute Stressmomente',
        'Vorlagen: Stresstagebuch, Tagesplaner, Wochenfokus',
        'Impulse für einen Alltag mit weniger unnötigem Stress',
        'Zugang online, auf Computer, Tablet und Smartphone',
      ]}
      stepsTitle="So geht es weiter"
      steps={[
        { title: 'Kostenloses Erstgespräch', text: 'Wir klären, ob der Kurs oder eine persönliche Begleitung besser zu Ihnen passt. Ihre Wünsche fließen gern in den Kurs ein.' },
        { title: 'Vorab informiert', text: 'Sie erfahren als Erste, wann der Kurs startet, was er enthält und was er kostet.' },
        { title: 'Loslegen', text: 'Sie entscheiden in Ruhe und starten, wann es für Sie passt.' },
      ]}
      cta={{
        title: 'Bis der Kurs startet: lassen Sie uns sprechen',
        text: 'Im kostenlosen Erstgespräch schauen wir, was Ihnen jetzt schon hilft. Vielleicht passt die persönliche Begleitung, vielleicht warten Sie auf den Kurs.',
      }}
      warteliste={{
        angebot: 'kurs',
        label: 'Online-Kurs: Bescheid sagen, wenn er startet',
        title: 'Lieber nur informiert werden? Zur Warteliste',
        text: 'Unverbindlich und jederzeit wieder austragbar. Ihre Wünsche an den Kurs fließen gern mit ein.',
      }}
      faqs={KURS_FAQS}
    />
  )
}
