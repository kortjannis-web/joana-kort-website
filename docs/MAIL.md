# Anleitung 1: E-Mail (info@stressberatung-kort.de)

Stand 27.10.2026. Alles, was mit dem Postfach zu tun hat. Das Postfach `info@stressberatung-kort.de` gibt es schon. Es wird
überall verwendet:

| Wer schickt | Was | Von / an |
|---|---|---|
| Website | neue Anfrage (Fragebogen, Rückruf, Kontakt, Warteliste) | an info@ |
| Website | Bestätigung an die Person, die angefragt hat | von info@, Antworten landen in info@ |
| Burocalendar | Buchungsbestätigung, Erinnerung, Nachfass-Mail, Verschoben, Abgesagt, Info an Joana | von info@ |

Auf der Website steht die Adresse schon überall (Header, Footer, Impressum, Datenschutz, Formulare). Dafür muss nichts
eingetragen werden. Es fehlen nur die **Zugangsdaten zum Versenden** (SMTP), damit Website und Kalender Mails schicken dürfen.
Ohne sie gehen **live keine Mails raus**. Anfragen liegen dann nur auf dem Server.

Dauer: etwa 20 Minuten.

---

## Schritt 1: SMTP-Zugangsdaten von info@ heraussuchen

Beim Anbieter, bei dem das Postfach liegt:

- **Hostinger:** hPanel → **E-Mails** → `stressberatung-kort.de` → **E-Mail-Konten** → bei `info@` auf **⋮** →
  **Konfigurationseinstellungen** (oder "Apps und Geräte verbinden"). Dort steht der SMTP-Server.
- **IONOS / Strato / andere:** Hilfe-Seite "E-Mail-Programm einrichten" oder "SMTP-Server".

Notieren:

| Angabe | Hostinger | IONOS | Strato |
|---|---|---|---|
| SMTP-Server | `smtp.hostinger.com` | `smtp.ionos.de` | `smtp.strato.de` |
| Port | `465` | `587` | `587` |
| Verschlüsselung | SSL | STARTTLS | STARTTLS |
| Benutzer | `info@stressberatung-kort.de` | ebenso | ebenso |
| Passwort | Postfach-Passwort | ebenso | ebenso |

Passwort unbekannt? Im Panel ein neues setzen. **Achtung:** Dann muss Joana es auch auf Handy und Laptop neu eintragen.

## Schritt 2: Prüfen, dass Mails nicht im Spam landen (SPF, DKIM, DMARC)

1. **Hostinger:** hPanel → E-Mails → `stressberatung-kort.de` → **E-Mail-Zustellbarkeit** bzw. **DNS-Einträge**. Bei SPF,
   DKIM und DMARC muss ein grüner Haken stehen. Fehlt einer: **Automatisch einrichten** / **Reparieren** klicken.
   (Liegt die Domain nicht bei Hostinger, die angezeigten Einträge beim Domain-Anbieter im DNS eintragen.)
2. Gegenprobe: <https://www.mail-tester.com> öffnen → angezeigte Adresse kopieren → von **info@** (Webmail oder Handy) eine
   kurze Mail mit Betreff und zwei Sätzen dorthin schicken → **Dann prüfen Sie Ihre Punktzahl**. Ziel: **mindestens 8/10**.
   Unter 8 zeigt die Seite genau, welcher Eintrag fehlt.

## Schritt 3: Website darf Mails verschicken (Coolify)

1. Coolify → Projekt der **Website** (joana-kort-website) → **Environment Variables**.
2. Für jede Zeile **+ Add**, Haken bei **Build Variable** und **Runtime** (wie bei den vorhandenen Einträgen):

   | Name | Wert (Hostinger) |
   |---|---|
   | `SMTP_HOST` | `smtp.hostinger.com` |
   | `SMTP_PORT` | `465` |
   | `SMTP_USER` | `info@stressberatung-kort.de` |
   | `SMTP_PASS` | Passwort von info@ |
   | `SMTP_FROM` | `info@stressberatung-kort.de` |

   Bei IONOS/Strato Server und Port `587` aus Schritt 1. **Nicht** setzen: `NEXT_PUBLIC_EMAIL`, `RECIPIENT`, `SMTP_REPLY_TO`
   (die Website nimmt automatisch info@).
3. Oben **Redeploy**, warten bis grün (2 bis 3 Minuten).
4. **Test:** Website öffnen → Fragebogen durchklicken → bei "Wie erreiche ich Sie?" auf **Mail** schalten → **Ihre eigene**
   E-Mail-Adresse eintragen → absenden. Innerhalb einer Minute müssen ankommen:
   - bei **info@**: "Neue Anfrage Erstgespräch: …"
   - bei **Ihnen**: "Ihre Anfrage für ein kostenloses Erstgespräch" (Absender Joana Kort Stressberatung)
   - Auf die Bestätigung **antworten** → die Antwort muss bei info@ ankommen.
5. Kommt nichts: Coolify → Website → **Logs** → nach `[mail]` oder `[notify]` suchen. `SMTP nicht konfiguriert` = Variablen
   fehlen oder kein Redeploy. `Invalid login` = Benutzer/Passwort falsch. `ETIMEDOUT` = Port falsch (465 mit SSL bzw. 587).

## Schritt 4: Burocalendar darf Mails verschicken

Erst, wenn Joanas Kalender läuft (Anleitung 2, Schritt 3).

1. `https://termine.stressberatung-kort.de` → mit Joanas Konto anmelden → **Integrationen** → **E-Mail-Versand**.
2. Eintragen:

   | Feld | Wert (Hostinger) |
   |---|---|
   | Anbieter | **SMTP (eigenes Postfach / jeder Anbieter)** |
   | Server | `smtp.hostinger.com` |
   | Port / Verschlüsselung | **SSL/TLS (465)** (IONOS/Strato: STARTTLS (587)) |
   | Benutzer | `info@stressberatung-kort.de` |
   | Passwort | Passwort von info@ |
   | Absendername | `Joana Kort Stressberatung` |
   | Absenderadresse | `info@stressberatung-kort.de` |
   | Antwortadresse | leer lassen |

3. **Speichern** → **Test-E-Mail an mich** → muss bei info@ ankommen.

## Schritt 5: Joanas Geräte

Postfach info@ auf Joanas Handy und Laptop einrichten (Daten aus Schritt 1, Posteingang IMAP: Hostinger `imap.hostinger.com`,
Port 993, SSL). Dort kommen ab jetzt Anfragen, Buchungen und Antworten von Klienten an.

## Wenn sich später etwas ändert

- **Passwort von info@ geändert:** an **zwei** Stellen nachtragen: Coolify Website `SMTP_PASS` (+ Redeploy) und
  Burocalendar → Integrationen → E-Mail-Versand.
- **Andere Adresse gewünscht:** in Coolify bei der Website `NEXT_PUBLIC_EMAIL` und `SMTP_USER`/`SMTP_FROM` setzen, Redeploy,
  und in Burocalendar Absender und Benutzer ändern.
- **Datenschutz:** Auftragsverarbeitungsvertrag mit dem Mail-Anbieter abschließen (Hostinger: im hPanel unter Konto →
  Rechtliches / DPA) und ablegen.
