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

Domain und Postfach liegen bei **netcup** (Webhosting, Stand DNS 27.10.2026: MX `mail.stressberatung-kort.de` und
`mxf962.netcup.net`, SPF vorhanden, DMARC fehlt).

- **netcup:** Webhosting Control Panel (WCP) → **E-Mail** → `info@stressberatung-kort.de`. Dort steht der Server
  (`mxf962.netcup.net`) und dort lässt sich das Passwort neu setzen.

Notieren:

| Angabe | netcup (eingetragen) |
|---|---|
| SMTP-Server | `mxf962.netcup.net` (Zertifikat passt auf diesen Namen) |
| Port | `465` |
| Verschlüsselung | SSL/TLS |
| Benutzer | `info@stressberatung-kort.de` |
| Passwort | Postfach-Passwort |

Passwort unbekannt? Im WCP ein neues setzen. **Achtung:** Dann muss Joana es auch auf Handy und Laptop neu eintragen.

## Schritt 2: Prüfen, dass Mails nicht im Spam landen (SPF, DKIM, DMARC)

1. **netcup:** SPF ist gesetzt (`v=spf1 mx a include:_spf.webhosting.systems ~all`). DKIM im WCP unter E-Mail →
   **DKIM** einschalten, falls aus. DMARC fehlt: im netcup CCP → Domains → `stressberatung-kort.de` → **DNS** einen
   TXT-Eintrag `_dmarc` mit `v=DMARC1; p=none; rua=mailto:info@stressberatung-kort.de` anlegen.
2. Gegenprobe: <https://www.mail-tester.com> öffnen → angezeigte Adresse kopieren → von **info@** (Webmail oder Handy) eine
   kurze Mail mit Betreff und zwei Sätzen dorthin schicken → **Dann prüfen Sie Ihre Punktzahl**. Ziel: **mindestens 8/10**.
   Unter 8 zeigt die Seite genau, welcher Eintrag fehlt.

## Schritt 3: Website darf Mails verschicken (Coolify)

1. Coolify → Projekt der **Website** (joana-kort-website) → **Environment Variables**.
2. Stand 27.10.2026 schon eingetragen: `SMTP_HOST=mxf962.netcup.net`, `SMTP_PORT=465`,
   `SMTP_USER=info@stressberatung-kort.de`, `SMTP_FROM=info@stressberatung-kort.de`. **Es fehlt nur `SMTP_PASS`**
   (Passwort von info@): **+ Add**, Name `SMTP_PASS`, Wert eintragen, speichern.
   **Nicht** setzen: `NEXT_PUBLIC_EMAIL`, `RECIPIENT`, `SMTP_REPLY_TO` (die Website nimmt automatisch info@).
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

   | Feld | Wert (netcup) |
   |---|---|
   | Anbieter | **SMTP (eigenes Postfach / jeder Anbieter)** |
   | Server | `mxf962.netcup.net` |
   | Port / Verschlüsselung | **SSL/TLS (465)** |
   | Benutzer | `info@stressberatung-kort.de` |
   | Passwort | Passwort von info@ |
   | Absendername | `Joana Kort Stressberatung` |
   | Absenderadresse | `info@stressberatung-kort.de` |
   | Antwortadresse | leer lassen |

3. **Speichern** → **Test-E-Mail an mich** → muss bei info@ ankommen.

## Schritt 5: Joanas Geräte

Postfach info@ auf Joanas Handy und Laptop einrichten (Daten aus Schritt 1, Posteingang IMAP: `mxf962.netcup.net`,
Port 993, SSL). Dort kommen ab jetzt Anfragen, Buchungen und Antworten von Klienten an.

## Wenn sich später etwas ändert

- **Passwort von info@ geändert:** an **zwei** Stellen nachtragen: Coolify Website `SMTP_PASS` (+ Redeploy) und
  Burocalendar → Integrationen → E-Mail-Versand.
- **Andere Adresse gewünscht:** in Coolify bei der Website `NEXT_PUBLIC_EMAIL` und `SMTP_USER`/`SMTP_FROM` setzen, Redeploy,
  und in Burocalendar Absender und Benutzer ändern.
- **Datenschutz:** Auftragsverarbeitungsvertrag mit dem Mail-Anbieter abschließen (netcup: im CCP unter Stammdaten →
  Auftragsverarbeitung) und ablegen.
