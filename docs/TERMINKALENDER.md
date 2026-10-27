# Terminkalender und E-Mail für Joana: Einrichtung Schritt für Schritt

Stand 27.10.2026. Betrifft die Website (`joana-kort-website`), unseren eigenen Terminkalender **Burocalendar**
(`kortjannis-web/Burocalendar`, selbst gebautes Calendly) und optional **RecordIt** (`kortjannis-web/RecordIt`).

## Kurzfassung

- Joana bekommt einen **eigenen Burocalendar** unter `https://termine.joana-stressberatung.de`, mit eigenem Login. Alle Mails
  (Bestätigung, Erinnerung, Nachfass-Mail, Verschoben, Abgesagt) gehen **von kontakt@joana-stressberatung.de** raus, alle
  Links (Buchung, Videoraum, Absagen) zeigen auf **ihre Domain**, überall steht **Joana Kort Stressberatung**.
- Joana kann **selbst Termine eintragen**, **Sofort-Meetings starten** und **Buchungslinks verschicken**. Erinnerung und
  Nachfass-Mail laufen automatisch.
- **Burocalendar wird nicht in das Website-Repo eingebaut.** Die Website ist statisch (Next.js), Burocalendar ist ein eigener
  Server mit Datenbank, Videocalls und Hintergrund-Jobs. Beides läuft als **eigene Anwendung in Coolify** auf demselben VPS.
  Die Website verlinkt nur auf die Buchungsseite und schickt Anfragen per API als Kontakt hinüber.
- **Updates kommen automatisch:** Joanas Kalender läuft aus demselben Repo wie Ihrer. Jede Änderung auf `main` wird nach
  grünen Tests nacheinander auf alle Kalender gespielt, Ihrer zuerst. Geht dabei etwas schief, bleibt Joana auf dem alten
  Stand (`docs/MEHRERE-KALENDER.md` im Burocalendar-Repo).

## Warum keine Unterkonten

Burocalendar kann mehrere Personen (Einstellungen → Team). **Pro Installation gibt es aber nur einmal:**

| Pro Installation nur einmal | Folge bei einem Unterkonto bei Ihnen |
|---|---|
| E-Mail-Absender | Joanas Klienten bekämen Mails von TOPsichtbar |
| Adresse (`PUBLIC_URL`) in allen Links, auch im Videoraum | Links zeigen auf Ihre Domain |
| Firmenname, Logo, Impressum, Datenschutz | Buchungsseite und Mails tragen Ihre Marke und Ihre Rechtstexte |
| Kontakte | Jedes Konto sieht **alle** Kontakte, also Sie Joanas Klienten und umgekehrt |

Joana ist datenschutzrechtlich eigene Verantwortliche, und in der Stressberatung sind schon Namen und Termine vertraulich.
Eine eigene Instanz kostet nichts extra (gleicher VPS, ein kleiner Container mit einer SQLite-Datei).

## Was ich geprüft habe

**Website** (lokal gebaut, Formulare gegen einen Test-Mailserver):
- Fragebogen im Browser von Schritt 1 bis "Anfrage erhalten", keine Fehler in der Konsole
- Erstgespräch (E-Mail und Telefon), Rückruf, Kontaktformular, Warteliste: gespeichert, Mail an kontakt@joana-stressberatung.de,
  Bestätigung an den Absender, Antwortadresse stimmt
- Spam-Falle und Begrenzung auf 5 Anfragen pro Stunde und IP
- **Live fehlt der Mailversand:** In Coolify ist kein `SMTP_HOST` gesetzt. Bis dahin gehen keine Mails raus, Anfragen liegen
  nur in `/app/data/anfragen.jsonl` auf dem Server (Schritt 2).

**Burocalendar** (alle Tests grün, dazu lokal mit Joanas Absender durchgespielt):
- Online-Buchung → Bestätigung an den Gast und Info an Joana, beide von `Joana Kort Stressberatung <kontakt@joana-stressberatung.de>`
- Termin selbst eingetragen → Bestätigung mit Kalendereinladung, Erinnerung 24 Std. vorher eingeplant
- Nachfass-Mail eingeschaltet → 1 Std. nach Terminende eingeplant
- Sofort-Meeting → eigener Videoraum-Link
- Website-Anfrage → Kontakt in Burocalendar (Name, E-Mail, Telefon, Schlagwörter, Antworten als Notiz)
- Rollout-Skript für mehrere Kalender: Reihenfolge, Abbruch bei Fehler, falscher Token, fehlende Versionsangabe

