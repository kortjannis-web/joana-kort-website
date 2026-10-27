# Anleitung 2: Kalender, Coolify und Website

Stand 27.10.2026. Alles außer E-Mail (das steht in **[MAIL.md](MAIL.md)**, Anleitung 1).
Betrifft die Website (`joana-kort-website`), Joanas Terminkalender **Burocalendar** (`kortjannis-web/Burocalendar`) und
optional **RecordIt**.

## So hängt alles zusammen

```
stressberatung-kort.de
 ├─ www.stressberatung-kort.de      Website (Coolify, Repo joana-kort-website)
 │     Fragebogen → Mail an info@ + Kontakt in Joanas Kalender
 │     "Gleich einen Termin wählen" → Buchungsseite
 ├─ termine.stressberatung-kort.de  Joanas Burocalendar (Coolify, Repo Burocalendar, eigene Datenbank)
 │     Buchungsseite, Joanas Verwaltung, Videoraum /meet/…, Mails von info@
 └─ info@stressberatung-kort.de     Postfach (Anleitung 1)

Burocalendar-Repo (main) → Tests grün → Rollout: erst Ihr Kalender, dann Joanas
```

- Joana bekommt einen **eigenen** Burocalendar, kein Unterkonto bei Ihnen. Nur so kommen Mails von **info@**, zeigen alle
  Links (Buchung, Videoraum, Absagen) auf **ihre Domain**, steht überall **Joana Kort Stressberatung**, und Sie sehen ihre
  Klienten nicht (und sie Ihre nicht).
- Burocalendar wird **nicht** in das Website-Repo eingebaut. Es ist eine eigene Anwendung in Coolify auf demselben VPS.
  Updates kommen aus dem Burocalendar-Repo automatisch, sobald die Tests grün sind (Schritt 8).

**Diese Einrichtung kann Claude lokal mit Coolify-Zugriff selbst erledigen:** Arbeitsliste `docs/AUFTRAG-COOLIFY.md`.

**Was ich schon fertig gebaut und getestet habe:**
- Website: E-Mail-Adresse überall info@, Domain-Standard stressberatung-kort.de, Knopf "Gleich einen Termin wählen",
  Termin-Knopf im Handy-Menü, Datenschutz-Abschnitt zur Terminbuchung, Übertragung jeder Anfrage als Kontakt in den Kalender.
  Alles schaltet sich ein, sobald die Werte aus Schritt 6 in Coolify stehen.
- Burocalendar: Buchung, Bestätigung, Erinnerung, Nachfass-Mail, selbst eingetragene Termine, Sofort-Meeting mit Joanas
  Absender durchgespielt. Automatischer Rollout an alle Kalender nach grünen Tests, `/api/health` meldet den Stand.

Platzhalter: **`1.2.3.4`** = IP des VPS (hPanel → VPS → Übersicht), **`1-2-3-4`** = dieselbe IP mit Bindestrichen.
Gesamtdauer: etwa 1,5 Stunden, davon 30 Minuten mit Joana.

---

## Schritt 1: DNS (ca. 10 Min., dann bis 30 Min. warten)

Beim Domain-Anbieter von `stressberatung-kort.de` (Hostinger: hPanel → **Domains** → stressberatung-kort.de →
**DNS / Nameserver**) diese **A-Records** anlegen bzw. prüfen:

| Typ | Name | Ziel | Wofür |
|---|---|---|---|
| A | `termine` | `1.2.3.4` | Joanas Kalender |
| A | `@` | `1.2.3.4` | Website (falls noch nicht auf den VPS zeigt) |
| A | `www` | `1.2.3.4` | Website (falls noch nicht auf den VPS zeigt) |

Die **MX-, SPF-, DKIM- und DMARC-Einträge nicht anfassen** (gehören zum Postfach). Prüfen: <https://dnschecker.org> →
`termine.stressberatung-kort.de` → überall `1.2.3.4`.

## Schritt 2: Website auf die Domain (Coolify, ca. 5 Min.)

Nur nötig, wenn die Website noch unter einer Test-Adresse (z. B. sslip.io) läuft.

1. Coolify → Projekt der **Website** → **General → Domains**:
   `https://www.stressberatung-kort.de,https://stressberatung-kort.de` → Speichern.
2. **Environment Variables:** `NEXT_PUBLIC_SITE_URL` = `https://www.stressberatung-kort.de`.
3. **Redeploy.** Danach `https://www.stressberatung-kort.de` öffnen (Schloss-Symbol = Zertifikat da).
4. `NEXT_PUBLIC_INDEXABLE` erst auf `true`, wenn die Website wirklich live gehen soll (Impressum-Anschrift fehlt noch:
   `NEXT_PUBLIC_STREET`). Bis dahin bleibt sie für Google unsichtbar.

