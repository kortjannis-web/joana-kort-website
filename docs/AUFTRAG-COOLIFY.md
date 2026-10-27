# Auftrag für den nächsten Chat (lokal, mit Zugriff auf Coolify)

Stand 27.10.2026. Geschrieben für Claude Code auf Jannis' Rechner. **Diesen Auftrag Schritt für Schritt ausführen**, jeden
Schritt prüfen und am Ende berichten. Der Code ist fertig und auf `main` (Website `kortjannis-web/joana-kort-website`,
Kalender `kortjannis-web/Burocalendar`). Zu tun ist nur noch **Einrichtung**: Coolify, Burocalendar-Oberfläche, Google,
GitHub-Secrets. Hintergrund und Begründungen: `docs/TERMINKALENDER.md` (Kalender, Coolify, Website) und `docs/MAIL.md`
(E-Mail). Diese Datei ist die verbindliche Arbeitsliste.

## Ziel

```
www.stressberatung-kort.de        Website (Coolify, gibt es schon)
termine.stressberatung-kort.de    NEU: Joanas eigener Burocalendar (Coolify, Repo Burocalendar, eigene Datenbank)
info@stressberatung-kort.de       Postfach, gibt es schon. Absender und Empfänger für Website UND Kalender
Google Kalender von Joana          zweiseitig: belegte Zeiten sperren die Buchungsseite, Buchungen erscheinen in Google
```

Nach dem Auftrag:
1. Website verschickt Mails über info@ (Anfrage an Joana, Bestätigung an die Person).
2. Joanas Burocalendar läuft unter `https://termine.stressberatung-kort.de`, Mails von info@, Marke Joana Kort.
3. Google Kalender ist verbunden (beide Richtungen).
4. Website zeigt "Gleich einen Termin wählen" und legt jede Anfrage als Kontakt in Joanas Kalender an.
5. Änderungen am Burocalendar-Repo gehen nach grünen Tests automatisch erst auf Jannis' Kalender, dann auf Joanas.

## Regeln

- **Niemals** `APP_SECRET` einer bestehenden Burocalendar-Instanz ändern, **niemals** ein Volume oder eine bestehende
  Anwendung löschen. Jannis' eigener Burocalendar ("willi") läuft produktiv.
- Passwörter, Tokens und Schlüssel **nie committen** und nicht in Dateien im Repo schreiben. Nur in Coolify, Burocalendar
  oder GitHub-Secrets eintragen.
- Vor jedem Schritt, der etwas Bestehendes verändert (Domain der Website, Auto Deploy bei "willi"), kurz sagen, was passiert.
- Nach jedem Schritt die angegebene **Prüfung** ausführen. Schlägt sie fehl: Ursache suchen, nicht weitermachen.
- Keine Gedankenstriche (– —) in Texten, die Kunden sehen (Mail-Texte, Profil, Terminarten). Sie-Ansprache, Ich-Form von
  Joana, warm, keine Heilversprechen.
