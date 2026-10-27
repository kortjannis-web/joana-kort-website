# Terminkalender und E-Mail für Joana: Einrichtung Schritt für Schritt

Stand 27.10.2026. Betrifft die Website (`joana-kort-website`) und unseren eigenen Terminkalender **Burocalendar**
(`kortjannis-web/Burocalendar`, selbst gebautes Calendly).

## Kurzfassung

- **Ja, das geht.** Joana bekommt einen eigenen Terminkalender unter `https://termine.joana-stressberatung.de` und meldet sich
  dort mit eigenem Login an. Alle Mails (Bestätigung, Erinnerung, Nachfass-Mail, Verschoben, Abgesagt) gehen **von
  kontakt@joana-stressberatung.de** raus. Antworten der Klienten landen in ihrem Postfach.
- Joana kann **selbst Termine eintragen** (Kalender → Zeitraum ziehen → "Termin mit Kontakt"), **Sofort-Meetings starten**
  (eigener Videoraum im Browser, ohne Zoom) und **Buchungslinks verschicken**. Erinnerung und Nachfass-Mail laufen dabei
  automatisch.
- **Empfehlung: eine eigene Instanz für Joana, kein Unterkonto in einer bestehenden.** Begründung unten.
- Auf der Website ist alles vorbereitet. Sobald drei Werte in Coolify stehen, erscheint "Gleich einen Termin wählen", und
  jede Anfrage aus den Formularen landet zusätzlich als Kontakt in Joanas Kalender.

## Warum keine Unterkonten

Burocalendar kann mehrere Personen (Einstellungen → Team, Rolle "Mitglied"). Jede Person hat dort eigene Buchungslinks,
Terminarten, Arbeitszeiten und einen eigenen Google Kalender. **Pro Installation gemeinsam** sind aber:

| Gemeinsam pro Installation | Folge bei einem Unterkonto |
|---|---|
| E-Mail-Absender (Integrationen → E-Mail) | Joanas Klienten bekämen Mails von der Adresse der anderen Firma |
| Firmenname, Logo, Farbe, Impressum- und Datenschutz-Link | Buchungsseite und Mails tragen die falsche Marke und die falschen Rechtstexte |
| Kontakte (Mini-CRM) | Mitglieder sehen **alle** Kontakte der Installation, also auch Joanas Klienten und umgekehrt |
| Automationen, WhatsApp, Nachrichtenprotokoll | Texte und Absender lassen sich nicht pro Person trennen |

Joana ist datenschutzrechtlich eigene Verantwortliche, und in der Stressberatung sind schon Namen und Termine vertraulich.
Deshalb bekommt sie eine **eigene Installation**: eigener Container, eigene Datenbank, eigene Subdomain, eigener Absender.
Das kostet nichts extra, weil sie auf demselben VPS über Coolify läuft wie die Website. Burocalendar ist ein Container mit
einer SQLite-Datei und braucht wenig Speicher.

## Was ich geprüft habe

**Website** (lokal gebaut, Formulare gegen einen Test-Mailserver):

- Fragebogen im Browser von Schritt 1 bis "Anfrage erhalten", ohne Fehler in der Konsole: ok
- Erstgespräch (E-Mail und Telefon), Rückruf, Kontaktformular, Warteliste: Anfrage wird gespeichert, Mail an
  kontakt@joana-stressberatung.de, Bestätigung an den Absender, Antwortadresse stimmt: ok
- Spam-Falle (Honeypot) und Begrenzung auf 5 Anfragen pro Stunde und IP: ok
- **Live fehlt nur der Mailversand:** In Coolify ist kein `SMTP_HOST` gesetzt. Bis dahin gehen keine Mails raus, die Anfragen
  liegen nur in `/app/data/anfragen.jsonl` auf dem Server (Schritt 2).
- Online-Terminbuchung: noch nicht eingebunden (`NEXT_PUBLIC_BOOKING_URL` leer). Kein Calendly und kein fremdes Skript.

**Burocalendar** (47 eigene Tests bestanden, dazu lokal mit Joanas Absender durchgespielt):

- Online-Buchung "Kostenloses Erstgespräch" → Bestätigung an den Gast und Info an Joana, beide von
  `Joana Kort Stressberatung <kontakt@joana-stressberatung.de>`: ok
- Termin selbst eingetragen (Klientin, Videocall) → Bestätigung mit Kalendereinladung an die Klientin, Erinnerung 24 Std.
  vorher eingeplant: ok