---

## Schritt für Schritt

Platzhalter: **`1.2.3.4`** = IP des VPS (hPanel → VPS → Übersicht), **`1-2-3-4`** = dieselbe IP mit Bindestrichen.
Die Schritte 1 und 2 sind auch ohne Terminkalender Pflicht.

### 1. Postfach kontakt@joana-stressberatung.de (ca. 15 Min.)

1. Beim Anbieter der Domain `joana-stressberatung.de` das Postfach `kontakt@joana-stressberatung.de` anlegen
   (bei Hostinger: hPanel → **E-Mails** → Domain wählen → **E-Mail-Konto erstellen**).
2. SMTP-Daten notieren:

   | Anbieter | Server | Port | Verschlüsselung |
   |---|---|---|---|
   | Hostinger | `smtp.hostinger.com` | `465` | SSL |
   | IONOS | `smtp.ionos.de` | `587` | STARTTLS |
   | Strato | `smtp.strato.de` | `587` | STARTTLS |

   Benutzer = die volle Adresse, Passwort = Postfach-Passwort.
3. **SPF, DKIM, DMARC** im DNS der Domain setzen (Hostinger: E-Mails → Domain → **DNS-Einträge verbinden/automatisch**).
   Ohne diese Einträge landen Bestätigungen und Erinnerungen im Spam.
4. Prüfen: von Joanas Postfach eine Mail an eine Gmail-Adresse schicken. Sie muss im Posteingang ankommen.
5. Joana das Postfach auf Handy und Laptop einrichten.

### 2. Mailversand der Website (Coolify, ca. 5 Min.)

Coolify → Projekt der Website → **Environment Variables** → je Zeile **Add** (Buildtime und Runtime angehakt):

| Name | Wert |
|---|---|
| `SMTP_HOST` | z. B. `smtp.hostinger.com` |
| `SMTP_PORT` | `465` (Hostinger) bzw. `587` |
| `SMTP_USER` | `kontakt@joana-stressberatung.de` |
| `SMTP_PASS` | Postfach-Passwort |
| `SMTP_FROM` | `kontakt@joana-stressberatung.de` |

`RECIPIENT` und `SMTP_REPLY_TO` **nicht** setzen. Dann **Redeploy**.
Prüfen: auf der Website den Fragebogen mit Ihrer eigenen E-Mail absenden. Es müssen zwei Mails ankommen: "Neue Anfrage" bei
Joana und "Ihre Anfrage für ein kostenloses Erstgespräch" bei Ihnen.

### 3. Subdomain für den Kalender (ca. 5 Min., dann bis 30 Min. warten)

DNS von `joana-stressberatung.de` → **A-Record**: Name `termine`, Ziel `1.2.3.4` (dieselbe IP wie die Website).

### 4. Joanas Burocalendar in Coolify anlegen (ca. 15 Min.)

1. Auf dem Server (hPanel → VPS → **Browser-Terminal**) die gemeinsamen TURN-Werte und ein **neues** Geheimnis holen:
   ```bash
   cat /root/burocalendar-werte.txt     # TURN_SECRET daraus übernehmen (APP_SECRET NICHT, das ist Ihrer)
   openssl rand -hex 32                  # neues APP_SECRET nur für Joana, notieren
   ```
   Gibt es die Datei nicht, steht `TURN_SECRET` in Coolify bei Ihrem Burocalendar unter Environment Variables.
2. Coolify → **Projects → + Add** → Name `Joana Kort` (oder das Projekt der Website) → Environment **production**.
3. **+ New → Private Repository (with GitHub App)** → Ihre GitHub-App → Repository **Burocalendar** → **Load Repository**.
4. Einstellungen:
   - **Branch:** `main` · **Build Pack:** `Dockerfile` · **Ports Exposes:** `3000`
   - **Domains:** `https://termine.joana-stressberatung.de`
   - **Continue**
5. **Environment Variables** → **Developer view** → einfügen und anpassen:
   ```
   PUBLIC_URL=https://termine.joana-stressberatung.de
   DATA_DIR=/data
   APP_SECRET=<neuer Wert aus Schritt 1, nie wieder ändern>
   TURN_URLS=turn:1.2.3.4:3478?transport=udp,turn:1.2.3.4:3478?transport=tcp
   TURN_SECRET=<derselbe Wert wie bei Ihrem Burocalendar>
   ```