- Coolify bedienen: über die Oberfläche (Browser) oder die Coolify-API (Doku: https://coolify.io/docs/api-reference).
  Persistent Storage und Advanced-Schalter notfalls in der Oberfläche.

## Schritt 0: Vom Nutzer erfragen (gesammelt, am Anfang)

1. Zugang zu Coolify (Adresse + Login, oder API-Token mit Schreibrecht).
2. **Passwort von info@stressberatung-kort.de** (für SMTP).
3. Zugang zum DNS von `stressberatung-kort.de` (hPanel), **oder** Jannis legt den A-Record selbst an (Schritt 2).
4. Wer klickt bei Google "Zulassen"? (Joanas Google-Konto, Schritt 7. Joana selbst oder Jannis mit ihren Zugangsdaten.)
5. Welches Startpasswort Joanas Burocalendar-Konto bekommen soll (oder selbst ein sicheres erzeugen und Jannis einmal
   im Chat nennen, Joana ändert es danach unter Einstellungen → Profil).

## Schritt 1: Bestand in Coolify aufnehmen (nur lesen)

Notieren (nicht ins Repo):
- **Server-IP** des VPS.
- Anwendung **Website** (Repo joana-kort-website): aktuelle Domain(s), vorhandene Environment Variables.
- Anwendung **Burocalendar von Jannis** ("willi"): Domain (z. B. `termine.<ip>.sslip.io`), Wert von `TURN_URLS` und
  `TURN_SECRET`, Status von Auto Deploy.
- TURN-Server (Docker Compose `coturn` oder Container `coturn` auf dem Server) läuft?
- GitHub-App-Quelle in Coolify (Sources), die Zugriff auf `Burocalendar` hat.

## Schritt 2: DNS prüfen

Für das Postfach ist **kein** neuer Eintrag nötig (info@ läuft schon). Für den Kalender auf Joanas Domain ist **genau ein**
Eintrag nötig.

```bash
nslookup termine.stressberatung-kort.de      # muss die Server-IP liefern
nslookup www.stressberatung-kort.de          # Website
nslookup -type=mx stressberatung-kort.de     # Mail-Anbieter erkennen (mx*.hostinger.com = Hostinger)
nslookup -type=txt stressberatung-kort.de    # SPF vorhanden? (v=spf1 ...)
nslookup -type=txt _dmarc.stressberatung-kort.de
```

- Fehlt `termine`: A-Record `termine` → Server-IP anlegen (hPanel → Domains → stressberatung-kort.de → DNS). Ohne Zugang:
  Jannis bitten, das zu tun, und warten, bis `nslookup` die IP liefert. **Nicht** mit einer sslip.io-Adresse starten: alle
  verschickten Links (Bestätigungen, Videoraum) würden später ins Leere zeigen.
- MX-, SPF-, DKIM-, DMARC-Einträge **nicht anfassen**. Fehlt SPF oder DMARC: Jannis darauf hinweisen (`docs/MAIL.md`
  Schritt 2), nicht selbst ändern.

## Schritt 3: Mailversand der Website (Coolify → Website)

1. SMTP-Daten nach Anbieter (MX aus Schritt 2): Hostinger `smtp.hostinger.com`, Port `465` (SSL). IONOS `smtp.ionos.de`
   bzw. Strato `smtp.strato.de`, Port `587`.
2. Environment Variables der Website setzen (Build + Runtime):
   ```
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_USER=info@stressberatung-kort.de
   SMTP_PASS=<Passwort von info@>
   SMTP_FROM=info@stressberatung-kort.de
   ```
   **Nicht** setzen: `NEXT_PUBLIC_EMAIL`, `RECIPIENT`, `SMTP_REPLY_TO` (Standard ist info@).
3. Redeploy.
4. **Prüfung:** Anfrage mit Jannis' Adresse schicken (vorher fragen, welche):
   ```bash
   curl -s -X POST https://<website-domain>/api/anfrage/ -H 'Content-Type: application/json' \
     -d '{"typ":"kontakt","vorname":"Test Einrichtung","email":"<jannis-adresse>","nachricht":"Test Mailversand"}'
   ```
   Antwort `{"ok":true,...}`. Jannis bestätigt: Bestätigung bei ihm angekommen, Anfrage bei info@ angekommen. Sonst
   Coolify → Website → Logs (`[mail]`, `[notify]`). Achtung: höchstens 5 Anfragen pro Stunde und IP.

## Schritt 4: Website-Domain (nur falls nötig)

Läuft die Website noch nicht unter `www.stressberatung-kort.de`: erst Jannis fragen. Dann Domains
`https://www.stressberatung-kort.de,https://stressberatung-kort.de`, `NEXT_PUBLIC_SITE_URL=https://www.stressberatung-kort.de`,
Redeploy. `NEXT_PUBLIC_INDEXABLE` **nicht** auf `true` setzen (Impressum-Anschrift fehlt noch).
**Prüfung:** `curl -sI https://www.stressberatung-kort.de` → `200`.

## Schritt 5: Joanas Burocalendar anlegen (Coolify)

1. Neues `APP_SECRET` erzeugen: `openssl rand -hex 32` (nur für Joana, **nicht** das von "willi").
2. Neue Anwendung im Projekt der Website (oder eigenes Projekt "Joana Kort"), Environment production:
   **Private Repository (with GitHub App)** → `kortjannis-web/Burocalendar`, Branch `main`, Build Pack **Dockerfile**,
   Port **3000**, Domain **`https://termine.stressberatung-kort.de`**, Name `burocalendar-joana`.
3. Environment Variables:
   ```
   PUBLIC_URL=https://termine.stressberatung-kort.de
   DATA_DIR=/data
   APP_SECRET=<neu aus 1.>
   TURN_URLS=<wie bei willi>
   TURN_SECRET=<wie bei willi>
   ```
4. Persistent Storage: **Volume Mount**, Name `burocalendar-joana-data`, Destination `/data`.
5. Advanced: **Auto Deploy aus**, **Include Source Commit in Build an**. Healthcheck Path `/api/health`, Port 3000.
6. Deploy.
7. **Prüfung:** `curl -s https://termine.stressberatung-kort.de/api/health` → `"ok":true` und `"version":"<commit>"`
   (gleicher Commit wie `main` von Burocalendar).

## Schritt 6: Burocalendar einrichten

Über die Oberfläche `https://termine.stressberatung-kort.de` oder per API (Cookie-Session mit Header
`X-Requested-With: burocalendar`; Endpunkte in `src/server/routes/` des Burocalendar-Repos).

1. **Inhaber-Konto** (erste Seite): Name `Joana Kort`, E-Mail `info@stressberatung-kort.de`, Benutzername **`joana`**,
   Firmenname `Joana Kort Stressberatung`, Zeitzone Europe/Berlin, Passwort aus Schritt 0.
2. **Integrationen → E-Mail-Versand:** SMTP wie Schritt 3 (Hostinger: SSL/TLS 465), Absendername
   `Joana Kort Stressberatung`, Absender `info@stressberatung-kort.de`, Antwortadresse leer. **Test-E-Mail an mich**
   → Jannis/Joana bestätigt Eingang bei info@.
3. **Einstellungen → Firma & Design:** Markenfarbe `#8F6A44`, Logo (aus `public/icon.png` der Website oder Joanas Logo),
   Impressum `https://www.stressberatung-kort.de/impressum/`, Datenschutz `https://www.stressberatung-kort.de/datenschutz/`,
   Fußzeile `Joana Kort Stressberatung · Gummersbach`, Branding-Hinweis ausblenden: an.
4. **Einstellungen → Profil:** Begrüßungstext z. B. "Schön, dass Sie hier sind. Wählen Sie einen Termin, der Ihnen passt.
   Ich freue mich auf unser Gespräch." Foto: `public/images/joana/` der Website.
5. **Verfügbarkeit:** Bundesland Nordrhein-Westfalen. Arbeitszeiten bei Jannis erfragen (Standard lassen, falls unklar,
   und im Bericht erwähnen).
6. **Terminarten** (vorhandene Beispiele umbauen):
   - `erstgespraech` (**genau dieser Kurzlink**, die Website verlinkt `/joana/erstgespraech`): Titel "Kostenloses
     Erstgespräch", Dauer nur **15 Min.**, Orte "Telefon (ich rufe an)" und "Videocall", Mindestvorlauf 12 Std.,
     Puffer 5 Min., Beschreibung: "In 15 Minuten klären wir Ihr Anliegen, und ich empfehle Ihnen den Weg, der zu Ihnen
     passt. Kostenlos und unverbindlich."
   - `begleitung`: Titel "Begleitung", Dauern 60 und 90 Min., Ort Videocall oder vor Ort, **versteckt**.
   - Beide: Gast darf absagen/verschieben bis 24 Std. vorher.
7. **Integrationen → Eigene Videocalls:** Aufnahme erlauben **aus**.
8. **Einstellungen → Datenschutz & Spam:** Löschfrist 365 Tage, Zustimmung erforderlich an.
9. **Automationen:** "Danke & Feedback nach dem Termin" **an** + Bedingung zusätzlich "Von mir eingetragene Termine".
   "Erinnerung 1 Std. vorher (WhatsApp)" **aus**. Texte lesen: Sie-Form, keine Gedankenstriche.
10. **Prüfung:** Buchungsseite `https://termine.stressberatung-kort.de/joana/erstgespraech` zeigt freie Zeiten, Marke
    Joana Kort, Links zu Impressum/Datenschutz.

## Schritt 7: Google Kalender synchronisieren (beide Richtungen)

Burocalendar kann das eingebaut (Code: `src/server/integrations/google.ts`):
- **Google → Kalender:** belegte Zeiten aus Joanas Google Kalender werden bei jeder Anzeige der Buchungsseite live
  abgefragt (höchstens 1 Minute alt) und sind dann nicht buchbar. Zusätzlich erscheinen sie alle 10 Minuten in Joanas
  Kalender-Ansicht.
- **Kalender → Google:** jede Buchung wird sofort in Google eingetragen, Verschieben und Absagen ändern bzw. löschen den
  Eintrag dort mit.

Einrichtung:
1. **Google Cloud Console** (https://console.cloud.google.com, mit Jannis' Google-Konto, damit ein Projekt für alle Kunden
   reicht): Projekt **"Terminkalender"** anlegen (oder vorhandenes von "willi" nehmen) → **APIs & Dienste → Bibliothek →
   Google Calendar API → Aktivieren**.
2. **OAuth-Zustimmungsbildschirm:** Typ **Extern**, App-Name "Terminkalender", Support-E-Mail, Bereiche nicht nötig →
   **Status auf "In Produktion" setzen** (bei "Test" läuft die Verbindung nach 7 Tagen ab).
3. **Anmeldedaten → OAuth-Client-ID → Webanwendung**, Name "Burocalendar", **Autorisierte Weiterleitungs-URIs**:
   `https://termine.stressberatung-kort.de/api/oauth/google/callback` (die URI von "willi" gleich mit eintragen, falls
   dort Google genutzt wird). Client-ID und Clientschlüssel kopieren.
4. Joanas Burocalendar → **Integrationen → Kalender verbinden → Google Kalender** → Client-ID + Clientschlüssel →
   **Speichern** → **Mit Google verbinden**.
5. **Joanas Google-Konto** meldet sich an (Schritt 0, Punkt 4). Hinweis "Google hat diese App nicht überprüft" →
   **Erweitert → Weiter zu Terminkalender** → Kalender-Zugriff **zulassen**.
6. In der Liste der verbundenen Kalender bei Joanas Hauptkalender: **Konflikte prüfen** an, **Termine eintragen** an.
   Andere Kalender (Familie, Feiertage) nur **Konflikte prüfen**, falls sie dort belegt ist.
7. **Prüfung:** In Joanas Google Kalender morgen 10 bis 11 Uhr einen Testtermin anlegen → Buchungsseite neu laden →
   10:00 ist nicht buchbar. Auf der Buchungsseite einen anderen Termin buchen → erscheint binnen Sekunden in Google.
   Danach beide Testtermine löschen (Buchung in Burocalendar absagen, Absage-Mail geht an die Test-Adresse).

Ohne Google Cloud (Notlösung, nur wenn Jannis das will): Integrationen → **Abo-Link (iCal)** mit Joanas geheimer iCal-Adresse
(nur Sperren, alle 10 Minuten) und den Kalender-Abo-Link aus Einstellungen → Profil in Google abonnieren (Buchungen
erscheinen dort mit mehreren Stunden Verzögerung). Nicht empfohlen.

## Schritt 8: Website mit Joanas Kalender verbinden

1. Joanas Burocalendar → **Einstellungen → API & Webhooks** → API-Schlüssel "Website" erzeugen.
2. Coolify → Website → Environment Variables:
   ```
   NEXT_PUBLIC_BOOKING_URL=https://termine.stressberatung-kort.de/joana/erstgespraech
   BUROCALENDAR_API_KEY=<Schlüssel>
   ```
   (`BUROCALENDAR_URL` nicht nötig.) Redeploy.
3. **Prüfung:**
   - `curl -s https://<website-domain>/datenschutz/ | grep -c "Online-Terminbuchung"` → mindestens 1
   - Testanfrage wie in Schritt 3 → in Joanas Burocalendar unter **Kontakte** mit Schlagwort "Website". Testkontakt danach
     löschen (Kontakt → Löschen).

## Schritt 9: Rollout an alle Kalender einschalten

Anleitung: `docs/MEHRERE-KALENDER.md` im Burocalendar-Repo. Kurz:
1. Coolify → Keys & Tokens → API-Token `github-rollout` mit Recht **deploy** (sonst **write**).
2. Bei **willi**: Advanced → Auto Deploy **aus**, Include Source Commit in Build **an** (Jannis vorher sagen: Updates kommen
   danach nur noch nach grünen Tests).
3. Deploy-Webhooks beider Anwendungen kopieren.
4. GitHub-Secrets im Repo **Burocalendar** (mit `gh`, falls angemeldet):
   ```bash
   gh secret set COOLIFY_TOKEN --repo kortjannis-web/Burocalendar
   gh secret set BUROCALENDAR_INSTANCES --repo kortjannis-web/Burocalendar < instanzen.txt   # Datei danach löschen
   ```
   Inhalt `instanzen.txt` (willi zuerst):
   ```
   willi https://<willi-domain> <willi-deploy-webhook>
   joana https://termine.stressberatung-kort.de <joana-deploy-webhook>
   ```
5. **Prüfung:** letzten CI-Lauf auf `main` neu starten (`gh run rerun <id> --repo kortjannis-web/Burocalendar`). Job
   "Rollout auf alle Instanzen" grün, Tabelle mit ✅ willi und ✅ joana. Danach `/api/health` beider Instanzen: gleiche
   `version`.

## Schritt 10: Abschluss

1. Ende-zu-Ende-Test: Website → Fragebogen (Kontaktweg Mail, Jannis' Adresse) → "Gleich einen Termin wählen" → buchen →
   Bestätigung mit Kalendereinladung von info@, Videolink `https://termine.stressberatung-kort.de/meet/...`, Eintrag in
   Google, unter Nachrichten geplant: Erinnerung 24 Std. vorher und Nachfass-Mail. Testbuchung danach absagen.
2. In `docs/OFFENE-PUNKTE.md` (Website-Repo) erledigte Punkte abhaken (E-Mail-Versand, Online-Terminbuchung) mit Datum,
   in `CLAUDE.md` die Zeile "Offener Auftrag" entfernen, diese Datei löschen. Commit + Push auf `main`.
3. Bericht an Jannis: was eingerichtet ist, Zugangsdaten für Joana (Adresse, Benutzername, Startpasswort), was offen ist
   (z. B. Arbeitszeiten, Impressum-Anschrift, `NEXT_PUBLIC_INDEXABLE`, AV-Verträge Hostinger).
