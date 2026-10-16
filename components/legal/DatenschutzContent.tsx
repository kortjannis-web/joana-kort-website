import { site } from '@/lib/site'

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

/**
 * Datenschutzerklärung für Joana Kort Stressberatung. Stand 16.10.2026.
 * PRÜFEN-Kommentare vor dem Go-live abarbeiten (Hoster, E-Mail-Anbieter, Anschrift, ggf. Terminbuchungstool).
 */
export default function DatenschutzContent() {
  const { address } = site
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>

  return (
    <>
      <p>
        Mit dieser Datenschutzerklärung informiere ich Sie darüber, welche personenbezogenen Daten ich beim Besuch dieser Website und bei
        der Nutzung der Formulare verarbeite, zu welchen Zwecken und auf welcher Rechtsgrundlage dies geschieht und welche Rechte Ihnen
        zustehen. Ihre Daten sind mir anvertraut, und ich gehe entsprechend sorgsam damit um: Diese Website verwendet kein Tracking, keine
        Werbung und keine Inhalte von Drittanbietern.
      </p>

      <h2>1. Verantwortliche</h2>
      <p>Verantwortlich für die Datenverarbeitung im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
      <address>
        {site.owner}
        <br />
        {site.name}
        <br />
        {address.street || '[Straße und Hausnummer folgen]'}
        <br />
        {address.zip} {address.city}
        <br />
        E-Mail: {mail}
      </address>
      <p>
        Ein Datenschutzbeauftragter ist nicht benannt, da hierzu keine gesetzliche Pflicht besteht. Bei Fragen zum Datenschutz wenden Sie
        sich bitte direkt an mich.
      </p>

      <h2>2. Allgemeine Hinweise</h2>
      <h3>Rechtsgrundlagen</h3>
      <ul>
        <li>
          <strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> Ihre Einwilligung,
        </li>
        <li>
          <strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> Durchführung vorvertraglicher Maßnahmen und Erfüllung eines Vertrags, etwa bei einer
          Anfrage für ein Erstgespräch oder einer Begleitung,
        </li>
        <li>
          <strong>Art. 6 Abs. 1 lit. c DSGVO:</strong> Erfüllung rechtlicher Pflichten, zum Beispiel steuerrechtlicher Aufbewahrungspflichten,
        </li>
        <li>
          <strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> berechtigte Interessen, etwa am sicheren und stabilen Betrieb dieser Website.
        </li>
      </ul>
      <h3>Speicherdauer</h3>
      <p>
        Ich speichere personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche
        Aufbewahrungsfristen es verlangen. Danach werden die Daten gelöscht.
      </p>
      <h3>Empfänger</h3>
      <p>
        Ihre Daten gebe ich nicht an Dritte weiter. Technische Dienstleister (Hosting, E-Mail-Versand) verarbeiten Daten ausschließlich in
        meinem Auftrag und nach meinen Weisungen auf Grundlage eines Vertrags zur Auftragsverarbeitung (Art. 28 DSGVO).
      </p>
      <h3>Keine Übermittlung in Drittländer</h3>
      <p>
        Durch diese Website findet keine Übermittlung Ihrer Daten in Länder außerhalb der Europäischen Union oder des Europäischen
        Wirtschaftsraums statt. Eine Ausnahme kann nur entstehen, wenn Sie mich über WhatsApp kontaktieren (siehe Abschnitt 4).
      </p>

      <h2>3. Hosting und Bereitstellung der Website</h2>
      {/* PRÜFEN: Hoster bestätigen (gleiche Infrastruktur wie bei TOPsichtbar-Kunden: VPS bei Hostinger, Verwaltung über Coolify?), Serverstandort in der EU, AV-Vertrag abgelegt. */}
      <h3>Hosting</h3>
      <p>
        Diese Website wird auf einem eigenen Server in einem Rechenzentrum innerhalb der Europäischen Union betrieben. Der Anbieter des
        Servers verarbeitet die beim Aufruf übertragenen Daten in meinem Auftrag. Rechtsgrundlage ist mein berechtigtes Interesse an einer
        sicheren und zuverlässigen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO).
      </p>
      <h3>Server-Logdateien</h3>
      <p>
        Beim Aufruf der Website werden technisch notwendige Informationen verarbeitet, die Ihr Browser übermittelt: IP-Adresse, Datum und
        Uhrzeit, aufgerufene Seite, Referrer-URL, Browser und Betriebssystem. Diese Daten dienen ausschließlich der Sicherheit und
        Fehleranalyse, werden nicht mit anderen Daten zusammengeführt und nach spätestens 14 Tagen gelöscht.
      </p>
      <h3>Verschlüsselung</h3>
      <p>Die Übertragung erfolgt verschlüsselt (TLS). Sie erkennen das am Schloss-Symbol und an „https://“ in der Adresszeile.</p>

      <h2>4. Kontakt per E-Mail, Telefon oder WhatsApp</h2>
      <h3>E-Mail und Telefon</h3>
      <p>
        Wenn Sie mir eine E-Mail schreiben oder mich anrufen, verarbeite ich Ihre Angaben (zum Beispiel Name, Telefonnummer, E-Mail-Adresse
        und Ihr Anliegen), um Ihre Anfrage zu beantworten (Art. 6 Abs. 1 lit. b DSGVO bzw. lit. f DSGVO bei allgemeinen Anfragen). Die
        Daten lösche ich, sobald die Anfrage erledigt ist und keine Aufbewahrungspflichten bestehen.
      </p>
      <h3>WhatsApp</h3>
      {/* PRÜFEN: WhatsApp Business App auf einem eigenen Gerät bzw. ohne Zugriff auf private Kontakte nutzen, Speicherdauer der Chats festlegen. */}
      <p>
        Sie können mich über WhatsApp kontaktieren. Der WhatsApp-Knopf auf dieser Website ist ein einfacher Link: Es werden keine Skripte
        von WhatsApp oder Meta geladen, und beim bloßen Aufruf der Seiten werden keine Daten an WhatsApp übertragen. Erst wenn Sie im
        Hinweisfenster auf „Chat starten“ klicken, öffnet sich WhatsApp.
      </p>
      <p>
        Anbieter in der Europäischen Union ist die WhatsApp Ireland Limited, ein Unternehmen der Meta-Gruppe. Ab diesem Zeitpunkt verarbeitet
        WhatsApp Ihre Daten, zum Beispiel Ihre Telefonnummer, Ihren Profilnamen und Metadaten der Kommunikation, in eigener Verantwortung
        nach den{' '}
        <a href="https://www.whatsapp.com/legal/privacy-policy-eea" {...ext}>
          Datenschutzbestimmungen von WhatsApp
        </a>
        . Dabei können Daten an Unternehmen der Meta-Gruppe in den USA übermittelt werden, die unter dem EU-US Data Privacy Framework
        zertifiziert sind (Angemessenheitsbeschluss nach Art. 45 DSGVO). Die Inhalte der Nachrichten sind nach Angaben von WhatsApp
        Ende-zu-Ende-verschlüsselt.
      </p>
      <p>
        Wenn Sie mir per WhatsApp schreiben, verarbeite ich Ihre Telefonnummer, Ihren Profilnamen und den Inhalt Ihrer Nachricht, um Ihr
        Anliegen zu beantworten (Art. 6 Abs. 1 lit. b DSGVO bei Anfragen zu meinen Angeboten, im Übrigen lit. f DSGVO). Die Nutzung ist
        freiwillig. Bitte schicken Sie mir über WhatsApp keine Gesundheitsdaten. Sie erreichen mich jederzeit auch per Telefon oder E-Mail.
      </p>

      <h2>5. Formulare auf dieser Website</h2>
      <h3>Anfrage für ein Erstgespräch</h3>
      <p>Für die Vereinbarung des kostenlosen Erstgesprächs verarbeite ich:</p>
      <ul>
        <li>Pflichtangaben: Vor- und Nachname, E-Mail-Adresse, gewünschte Gesprächsform (Telefon oder Video), bei Telefon Ihre Telefonnummer,</li>
        <li>freiwillige Angaben: Interesse an einem Angebot, bevorzugtes Format, Beruf oder Branche, Altersgruppe, passende Tageszeiten, Ihre Nachricht.</li>
      </ul>
      <p>
        Die Angaben dienen ausschließlich der Vorbereitung und Vereinbarung des Erstgesprächs. Rechtsgrundlagen sind die Durchführung
        vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) und Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Bewusst frage ich keine
        Gesundheitsdaten und kein Geburtsdatum ab. Bitte teilen Sie mir im Nachrichtenfeld keine Angaben zu Ihrer Gesundheit mit.
      </p>
      <h3>Warteliste (Webinar, Online-Kurs, Gruppen)</h3>
      <p>
        Wenn Sie sich in eine Warteliste eintragen, verarbeite ich Ihren Vornamen, optional Ihren Nachnamen, Ihre E-Mail-Adresse und Ihre
        Nachricht, um Sie über Termine und den Start des Angebots zu informieren (Art. 6 Abs. 1 lit. a DSGVO). Sie können sich jederzeit mit
        einer kurzen Nachricht wieder austragen.
      </p>
      <h3>Verarbeitung und Speicherung</h3>
      <p>
        Formulareingaben werden per verschlüsselter Verbindung an diesen Server übertragen, dort gespeichert und mir per E-Mail zugestellt.
        Sie erhalten eine Bestätigung an die angegebene E-Mail-Adresse. Zum Schutz vor Missbrauch wird die Anzahl der Anfragen je IP-Adresse
        kurzzeitig begrenzt, die IP-Adresse wird dafür nur im Arbeitsspeicher gehalten und nicht dauerhaft gespeichert. Anfragen, aus denen
        keine Zusammenarbeit entsteht, lösche ich spätestens nach zwölf Monaten.
      </p>
      {/* PRÜFEN: Sobald eine Online-Terminbuchung (NEXT_PUBLIC_BOOKING_URL, z. B. Calendly) eingebunden wird, Anbieter, Datenübermittlung und Rechtsgrundlage hier ergänzen. */}

      <h2>6. E-Mail-Versand</h2>
      {/* PRÜFEN: Anbieter des Postfachs und des SMTP-Versands eintragen (Name, Anschrift, Serverstandort) und AV-Vertrag abschließen. */}
      <p>
        Für den Versand der Benachrichtigungen und Bestätigungen nutze ich einen E-Mail-Anbieter mit Servern in der Europäischen Union, der
        in meinem Auftrag tätig ist.
      </p>

      <h2>7. Schriftarten</h2>
      <p>
        Die Schriften dieser Website (Playfair Display und DM Sans) werden lokal von diesem Server geladen. Es besteht keine Verbindung zu
        Servern von Google oder anderen Anbietern.
      </p>

      <h2>8. Cookies und lokale Speicherung</h2>
      <p>Diese Website setzt keine Cookies und speichert keine Daten in Ihrem Browser. Eine Einwilligungsabfrage ist daher nicht erforderlich.</p>

      <h2>9. Keine Analyse- und Tracking-Dienste</h2>
      <p>
        Ich verwende keine Analyse-, Tracking- oder Werbedienste wie Google Analytics oder Meta-Pixel. Ihr Besuch wird nicht ausgewertet und
        nicht für Werbung genutzt.
      </p>

      {(site.social.instagram || site.social.linkedin) && (
        <>
          <h2>10. Profile in sozialen Netzwerken</h2>
          <p>
            Diese Website verlinkt auf meine Profile in sozialen Netzwerken. Erst wenn Sie einen Link anklicken, gelangen Sie zum jeweiligen
            Anbieter. Dort gelten dessen Datenschutzbestimmungen.
          </p>
        </>
      )}

      <h2>Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO),</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
        <li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
        <li>Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO),</li>
        <li>Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO).</li>
      </ul>
      <p>Eine formlose E-Mail an {mail} genügt.</p>
      <h3>Beschwerderecht bei einer Aufsichtsbehörde</h3>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für mich zuständig ist die Landesbeauftragte für
        Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2 bis 4, 40213 Düsseldorf,{' '}
        <a href="https://www.ldi.nrw.de/" {...ext}>
          www.ldi.nrw.de
        </a>
        .
      </p>

      <h2>Änderungen</h2>
      <p>Ich passe diese Datenschutzerklärung an, wenn sich die Website oder die rechtlichen Vorgaben ändern. Stand: Oktober 2026.</p>
    </>
  )
}
