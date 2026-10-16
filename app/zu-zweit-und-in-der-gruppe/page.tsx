import { OfferLayout } from '@/components/angebote/OfferLayout'
import { ZUZWEIT_FAQS } from '@/lib/content/faqs'
import { pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Stresscoaching zu zweit, als Paar oder in Gruppen | Joana Kort',
  description:
    'Stress gemeinsam angehen: Begleitung zu zweit, als Paar oder in kleinen Gruppen. Alltag entlasten, Aufgaben fair organisieren. Gummersbach und online.',
  path: '/zu-zweit-und-in-der-gruppe/',
})

export default function ZuZweitPage() {
  return (
    <OfferLayout
      current="zu-zweit"
      interesse="zu-zweit"
      hero={{
        eyebrow: 'Zu zweit und in der Gruppe',
        title: (
          <>
            Stress <em>gemeinsam</em> angehen
          </>
        ),
        intro:
          'Wer Alltag, Familie oder Haushalt teilt, teilt oft auch den Stress. Zu zweit oder in einer kleinen Runde schauen wir auf das, was Sie gemeinsam entlasten kann.',
      }}
      intro={{
        title: 'Für Paare, Familien und vertraute Menschen',
        text: [
          'Ob als Paar, als Eltern, mit einer Freundin oder als kleine Gruppe von Menschen in ähnlicher Situation: Gemeinsam fällt es oft leichter, dranzubleiben. Jede und jeder bringt die eigene Sicht mit, die Lösungen entstehen zusammen.',
          'Der Aufbau folgt denselben drei Schwerpunkten wie die persönliche Begleitung: Stress verstehen, bewältigen und managen. Dazu kommt der Blick auf das Miteinander: Wer übernimmt was, wo entsteht unnötiger Druck, was entlastet alle?',
        ],
      }}
      facts={[
        ['Für wen', 'Paare, zwei Personen, kleine Gruppen'],
        ['Format', `Online oder vor Ort im Raum ${site.address.city}`],
        ['Einstieg', 'Kostenloses Erstgespräch'],
      ]}
      themesTitle="Worum es gehen kann"
      themes={[
        'Wie wir beide Stress erleben und woran wir es beim anderen erkennen',
        'Aufgaben und Verantwortung im Haushalt fair und einfach verteilen',
        'Routinen, die den gemeinsamen Alltag entlasten',
        'Wochenplanung, Essensplan und Haushaltsplan, die zu beiden passen',
        'Akute Stressmomente gemeinsam besser meistern',
        'Gegenseitige Unterstützung, ohne sich zu überfordern',
      ]}
      stepsTitle="So läuft es ab"
      steps={[
        { title: 'Erstgespräch', text: 'Kurz und kostenlos, gern schon zu zweit. Wir klären, was Sie sich wünschen und welcher Rahmen passt.' },
        { title: 'Gemeinsame Stresslandkarte', text: 'Wo entsteht bei Ihnen Stress, einzeln und zusammen? Daraus entsteht ein gemeinsamer Plan.' },
        { title: 'Umsetzen und anpassen', text: 'In festen Terminen probieren wir Veränderungen aus und passen sie an Ihren Alltag an.' },
      ]}
      cta={{
        title: 'Lassen Sie uns zu zweit sprechen',
        text: 'Im kostenlosen Erstgespräch klären wir, ob eine Begleitung zu zweit oder in der Gruppe zu Ihnen passt. Gern schon gemeinsam.',
      }}
      faqs={ZUZWEIT_FAQS}
    />
  )
}