6. **Persistent Storage → + Add → Volume Mount**: Name `burocalendar-joana-data`, Destination Path **`/data`**
   (Volume, nicht Bind Mount. **Ohne das sind bei jedem Deploy alle Termine weg.**)
7. **General → Advanced:** **Auto Deploy aus**, **Include Source Commit in Build an** → Speichern.
   (Updates kommen über den Rollout nach grünen Tests, Schritt 10.)
8. **Deploy** (erster Build 2 bis 4 Minuten, Log unter *Deployments*).
9. `https://termine.joana-stressberatung.de/api/health` öffnen: `"ok": true` und eine `"version"`.

### 5. Ersteinrichtung mit Joana (ca. 30 Min.)

`https://termine.joana-stressberatung.de` öffnen:

1. **Konto anlegen:** Name `Joana Kort`, E-Mail `kontakt@joana-stressberatung.de`, Benutzername **`joana`** (ergibt den Link
   `/joana`), Firmenname `Joana Kort Stressberatung`, sicheres Passwort. Das ist ihr Inhaber-Konto, Sie haben dort kein Konto.
2. **Integrationen → E-Mail-Versand:** **SMTP**, dieselben Daten wie in Schritt 1, Absendername `Joana Kort Stressberatung`,
   Absender `kontakt@joana-stressberatung.de`, Antwortadresse leer → Speichern → **Test-E-Mail an mich**.
3. **Einstellungen → Firma & Design:** Logo, Markenfarbe `#8F6A44`, Impressum-Link und Datenschutz-Link der Website
   (`https://<domain der website>/impressum/` und `/datenschutz/`), Fußzeile mit Anschrift. Optional
   "Hinweis Terminbuchung mit Burocalendar ausblenden".
4. **Einstellungen → Profil:** Foto, Begrüßungstext, Handynummer.
5. **Verfügbarkeit:** Arbeitszeiten, Bundesland **Nordrhein-Westfalen**, Urlaub.
6. **Terminarten:**
   - **Kostenloses Erstgespräch:** Kurzlink `erstgespraech`, Dauer **15 Min.**, Ort zur Wahl Telefon (ich rufe an) und
     Videocall, Mindestvorlauf z. B. 12 Std., Puffer 5 Min.
   - **Begleitung:** 60 bzw. 90 Min., Videocall oder vor Ort (Adresse), auf Wunsch versteckt (nur per Link buchbar).
7. **Integrationen → Eigene Videocalls:** **Aufnahme erlauben aus** (so steht es in der Datenschutzerklärung der Website).
8. **Einstellungen → Datenschutz & Spam:** Löschfrist z. B. 365 Tage, Zustimmungs-Häkchen an.
9. Test: **Übersicht → Sofort-Meeting** → Link auf dem Handy öffnen → Bild und Ton prüfen.

### 6. Erinnerungen und Nachfass-Mails (Automationen, ca. 15 Min.)

Ab Werk aktiv: Bestätigung, Info an Joana, **Erinnerung 24 Std. vorher (E-Mail)**, Verschoben, Abgesagt, Nicht erschienen.

1. **"Danke & Feedback nach dem Termin"** einschalten (1 Std. nach dem Termin). Unter Bedingungen zusätzlich
   **"Von mir eingetragene Termine"** anhaken. Text in Joanas Ton (Sie, warm, keine Heilversprechen).
2. Weitere Nachfass-Mails mit Auslöser **"X danach"**, z. B. 14 Tage nach dem Termin "Wie geht es Ihnen mit den Übungen?".
   Jede Mail mit **Vorschau** und **Test-Versand** prüfen.
3. **"Erinnerung 1 Std. vorher (WhatsApp)"**: ohne WhatsApp-API liegt die Nachricht unter *Nachrichten* bereit und geht
   mit einem Klick über Joanas WhatsApp raus. Wenn ihr das zu viel ist: ausschalten.

### 7. Kalender aufs Handy (optional, 5 Min.)

- **Termine im Handy-Kalender:** Einstellungen → Profil → Kalender-Abo-Link kopieren → im Handy als Kalender-Abo
  hinzufügen (iPhone: Einstellungen → Kalender → Accounts → Account hinzufügen → Andere → Kalenderabo).
- **Private Termine blocken:** Integrationen → Kalender verbinden → geheimen iCal-Link aus Google Kalender eintragen
  (Google Kalender → Einstellungen → Kalender → "Privatadresse im iCal-Format").

### 8. Website mit Joanas Kalender verbinden (ca. 10 Min.)

