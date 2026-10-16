import { LegalPage } from '@/components/legal/LegalPage'
import DatenschutzContent from '@/components/legal/DatenschutzContent'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Datenschutzerklärung | Joana Kort Stressberatung',
  description: 'Datenschutzerklärung von Joana Kort Stressberatung: kein Tracking, keine Cookies. Welche Daten die Formulare verarbeiten und welche Rechte Sie haben.',
  path: '/datenschutz/',
})

export default function Page() {
  return (
    <LegalPage title="Datenschutzerklärung" path="/datenschutz/">
      <DatenschutzContent />
    </LegalPage>
  )
}
