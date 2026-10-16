import { Hero, HeroFunnel } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { Reviews } from '@/components/home/Reviews'
import { Situation } from '@/components/home/Situation'
import { Solution } from '@/components/home/Solution'
import { Pillars } from '@/components/home/Pillars'
import { Offer } from '@/components/home/Offer'
import { Process } from '@/components/home/Process'
import { Tools } from '@/components/home/Tools'
import { AboutArea } from '@/components/home/AboutArea'
import { FaqSection } from '@/components/home/FaqSection'
import { JsonLd } from '@/components/ui/JsonLd'
import { Sheet } from '@/components/ui/Sheet'
import { StackBack } from '@/components/ui/Stack'
import { HOME_FAQS } from '@/lib/content/faqs'
import { faqSchema, serviceSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Stressberatung & Stresscoaching Gummersbach und online | Joana Kort',
  description:
    'Stress verstehen, bewältigen und managen: persönliche Stressberatung und Stresscoaching in Gummersbach und online, über 3 oder 6 Monate. Kostenloses Erstgespräch.',
  path: '/',
})

/**
 * Startseite (Aufbau nach Briefing): Hero mit Erstgespräch, Vertrauen (Bewertungen, sobald vorhanden),
 * der Schmerz, die Antwort, die drei Schwerpunkte, das Angebot, der Ablauf, Prinzipien und Werkzeuge, Über mich und Region, FAQ.
 * Der Hero steht, das Sheet schiebt sich darüber. Schluss-CTA ("Jetzt buchen") steckt im Footer.
 */
export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(HOME_FAQS),
          serviceSchema({
            name: 'Stressberatung und Stresscoaching',
            description:
              'Persönliche Begleitung über drei oder sechs Monate: Stress verstehen, bewältigen und managen. Online und vor Ort im Raum Gummersbach.',
            path: '/',
          }),
        ]}
      />
      <Hero />
      <Sheet className="intro-sheet overflow-visible! [--d:0.765s] xl:[--d:1.215s]">
        <HeroFunnel />
        <TrustBar />
        <Reviews />
        <Situation />
        {/* "Die Antwort" bleibt stehen, die drei Schwerpunkte schieben sich mit runden Ecken darüber.
            Eigener Rahmen, damit das Kleben (sticky) danach endet */}
        <div className="relative">
          <StackBack>
            <Solution />
          </StackBack>
          <Pillars sheet />
        </div>
        <Offer />
        <Process />
        <Tools />
        <AboutArea />
        <FaqSection faqs={HOME_FAQS} />
      </Sheet>
    </>
  )
}