1. Joanas Burocalendar → **Einstellungen → API & Webhooks** → neuer API-Schlüssel "Website" → kopieren (`bc_…`, wird nur
   einmal angezeigt).
2. Coolify → Projekt der **Website** → Environment Variables:

   | Name | Wert |
   |---|---|
   | `NEXT_PUBLIC_BOOKING_URL` | `https://termine.joana-stressberatung.de/joana/erstgespraech` |
   | `BUROCALENDAR_URL` | `https://termine.joana-stressberatung.de` |
   | `BUROCALENDAR_API_KEY` | der Schlüssel aus 1. |

3. **Redeploy** der Website.
4. Danach automatisch aktiv:
   - nach dem Fragebogen **"Gleich einen Termin wählen"** (öffnet Joanas Buchungsseite),
   - im Handy-Menü führt der Termin-Knopf direkt zur Buchungsseite,
   - in der Datenschutzerklärung erscheint **"Online-Terminbuchung und Terminverwaltung"**,
   - jede Anfrage (Erstgespräch, Rückruf, Kontakt, Warteliste) landet zusätzlich als **Kontakt** in Joanas Kalender, mit
     Schlagwörtern und allen Antworten als Notiz. Die Mail an Joana kommt weiterhin, und fällt der Kalender einmal aus,
     geht die Anfrage trotzdem durch.

### 9. Datenschutz vor dem Go-live

- AV-Verträge ablegen: Hoster des VPS (Hostinger), E-Mail-Anbieter.
- PRÜFEN-Kommentare in `components/legal/DatenschutzContent.tsx` abarbeiten (Hoster, STUN).
- Videocalls: Burocalendar nutzt neben dem eigenen TURN-Server ab Werk öffentliche STUN-Server (Google, Cloudflare). Wer das
  vermeiden will, ersetzt sie unter Integrationen → Eigene Videocalls durch den eigenen Server (`stun:1.2.3.4:3478`).

### 10. Einmalig: Updates automatisch an alle Kalender (ca. 15 Min.)

Damit eine Änderung an Burocalendar nach grünen Tests bei Ihnen **und** bei Joana ankommt:

1. **Coolify → Keys & Tokens → API Tokens** → Name `github-rollout`, Berechtigung **deploy** (falls nicht angeboten:
   **write**) → Token kopieren. Ist die API aus: Settings → Advanced → **API Access** an.
2. **Ihr** Burocalendar in Coolify → General → Advanced: **Auto Deploy aus**, **Include Source Commit in Build an**.
   (Bei Joanas Instanz schon in Schritt 4 erledigt.)
3. Bei **beiden** Instanzen Reiter **Webhooks** → **Deploy Webhook** kopieren.
4. GitHub → Repo **Burocalendar** → **Settings → Secrets and variables → Actions → New repository secret**:
   - `COOLIFY_TOKEN` = Token aus 1.
   - `BUROCALENDAR_INSTANCES` = (Ihre Instanz zuerst, je Zeile Name, Adresse, Webhook mit Leerzeichen getrennt)
     ```
     willi https://termine.1-2-3-4.sslip.io https://coolify.1-2-3-4.sslip.io/api/v1/deploy?uuid=XXXX&force=false
     joana https://termine.joana-stressberatung.de https://coolify.1-2-3-4.sslip.io/api/v1/deploy?uuid=YYYY&force=false
     ```
5. Test: GitHub → **Actions** → letzter Lauf auf `main` → **Re-run all jobs**. Im Job **"Rollout auf alle Instanzen"**
   steht am Ende eine Tabelle mit ✅ je Kalender.

Ab dann: Änderung an Burocalendar → Push auf `main` → Tests → Ihr Kalender → Joanas Kalender. Jeder weitere Kunde ist eine
neue Zeile in `BUROCALENDAR_INSTANCES`.

---

## Und RecordIt?

**Kurz: zwei getrennte Programme, die zusammenarbeiten. Joana bekommt RecordIt nicht automatisch mit.**

| | Burocalendar | RecordIt (mit SpeakIt) |
|---|---|---|
| Was | Terminbuchung, Kalender, Automationen, Videocalls | Bildschirmaufnahme, Schnitt, Transkription, Gesprächsnotizen, Diktieren (SpeakIt) |
| Wo es läuft | Server (Coolify), Kunden brauchen nur den Browser | Programm auf **Windows-PC** und **Android** (kein Mac) |
| Repo | `Burocalendar` | `RecordIt` (SpeakIt ist dort schon eingebaut) |
| Funktioniert allein? | Ja, komplett | Ja (Aufnahme, Schnitt, SpeakIt). Nur die Rubriken **Kalender** und **Calls** brauchen einen Burocalendar |