## Schritt 3: Joanas Burocalendar in Coolify anlegen (ca. 15 Min.)

1. **Werte holen.** hPanel → VPS → **Browser-Terminal**:
   ```bash
   cat /root/burocalendar-werte.txt     # TURN_SECRET daraus übernehmen. APP_SECRET NICHT, das ist Ihres
   openssl rand -hex 32                  # neues APP_SECRET nur für Joana, notieren
   ```
   Gibt es die Datei nicht: `TURN_SECRET` steht in Coolify bei Ihrem Burocalendar unter Environment Variables.
2. Coolify → **Projects** → Projekt der Website öffnen (oder **+ Add** `Joana Kort`) → Environment **production** →
   **+ New** → **Private Repository (with GitHub App)** → Ihre GitHub-App → **Burocalendar** → **Load Repository**.
3. Felder:
   - **Branch:** `main`
   - **Build Pack:** `Dockerfile`
   - **Ports Exposes:** `3000`
   - **Domains:** `https://termine.stressberatung-kort.de`
   - **Continue**
4. **Environment Variables → Developer view** → einfügen (Werte ersetzen) → **Save**:
   ```
   PUBLIC_URL=https://termine.stressberatung-kort.de
   DATA_DIR=/data
   APP_SECRET=<neuer Wert aus 1., nie wieder ändern>
   TURN_URLS=turn:1.2.3.4:3478?transport=udp,turn:1.2.3.4:3478?transport=tcp
   TURN_SECRET=<derselbe Wert wie bei Ihrem Burocalendar>
   ```
5. **Persistent Storage → + Add → Volume Mount:** Name `burocalendar-joana-data`, Destination Path **`/data`**.
   (Volume, nicht Bind Mount. **Ohne das sind nach jedem Deploy alle Termine weg.**)
6. **General → Advanced:** **Auto Deploy: aus**, **Include Source Commit in Build: an** → Save.
7. Oben **Deploy** (2 bis 4 Minuten, Log unter *Deployments*).
8. Prüfen: `https://termine.stressberatung-kort.de/api/health` zeigt `"ok":true` und eine `"version"`.

## Schritt 4: Ersteinrichtung mit Joana (ca. 30 Min.)

`https://termine.stressberatung-kort.de` öffnen (am besten Joana selbst, mit Ihnen daneben):

1. **Konto anlegen:** Name `Joana Kort`, E-Mail `info@stressberatung-kort.de`, Benutzername **`joana`** (wichtig, ergibt
   den Link `/joana`), Firmenname `Joana Kort Stressberatung`, eigenes sicheres Passwort. Das ist ihr Inhaber-Konto.
2. **E-Mail-Versand:** Anleitung 1, Schritt 4.
3. **Einstellungen → Firma & Design:**
   - Logo hochladen, Markenfarbe `#8F6A44`
   - Impressum: `https://www.stressberatung-kort.de/impressum/`
   - Datenschutz: `https://www.stressberatung-kort.de/datenschutz/`
   - Fußzeile: Joana Kort Stressberatung, Anschrift
   - "Hinweis Terminbuchung mit Burocalendar ausblenden" an
4. **Einstellungen → Profil:** Foto, kurzer Begrüßungstext (Sie-Form), Handynummer.
5. **Verfügbarkeit:** Arbeitszeiten, Bundesland **Nordrhein-Westfalen**, Urlaub eintragen.
6. **Terminarten** (die zwei Beispiele umbauen):
   - **Kostenloses Erstgespräch:** Kurzlink **`erstgespraech`** (genau so, die Website verlinkt darauf), Dauer **15 Min.**,
     Orte: "Telefon, ich rufe an" und "Videocall", Mindestvorlauf 12 Std., Puffer 5 Min.
   - **Begleitung:** 60 bzw. 90 Min., Videocall oder vor Ort (Adresse), "versteckt" (nur per Link, den Joana schickt).
   - Bei beiden unter "Absagen & Verschieben durch den Gast": erlaubt bis 24 Std. vorher.
7. **Integrationen → Eigene Videocalls:** **Aufnahme erlauben: aus** (so steht es in der Datenschutzerklärung).
8. **Einstellungen → Datenschutz & Spam:** Löschfrist 365 Tage, Zustimmungs-Häkchen an.
9. **Automationen:**
   - **"Danke & Feedback nach dem Termin"** einschalten, unter Bedingungen zusätzlich **"Von mir eingetragene Termine"**
     anhaken, Text in Joanas Ton anpassen.
   - Optional: neue Automation, Auslöser **"X danach"** = 14 Tage, Betreff z. B. "Wie geht es Ihnen mit den Übungen?".
   - **"Erinnerung 1 Std. vorher (WhatsApp)"** ausschalten, wenn Joana nicht jede Nachricht per Klick senden möchte.
   - Jede Mail mit **Vorschau** und **Test-Versand** prüfen.
