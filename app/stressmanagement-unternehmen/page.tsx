import { OfferLayout } from '@/components/angebote/OfferLayout'
import { UNTERNEHMEN_FAQS } from '@/lib/content/faqs'
import { pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Stressmanagement-Schulung für Unternehmen & Teams | Joana Kort',
  description:
    'Praxisnahe Schulungen zu Stress und Stressmanagement für kleine Unternehmen und Teams im Oberbergischen und online. Inhalte und Umfang nach Ihrem Bedarf.',
  path: '/stressmanagement-unternehmen/',
})

export default function UnternehmenPage() {
  return (
    <OfferLayout
      current="unternehmen"
      interesse="unternehmen"
      hero={{
        tone: 'greige',
        eyebrow: 'Für Unternehmen und Teams',
        title: (
          <>
            Stress im Arbeitsalltag <em>gemeinsam</em> verstehen und reduzieren
          </>
        ),
        intro:
          'Praxisnahe Schulungen für kleine Unternehmen, Teams und Gruppen: Wissen über Stress, Werkzeuge für den Alltag und konkrete Ideen, die sofort umsetzbar sind.',
      }}
      intro={{
        title: 'Gesunde Mitarbeitende, entspanntere Teams',
        text: [
          'Stress im Team zeigt sich oft leise: mehr Fehler, mehr Gereiztheit, mehr Ausfälle. Eine Schulung schafft eine gemeinsame Sprache für das Thema und gibt allen Werkzeuge an die Hand, mit Belastungen besser umzugehen.',
          `Inhalte, Umfang und Format stimme ich auf Ihr Team ab, online oder bei Ihnen vor Ort im Raum ${site.address.city}. Gern auch als Reihe mit mehreren Terminen, damit das Gelernte im Arbeitsalltag ankommt.`,
        ],
      }}
      facts={[
        ['Für wen', 'Kleine Unternehmen, Teams, Gruppen'],
        ['Format', 'Online oder bei Ihnen vor Ort'],
        ['Umfang', 'Impuls, halber Tag oder Reihe'],
      ]}
      themesTitle="Mögliche Inhalte"
      themes={[
        'Was Stress ist und wie er im Körper wirkt',
        'Stress frühzeitig erkennen, bei sich und im Team',
        'Methoden für akute Stresssituationen im Arbeitsalltag',
        'Prioritäten setzen und Aufgaben besser organisieren',
        'Pausen, Erholung und Grenzen im Arbeitsalltag',
        'Gemeinsame Vereinbarungen, die das ganze Team entlasten',
      ]}
      stepsTitle="So kommt die Schulung zu Ihnen"
      steps={[
        { title: 'Vorgespräch', text: 'Wir sprechen über Ihr Team, Ihren Anlass und Ihre Ziele. Kostenlos und unverbindlich.' },
        { title: 'Angebot und Konzept', text: 'Sie bekommen ein Konzept mit Inhalten, Umfang, Format und Preis, abgestimmt auf Sie.' },
        { title: 'Schulung und Nachklang', text: 'Praxisnah, mit Übungen und Materialien. Auf Wunsch mit Folgetermin, damit es im Alltag hält.' },
      ]}
      cta={{
        title: 'Erzählen Sie mir von Ihrem Team',
        text: 'Im kostenlosen Erstgespräch (15 Minuten) klären wir Anlass, Ziele und welches Format zu Ihnen passt.',
      }}
      faqs={UNTERNEHMEN_FAQS}
    />
  )
}