Die Verbindung: In RecordIt meldet man sich unter *Calls → Einrichtung* mit **Adresse + E-Mail + Passwort** eines Burocalendar
an. Danach zeigt RecordIt die Burocalendar-Verwaltung im Modus **"Kalender"**, öffnet Videocalls im Programm, nimmt sie
auf und schickt eine KI-Gesprächsnotiz per Mail, die auch beim Termin und Kontakt landet. Für Sie fühlt sich das wie eine
App an, technisch sind es zwei.

**Meine Empfehlung: getrennt lassen, so wie es ist.** Server und PC-Programm haben verschiedene Laufzeiten, Updates und
Zielgruppen (Joanas Klienten brauchen nie RecordIt, nur den Link). Zusammenlegen in ein Repo brächte keinen Vorteil, nur
größere Builds und mehr Risiko. Das "eine App"-Gefühl entsteht bereits in RecordIt. Ein RecordIt verbindet sich jeweils
mit **einem** Burocalendar: Ihres mit Ihrem, Joanas (falls sie es nutzt) mit ihrem.

**Für Joana:**
- **SpeakIt (Diktieren)** und **Aufnahme/Schnitt** kann sie nutzen, wenn sie einen Windows-PC hat: RecordIt installieren,
  eigenen Groq-Key eintragen, fertig.
- **Calls mit Aufnahme und KI-Notiz bei Klientengesprächen: nicht empfehlen.** Ton und Text gehen dafür an Groq bzw.
  Anthropic (USA), und in der Stressberatung fallen schnell Gesundheitsangaben an (Art. 9 DSGVO). Außerdem sagt die
  Datenschutzerklärung der Website "Gespräche werden nicht aufgezeichnet". Wenn sie es trotzdem möchte, erst mit
  ausdrücklicher schriftlicher Einwilligung der Klienten und angepasster Datenschutzerklärung.
- Verbinden: RecordIt → **Calls → Einrichtung** → Adresse `https://termine.joana-stressberatung.de` + Joanas Login.

---

## So arbeitet Joana im Alltag

| Sie möchte … | So geht es in Burocalendar |
|---|---|
| einen Termin mit einer Klientin eintragen | **Kalender** → Zeitraum ziehen → "Termin mit Kontakt" → Name + E-Mail. Bestätigung, Erinnerung und Nachfass-Mail laufen automatisch. |
| auf eine Website-Anfrage reagieren | **Kontakte** → Schlagwort "Website" → Kontakt öffnen (Antworten in der Notiz) → anrufen oder Termin eintragen |
| der Person die Wahl lassen | **Terminarten** → **Teilen** → persönlicher **Einmal-Link** oder **"Zeiten vorschlagen"** (fertiger Text mit freien Terminen) |
| sofort ein Videogespräch | **Übersicht** → **Sofort-Meeting** → Link schicken. Im Browser, ohne Installation, ohne Zoom. |
| einen Termin verschieben | im Kalender ziehen. Die Person wird informiert, Erinnerungen werden neu geplant. |
| Zeit für sich blocken | Kalender → Zeitraum ziehen → "Zeit blocken" |
| sehen, was rausging | **Nachrichten** (gesendet, Fehler, geplant, erneut senden) |

Klienten können über den Link in der Bestätigung selbst verschieben oder absagen (Terminart → "Absagen & Verschieben durch
den Gast", z. B. bis 24 Std. vorher).

## Abschluss-Test

1. Website → Fragebogen mit eigener E-Mail absenden → Mail bei Joana, Bestätigung bei Ihnen, Kontakt in Joanas Burocalendar.
2. "Gleich einen Termin wählen" → buchen → Bestätigung mit Kalendereinladung von kontakt@joana-stressberatung.de, Videolink
   beginnt mit `https://termine.joana-stressberatung.de/meet/`.
3. Burocalendar → **Nachrichten** → geplant: Erinnerung 24 Std. vorher und Nachfass-Mail.
4. Termin über den Link in der Mail absagen → Absage-Mail kommt, Erinnerung verschwindet.
5. Sofort-Meeting mit Handy und Laptop (Bild, Ton, Bildschirm teilen).
6. GitHub → Actions → Rollout: ✅ bei beiden Kalendern.