10. **Test:** Übersicht → **Sofort-Meeting** → Link auf dem Handy öffnen → Bild, Ton, Bildschirm teilen.

## Schritt 5: Google Kalender synchronisieren (ca. 20 Min.)

Geht in **beide Richtungen**, eingebaut in Burocalendar:
- **Google → Buchungsseite:** Was in Joanas Google Kalender steht, ist auf der Buchungsseite nicht buchbar (live abgefragt,
  höchstens 1 Minute alt). Die Termine erscheinen außerdem alle 10 Minuten in ihrer Kalender-Ansicht.
- **Buchung → Google:** Jede Buchung steht sofort in Google. Verschieben und Absagen ändern bzw. löschen den Eintrag dort mit.

Einmalig:
1. https://console.cloud.google.com (Ihr Google-Konto, ein Projekt reicht für alle Kunden) → Projekt "Terminkalender" →
   **Google Calendar API** aktivieren.
2. **OAuth-Zustimmungsbildschirm:** Extern, App-Name "Terminkalender" → Status **In Produktion** (bei "Test" endet die
   Verbindung nach 7 Tagen).
3. **Anmeldedaten → OAuth-Client-ID → Webanwendung**, Weiterleitungs-URI
   `https://termine.stressberatung-kort.de/api/oauth/google/callback` → Client-ID und Clientschlüssel kopieren.
4. Joanas Burocalendar → **Integrationen → Kalender verbinden → Google Kalender** → beide Werte → Speichern →
   **Mit Google verbinden** → mit **Joanas** Google-Konto anmelden → "App nicht überprüft": Erweitert → Weiter → Zulassen.
5. Bei Joanas Hauptkalender **Konflikte prüfen** und **Termine eintragen** anhaken.
6. Test: Termin in Google anlegen → auf der Buchungsseite gesperrt. Termin buchen → erscheint in Google.

Kalender aufs Handy: Hat Joana Google Kalender auf dem Handy, ist nach Schritt 5 alles schon da. Ohne Google:
Einstellungen → Profil → **Kalender-Abo-Link** im Handy-Kalender abonnieren.

## Schritt 6: Website mit dem Kalender verbinden (ca. 10 Min.)

1. Joanas Burocalendar → **Einstellungen → API & Webhooks** → neuer API-Schlüssel, Name `Website` → kopieren
   (beginnt mit `bc_`, wird nur einmal angezeigt).
2. Coolify → Projekt der **Website** → Environment Variables:

   | Name | Wert |
   |---|---|
   | `NEXT_PUBLIC_BOOKING_URL` | `https://termine.stressberatung-kort.de/joana/erstgespraech` |
   | `BUROCALENDAR_API_KEY` | der Schlüssel aus 1. |

   (`BUROCALENDAR_URL` ist nicht nötig, die Website nimmt die Adresse aus dem Buchungslink.)
3. **Redeploy** der Website.
4. Prüfen:
   - Fragebogen absenden → am Ende erscheint **"Gleich einen Termin wählen"** → öffnet Joanas Buchungsseite.
   - Joanas Burocalendar → **Kontakte** → die Anfrage steht dort mit Schlagwort "Website".
   - `/datenschutz/` enthält "Online-Terminbuchung und Terminverwaltung".

## Schritt 7: Datenschutz vor dem Go-live

- AV-Vertrag mit Hostinger (VPS) ablegen (Mail-Anbieter: Anleitung 1).
- PRÜFEN-Kommentare in `components/legal/DatenschutzContent.tsx` (Hoster, STUN) abhaken.
- Optional: Integrationen → Eigene Videocalls → die öffentlichen STUN-Server (Google, Cloudflare) durch
  `stun:1.2.3.4:3478` ersetzen, dann läuft der Verbindungsaufbau nur über den eigenen Server.

## Schritt 8: Updates automatisch an alle Kalender (einmalig, ca. 15 Min.)

Damit jede Änderung an Burocalendar nach grünen Tests bei Ihnen **und** bei Joana ankommt, Ihre zuerst:

1. Coolify → **Keys & Tokens → API Tokens** → Name `github-rollout`, Berechtigung **deploy** (nicht angeboten: **write**)
   → **Create** → Token kopieren. (API aus? Settings → Advanced → **API Access** an.)