- Nachfass-Mail "Danke & Feedback nach dem Termin" eingeschaltet → 1 Std. nach Terminende eingeplant: ok
- Sofort-Meeting → eigener Videoraum-Link: ok
- Website-Anfrage → Kontakt in Burocalendar (Name, E-Mail, Telefon, Schlagwörter "Website" + Art, Antworten als Notiz): ok

## Schritt für Schritt

Reihenfolge einhalten. Die Schritte 1 und 2 sind auch ohne Terminkalender Pflicht.

### 1. Postfach kontakt@joana-stressberatung.de

1. Beim Anbieter der Domain `joana-stressberatung.de` (z. B. IONOS, Strato, Hostinger) das Postfach
   `kontakt@joana-stressberatung.de` anlegen und Joana die Zugangsdaten geben (Handy und Laptop einrichten).
2. **SMTP-Daten** notieren (stehen in der Hilfe des Anbieters):
   - IONOS: `smtp.ionos.de`, Port `587`
   - Strato: `smtp.strato.de`, Port `587`
   - Hostinger: `smtp.hostinger.com`, Port `587`
   - Benutzer = die volle Adresse, Passwort = Postfach-Passwort
3. Im DNS der Domain **SPF, DKIM und DMARC** setzen (die Werte zeigt der Mail-Anbieter an, oft per Knopf "automatisch
   einrichten"). Ohne diese Einträge landen Bestätigungen und Erinnerungen im Spam.
4. Prüfen: von Joanas Postfach eine Mail an eine Gmail-Adresse schicken. Sie muss im Posteingang ankommen, nicht im Spam.

### 2. Mailversand der Website (Coolify)

Coolify → Projekt der Website → Environment Variables → für jeden Eintrag **Add**, Haken bei Buildtime und Runtime:

| Name | Wert |
|---|---|
| `SMTP_HOST` | z. B. `smtp.ionos.de` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `kontakt@joana-stressberatung.de` |
| `SMTP_PASS` | Postfach-Passwort |
| `SMTP_FROM` | `kontakt@joana-stressberatung.de` |

`RECIPIENT` und `SMTP_REPLY_TO` **nicht** setzen (Standard ist die Adresse aus der Website). Dann **Redeploy**.
Prüfen: auf der Website den Fragebogen mit der eigenen E-Mail-Adresse absenden. Es müssen zwei Mails ankommen: "Neue Anfrage" bei
Joana und "Ihre Anfrage für ein kostenloses Erstgespräch" bei Ihnen.

### 3. Subdomain für den Terminkalender

Im DNS von `joana-stressberatung.de` einen **A-Record** anlegen: Name `termine`, Ziel = **IP-Adresse des VPS** (dieselbe wie
für die Website, steht in Coolify unter Servers). Nach 5 bis 30 Minuten zeigt `termine.joana-stressberatung.de` auf den Server.

### 4. Burocalendar in Coolify anlegen

1. Coolify → Projekt (z. B. "Joana Kort") → **+ New** → **Private Repository (with GitHub App)**.
   Falls `Burocalendar` dort nicht auftaucht: in GitHub → Settings → Applications → Coolify-App → Repository access →
   `Burocalendar` hinzufügen.
2. Repository `kortjannis-web/Burocalendar`, Branch `main`, **Build Pack: Dockerfile**.
3. **Domains:** `https://termine.joana-stressberatung.de` · **Ports Exposes:** `3000`
4. **Persistent Storage** → Add → Volume, Destination Path **`/data`** (Datenbank, Sicherungen, Schlüssel. **Ohne das gehen bei
   jedem Deploy alle Termine verloren.**)
5. **Environment Variables:**

   | Name | Wert |
   |---|---|
   | `PUBLIC_URL` | `https://termine.joana-stressberatung.de` |
   | `APP_SECRET` | langer Zufallswert, z. B. Ausgabe von `openssl rand -hex 32` (einmal erzeugen, nie wieder ändern, sonst sind gespeicherte Passwörter von SMTP, Google usw. unlesbar) |

6. **Deploy.** Der Container hat einen eigenen Healthcheck. Sobald er grün ist, `https://termine.joana-stressberatung.de` öffnen.

> Alternative ohne GitHub-App: Coolify → + New → Docker Image `ghcr.io/kortjannis-web/burocalendar:latest`. Das geht nur, wenn
> das Paket in GitHub auf "Public" steht (Burocalendar `docs/SETUP.md`, Punkt 1.3). Rest wie oben.

### 5. Ersteinrichtung in Burocalendar (mit Joana zusammen, ca. 30 Minuten)

1. **Konto anlegen** (erste Seite): Name `Joana Kort`, E-Mail `kontakt@joana-stressberatung.de`, Benutzername **`joana`**
   (ergibt den Link `/joana`), Firmenname `Joana Kort Stressberatung`, sicheres Passwort. Das ist sofort das Inhaber-Konto.
2. **Einstellungen → Firma & Design:** Logo, Markenfarbe `#8F6A44` (Karamell der Website), Impressum-Link
   `https://www.joana-stressberatung.de/impressum/`, Datenschutz-Link `.../datenschutz/` (echte Domain der Website einsetzen),
   Fußzeile mit Anschrift.
3. **Einstellungen → Profil:** Handynummer, kurzer Begrüßungstext, Foto.
4. **Verfügbarkeit:** Arbeitszeiten, Bundesland **Nordrhein-Westfalen** (Feiertage automatisch), Urlaub.
5. **Terminarten** (die zwei Beispiele anpassen):
   - **Kostenloses Erstgespräch**: Kurzlink `erstgespraech`, Dauer **15 Min.**, Ort zur Wahl: "Telefon (ich rufe an)" und
     "Videocall", Mindestvorlauf z. B. 12 Std., Puffer 5 Min.
   - **Begleitung** (für Klienten, kann versteckt sein): 60 Min. bzw. 90 Min., Ort "Videocall" oder "vor Ort" (Adresse).
6. **Integrationen → E-Mail:** Anbieter **SMTP**, dieselben Daten wie in Schritt 2 (Server, Port 587 STARTTLS, Benutzer,
   Passwort), Absendername `Joana Kort Stressberatung`, Absender `kontakt@joana-stressberatung.de`, Antwortadresse leer
   lassen. **Speichern → "Test-E-Mail an mich"**.
7. **Integrationen → Eigene Videocalls:** "Aufnahme erlauben" **aus** (so steht es auch in der Datenschutzerklärung).
8. **Einstellungen → Datenschutz & Spam:** Löschfrist z. B. 365 Tage, Zustimmungs-Häkchen an.

### 6. Erinnerungen und Nachfass-Mails (Automationen)

Ab Werk aktiv: Bestätigung, Info an Joana, **Erinnerung 24 Std. vorher (E-Mail)**, Verschoben, Abgesagt, Nicht erschienen →
neuer Termin. Einstellen:

1. **"Danke & Feedback nach dem Termin"** einschalten (Nachfass-Mail 1 Std. nach dem Termin). Unter Bedingungen zusätzlich
   "Von mir eingetragene Termine" anhaken, damit sie auch bei selbst eingetragenen Terminen kommt. Text in Joanas Ton anpassen
   (Sie-Ansprache, warm, keine Heilversprechen).
2. Bei Bedarf weitere Nachfass-Mails mit dem Auslöser **"X danach"** anlegen, z. B. 14 Tage nach dem letzten Termin "Wie geht es
   Ihnen mit den Übungen?". Bei jeder Mail "Vorschau" und "Test-Versand" nutzen.
3. **"Erinnerung 1 Std. vorher (WhatsApp)"**: Ohne WhatsApp-API liegt die Nachricht im Nachrichtenprotokoll fertig bereit und
   geht mit einem Klick über Joanas eigenes WhatsApp raus. Wenn ihr das zu viel ist: ausschalten.

### 7. Kalender auf dem Handy und Google Kalender (optional)

- **Termine aufs Handy:** Einstellungen → Profil → Kalender-Abo-Link kopieren und in Joanas Handy-Kalender als Abo
  hinzufügen (iPhone: Einstellungen → Kalender → Accounts → Kalenderabo).
- **Doppelbuchungen vermeiden:** Hat Joana private Termine in Google Kalender, unter Integrationen → Kalender verbinden den geheimen
  iCal-Link ihres Google Kalenders eintragen (Google Kalender → Einstellungen → ihr Kalender → "Privatadresse im iCal-Format").
  Dann werden diese Zeiten auf der Buchungsseite automatisch blockiert. Das volle Google-Login (mit Google-Meet-Links) braucht
  ein Projekt in der Google Cloud Console (Burocalendar `docs/SETUP.md` Punkt 7) und ist für Joana nicht nötig.

### 8. Website mit dem Terminkalender verbinden

1. Burocalendar → **Einstellungen → API & Webhooks** → API-Schlüssel erzeugen (Name "Website"), Schlüssel kopieren
   (beginnt mit `bc_`, wird nur einmal angezeigt).
2. Coolify → Projekt der Website → Environment Variables:

   | Name | Wert |
   |---|---|
   | `NEXT_PUBLIC_BOOKING_URL` | `https://termine.joana-stressberatung.de/joana/erstgespraech` |
   | `BUROCALENDAR_URL` | `https://termine.joana-stressberatung.de` |
   | `BUROCALENDAR_API_KEY` | der Schlüssel aus Schritt 1 |

3. **Redeploy** (NEXT_PUBLIC-Werte werden beim Build eingebacken).
4. Danach automatisch aktiv:
   - nach dem Fragebogen der Knopf **"Gleich einen Termin wählen"** (öffnet Joanas Buchungsseite),
   - im Handy-Menü führt der Termin-Knopf direkt zur Buchungsseite,
   - in der Datenschutzerklärung erscheint der Abschnitt **"Online-Terminbuchung und Terminverwaltung"**,
   - jede Anfrage (Erstgespräch, Rückruf, Kontakt, Warteliste) wird zusätzlich als **Kontakt** in Burocalendar angelegt, mit
     Schlagwörtern ("Website", "Erstgespräch", "Rückruf", "Warteliste Online-Kurs" …) und allen Antworten als Notiz.
     Die Mail an Joana kommt weiterhin. Fällt der Kalender einmal aus, geht die Anfrage trotzdem durch.

Bewusst **nicht** eingebaut: das Einbettungs-Skript von Burocalendar (`embed.js`). Die Website bleibt ohne fremde Skripte, die
Buchungsseite öffnet sich als eigener Link.

### 9. Datenschutz vor dem Go-live

- Abschnitt 3 der Datenschutzerklärung (Hoster) gilt auch für den Terminkalender, weil beides auf demselben VPS läuft.
- AV-Verträge ablegen: Hoster des VPS, E-Mail-Anbieter.
- Videocalls: Für den Verbindungsaufbau nutzt Burocalendar ab Werk öffentliche STUN-Server von Google und Cloudflare (dabei
  wird die IP-Adresse übermittelt). Sauberer: eigenen TURN-Server betreiben (coturn, Burocalendar `deploy/docker-compose.yml`)
  und unter Integrationen → Eigene Videocalls eintragen. Bis dahin ist der Satz zu STUN in der Datenschutzerklärung zutreffend.
- PRÜFEN-Kommentar in `components/legal/DatenschutzContent.tsx` abarbeiten.

## So arbeitet Joana im Alltag

| Sie möchte … | So geht es in Burocalendar |
|---|---|
| einen Termin mit einer Klientin eintragen | **Kalender** → Zeitraum ziehen → "Termin mit Kontakt" → Name + E-Mail (und/oder Telefon). Bestätigung mit Kalendereinladung, Erinnerung und Nachfass-Mail laufen automatisch. |
| auf eine Website-Anfrage reagieren | **Kontakte** → Schlagwort "Website" → Kontakt öffnen (Antworten stehen in der Notiz) → anrufen oder Termin eintragen |
| der Person selbst die Wahl lassen | **Terminarten** → "Teilen" → **persönlicher Einmal-Link** (Name/E-Mail vorausgefüllt) per Mail oder WhatsApp schicken, oder **"Zeiten vorschlagen"** (fertiger Text mit den nächsten freien Terminen) |
| sofort ein Videogespräch starten | **Übersicht** → **Sofort-Meeting** → Link an die Person schicken. Läuft im Browser, ohne Installation und ohne Zoom. |
| einen Termin verschieben | im Kalender per Drag & Drop. Die Person wird automatisch informiert, Erinnerungen werden neu geplant. |
| Zeit für sich blocken | Kalender → Zeitraum ziehen → "Zeit blocken" |
| sehen, was rausgegangen ist | **Nachrichten** (gesendet, Fehler, geplant, erneut senden) |

Klienten können ihren Termin über den Link in der Bestätigung selbst verschieben oder absagen (Frist in der Terminart unter
"Absagen & Verschieben durch den Gast", z. B. bis 24 Std. vorher).

## Abschluss-Test (nach Schritt 8)

1. Website → Fragebogen mit eigener E-Mail absenden → Mail bei Joana, Bestätigung bei Ihnen, Kontakt in Burocalendar.
2. "Gleich einen Termin wählen" → Termin buchen → Bestätigung mit Kalendereinladung von kontakt@joana-stressberatung.de.
3. In Burocalendar unter Nachrichten → "geplant": Erinnerung 24 Std. vorher und Nachfass-Mail stehen drin.
4. Termin über den Link in der Mail absagen → Absage-Mail kommt, die Erinnerung verschwindet.
5. Sofort-Meeting mit Handy und Laptop testen (Bild, Ton, Bildschirm teilen).
