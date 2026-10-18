import { Scale } from 'lucide-react'
import { OpenBlock, OpenItem } from '@/components/ui/OpenBlock'
import { site } from '@/lib/site'

/**
 * Angaben nach § 5 DDG und Kontakt als offener Block über dem Text (Kopf dunkel, Angaben als einzelne Felder). Wird in app/impressum/page.tsx als `lead` gerendert.
 * PRÜFEN: Anschrift (ladungsfähig, kein Postfach) fehlt noch → NEXT_PUBLIC_STREET bzw. lib/site.ts. Ohne Anschrift nicht live gehen.
 */
export function ImpressumAngaben() {
  const { address } = site
  const label = 't-label text-[0.75rem] text-bordeaux'
  const link = 'font-semibold text-espresso-800 underline decoration-bordeaux/45 underline-offset-4 transition-colors duration-300 hover:text-bordeaux'

  return (
    <OpenBlock
      icon={<Scale strokeWidth={1.75} aria-hidden="true" />}
      kicker="Impressum"
      title={
        <>
          Anbieterin und <em>Kontakt</em>
        </>
      }
      bodyClassName="grid gap-1.5 text-base leading-[1.7] text-ink md:grid-cols-2 md:gap-3"
    >
      <OpenItem className="flex flex-col gap-2 px-6 py-5">
        <h2 className={label}>Angaben gemäß § 5 DDG</h2>
        <address className="not-italic">
          <strong className="font-semibold text-espresso-900">{site.owner}</strong>
          <br />
          {site.name}
          <br />
          {address.street || <span className="text-error">[Straße und Hausnummer folgen]</span>}
          <br />
          {address.zip} {address.city}
        </address>
      </OpenItem>

      <OpenItem className="flex flex-col gap-2 px-6 py-5">
        <h2 className={label}>Kontakt</h2>
        <p>
          E-Mail:{' '}
          <a href={`mailto:${site.email}`} className={`${link} break-all`}>
            {site.email}
          </a>
          {site.phone && (
            <>
              <br />
              Telefon:{' '}
              <a href={site.phone.href} className={link}>
                {site.phone.display}
              </a>
            </>
          )}
        </p>
      </OpenItem>
    </OpenBlock>
  )
}

export default function ImpressumContent() {
  const { address } = site

  return (
    <>
      {/* PRÜFEN: Umsatzsteuer. Bei Kleinunternehmerregelung (§ 19 UStG) keine Angabe nötig. Sobald eine USt-IdNr. vorliegt, hier ergänzen. */}

      <h2>Berufsbezeichnung</h2>
      <p>
        Stressberatung und Stresscoaching. Es handelt sich nicht um eine Heilbehandlung und nicht um Psychotherapie im Sinne des
        Psychotherapeutengesetzes oder des Heilpraktikergesetzes. Es werden keine Diagnosen gestellt und keine Krankheiten behandelt.
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <address>
        {site.owner}
        <br />
        {address.street || '[Straße und Hausnummer folgen]'}
        <br />
        {address.zip} {address.city}
      </address>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Sie dienen der allgemeinen Information und ersetzen keine
        ärztliche, psychotherapeutische oder sonstige fachliche Beratung im Einzelfall. Für die Richtigkeit, Vollständigkeit und Aktualität
        der Inhalte kann ich keine Gewähr übernehmen. Als Diensteanbieterin bin ich nach den allgemeinen Gesetzen für eigene Inhalte
        verantwortlich, jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte ist
        stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Bei Bekanntwerden von
        Rechtsverletzungen entferne ich derartige Links umgehend.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Texte, Grafiken und Materialien auf dieser Website (darunter das Stresstagebuch, der Tagesplaner und der Wochenfokus) unterliegen dem
        deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen meiner
        schriftlichen Zustimmung.
      </p>

      <h2>Schriften</h2>
      <p>
        Playfair Display und DM Sans, beide unter der SIL Open Font License, lokal von diesem Server ausgeliefert (keine Verbindung zu
        Google).
      </p>
    </>
  )
}