2. **Ihr** Burocalendar in Coolify → General → Advanced: **Auto Deploy aus**, **Include Source Commit in Build an** → Save.
   (Joanas: schon in Schritt 3.)
3. Bei **beiden** Burocalendar-Anwendungen Reiter **Webhooks** → **Deploy Webhook** kopieren.
4. GitHub → Repo **Burocalendar** → **Settings → Secrets and variables → Actions → New repository secret**:
   - Name `COOLIFY_TOKEN`, Wert = Token aus 1.
   - Name `BUROCALENDAR_INSTANCES`, Wert (Ihre Instanz zuerst, Leerzeichen zwischen den drei Teilen):
     ```
     willi https://termine.1-2-3-4.sslip.io https://coolify.1-2-3-4.sslip.io/api/v1/deploy?uuid=XXXX&force=false
     joana https://termine.stressberatung-kort.de https://coolify.1-2-3-4.sslip.io/api/v1/deploy?uuid=YYYY&force=false
     ```
     (Adresse Ihres Kalenders und die beiden Webhooks aus 3. einsetzen.)
5. Test: GitHub → **Actions** → letzter Lauf "CI" auf `main` → **Re-run all jobs** → im Job **"Rollout auf alle
   Instanzen"** steht am Ende eine Tabelle mit ✅ bei beiden.

Ab dann: Änderung an Burocalendar → Push auf `main` → Tests → Ihr Kalender → Joanas Kalender. Schlägt Ihrer fehl, bleibt
Joana auf dem alten Stand. Weitere Kunden: `docs/MEHRERE-KALENDER.md` im Burocalendar-Repo.

## Abschluss-Test

1. Website → Fragebogen mit Ihrer E-Mail → Mail bei info@, Bestätigung bei Ihnen, Kontakt in Joanas Kalender.
2. "Gleich einen Termin wählen" → buchen → Bestätigung mit Kalendereinladung von info@, Videolink beginnt mit
   `https://termine.stressberatung-kort.de/meet/`.
3. Joanas Burocalendar → **Nachrichten** → geplant: Erinnerung 24 Std. vorher, Nachfass-Mail.
4. Termin über den Link in der Mail absagen → Absage-Mail kommt, Erinnerung verschwindet.
5. GitHub → Actions → Rollout: ✅ bei beiden Kalendern.

---

## So arbeitet Joana im Alltag

| Sie möchte … | So geht es |
|---|---|
| einen Termin mit einer Klientin eintragen | **Kalender** → Zeitraum ziehen → "Termin mit Kontakt" → Name + E-Mail. Bestätigung, Erinnerung und Nachfass-Mail laufen automatisch. |
| auf eine Website-Anfrage reagieren | **Kontakte** → Schlagwort "Website" → Kontakt öffnen (Antworten in der Notiz) → anrufen oder Termin eintragen |
| der Person die Wahl lassen | **Terminarten** → **Teilen** → persönlicher **Einmal-Link** oder **"Zeiten vorschlagen"** |
| sofort ein Videogespräch | **Übersicht** → **Sofort-Meeting** → Link schicken. Im Browser, ohne Installation, ohne Zoom. |
| einen Termin verschieben | im Kalender ziehen. Die Person wird informiert, Erinnerungen werden neu geplant. |
| Zeit für sich blocken | Kalender → Zeitraum ziehen → "Zeit blocken" |
| sehen, was rausging | **Nachrichten** (gesendet, Fehler, geplant, erneut senden) |

## Und RecordIt?

Zwei getrennte Programme, die zusammenarbeiten. **Joana bekommt RecordIt nicht automatisch mit.**

| | Burocalendar | RecordIt (mit SpeakIt) |
|---|---|---|
| Was | Terminbuchung, Kalender, Automationen, Videocalls | Aufnahme, Schnitt, Transkription, Gesprächsnotizen, Diktieren |
| Läuft auf | Server, Kunden brauchen nur den Browser | Windows-PC und Android (kein Mac) |
| Allein nutzbar | ja | ja; nur "Kalender" und "Calls" brauchen einen Burocalendar |

Empfehlung: getrennt lassen. Für Joana ist SpeakIt (Diktieren) unproblematisch, wenn sie einen Windows-PC hat.
**Aufnahmen mit KI-Notiz bei Klientengesprächen nicht empfehlen:** Ton und Text gehen an Groq bzw. Anthropic (USA), in der
Stressberatung fallen schnell Gesundheitsangaben an, und die Datenschutzerklärung sagt "Gespräche werden nicht
aufgezeichnet". Verbinden ginge über RecordIt → Calls → Einrichtung → `https://termine.stressberatung-kort.de` + Joanas
Login.
