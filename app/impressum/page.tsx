import { LegalPage } from '@/components/legal/LegalPage'
import ImpressumContent, { ImpressumAngaben } from '@/components/legal/ImpressumContent'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Impressum | Joana Kort Stressberatung',
  description: 'Impressum von Joana Kort Stressberatung in Gummersbach: Angaben nach § 5 DDG, Kontakt und Hinweise.',
  path: '/impressum/',
})

export default function Page() {
  return (
    <LegalPage title="Impressum" path="/impressum/" lead={<ImpressumAngaben />}>
      <ImpressumContent />
    </LegalPage>
  )
}
