# Offene Punkte für Joana (Stand 18.10.2026)

Die Website ist fertig gebaut und läuft als Vorschau (noindex). Diese Punkte brauchen Angaben oder eine Entscheidung von Joana, bevor die Seite live geht.

## Neu mit der Überarbeitung vom 18.10.2026 (Joanas Briefing + Funnel)
- [ ] **Programme**: Joana schrieb für das längere Programm "6 Termine à 90 Minuten im Abstand von etwa zwei Wochen". Umgesetzt ist nach Entscheidung vom 18.10.: links **wöchentlich über 3 Monate** (je 45 bis 60 Minuten, etwa 12 Sitzungen), rechts **alle zwei Wochen über 6 Monate** (je 90 Minuten, etwa 12 Sitzungen). Je Karte ein Schalter **"Laufzeit verdoppeln"** (6 bzw. 12 Monate, **15 % Rabatt auf jede Sitzung**). Bitte mit Joana bestätigen: Sitzungsdauer, Rabatt, ob die rechte Variante wirklich 90 Minuten hat (`lib/content/angebote.ts`, `PROGRAMME`, `RABATT_LANG`).
- [ ] **Rückruf-Versprechen**: Im Funnel steht "Ich melde mich persönlich, in der Regel am nächsten Werktag". Passt das für Joana?
- [ ] **Qualifikationen und Referenzen** (`lib/content/referenzen.ts`): Hochschule und Studienbeginn ergänzen. Fortbildungen, durchgeführte Trainings (Ort/Einrichtung), Trainingsfotos (nur mit Einwilligung) eintragen, dann erscheinen die Sections automatisch. Leere Listen bleiben unsichtbar.
- [ ] **Ablauf** (`/ablauf/`): Fallbeispiel (berufstätige Mutter im Studium, klar als Beispiel gekennzeichnet) und Beispiel einer Firmenschulung fachlich prüfen.
- [ ] **Methoden** (`/methoden/`): Auswahl der Methoden prüfen und ggf. ergänzen.
- [ ] **Berufsbezeichnung**: jetzt "Angehende Gesundheitspsychologin mit Schwerpunkt Stress" (Joanas Vorschlag). Nach dem Abschluss `STUDIUM_ABGESCHLOSSEN = true` in `lib/site.ts`.

## Pflicht vor dem Go-live
- [ ] **Anschrift fürs Impressum** (ladungsfähig, kein Postfach). Eintragen in Coolify: `NEXT_PUBLIC_STREET`, `NEXT_PUBLIC_ZIP`. Bis dahin steht im Impressum ein rot markierter Platzhalter.
- [x] **E-Mail-Adresse**: info@joana-stressberatung.de (Entscheidung 27.10.2026, Postfach besteht, Standard in `lib/site.ts`). In Coolify `NEXT_PUBLIC_EMAIL` leer lassen.
- [ ] **Domain**: joana-stressberatung.de (Standard in `lib/site.ts`). In Coolify `NEXT_PUBLIC_SITE_URL=https://www.joana-stressberatung.de`, Domain der Website umstellen, danach `NEXT_PUBLIC_INDEXABLE=true` (`docs/TERMINKALENDER.md` Schritt 2).
- [ ] **E-Mail-Versand (SMTP)** einrichten, sonst kommen Formular-Anfragen nur in `/app/data/anfragen.jsonl` an. Stand 27.10.2026: in Coolify noch kein `SMTP_HOST`, live gehen also keine Mails raus. Anleitung: `docs/MAIL.md`.
- [ ] **Datenschutz**: Hoster und E-Mail-Anbieter bestätigen (PRÜFEN-Kommentare in `components/legal/DatenschutzContent.tsx`), Auftragsverarbeitungsverträge ablegen.
- [ ] **Umsatzsteuer**: Kleinunternehmerin (§ 19 UStG)? Sonst USt-IdNr. ins Impressum.

## Inhalte, die Joana prüfen sollte
- [ ] **Berufsbezeichnung**: Während des Studiums steht "Stressberaterin mit gesundheitspsychologischem Hintergrund" bzw. "Studium der Gesundheitspsychologie (Abschluss voraussichtlich Sommer 2027)". Abschlussjahr und Abschluss (B.Sc./M.Sc.) in `lib/site.ts` prüfen. Nach dem Abschluss dort `STUDIUM_ABGESCHLOSSEN = true` setzen, dann heißt es überall "Gesundheitspsychologin (B.Sc.) mit Schwerpunkt Stress".
- [ ] **Migräne auf "Über mich"**: Ich habe die Geschichte zurückhaltend erzählt (seit der Kindheit Migräne, Ärzte sagten "Stress reduzieren", niemand zeigte wie). Keine Angaben zur Schwerbehinderung. Joana entscheidet, ob das so bleiben soll (`app/joana-kort/page.tsx`).
- [ ] **Zitat** auf der Startseite ("Mir hat damals jemand gefehlt …") ist aus dem Briefing formuliert. Bitte freigeben oder umformulieren (`components/home/Solution.tsx`).
- [ ] **Sitzungsdauer** 3-Monats-Programm: 60 Minuten eingetragen (45 Minuten war Alternative), `lib/content/angebote.ts`.
- [ ] **Orte im Umkreis** (`lib/site.ts`, ORTE): Gummersbach, Bergneustadt, Wiehl, Marienheide, Engelskirchen, Reichshof, Nümbrecht, Lindlar, Meinerzhagen.
- [ ] **Ratgeber-Artikel** (6 Stück, `lib/content/ratgeber.ts`) fachlich gegenlesen.
- [ ] **Materialien**: Stresstagebuch, Tagesplaner und Wochenfokus sind als Bilder zu sehen (Seiten aus den PDFs). Optional: Stresstagebuch als kostenlosen Download anbieten (gut für Reichweite und Anfragen).

## Wird automatisch besser, sobald vorhanden
- [ ] **Vorstellungsvideo** (direkt unter dem Hero auf der Startseite): MP4 (H.264, 1 bis 2 Minuten, 1080p), Vorschaubild und am besten Untertitel (VTT) nach `public/video/` legen und in `lib/images.ts` bei `VIDEO` eintragen. Selbst gehostet, also ohne YouTube und ohne Einwilligungsabfrage. Bis dahin steht ein ruhiger Platzhalter ("Video folgt in Kürze").
- [x] **Anrufen** (Stand 18.10.2026): runder Telefon-Knopf unten rechts und in der Kontaktleiste rechts, ein Tippen ruft +49 1578 2327179 an. Im Header steht "Termin buchen" statt "Anrufen". Hinweis: Joana hatte sich im Briefing gegen eine direkte Anruf-Funktion ausgesprochen, bitte mit ihr abstimmen.
- [ ] **WhatsApp**: Der Knopf unten rechts nutzt dieselbe Mobilnummer. Bitte bestätigen, dass WhatsApp (am besten WhatsApp Business) auf dieser Nummer eingerichtet ist, sonst abweichende Nummer in `NEXT_PUBLIC_WHATSAPP`. Kein Fremd-Skript: der Knopf öffnet nur wa.me. Datenschutzerklärung hat einen WhatsApp-Abschnitt.
- [ ] **Stress verstehen** (`/stress-verstehen/`, Inhalte in `lib/content/wissen.ts`): sechs Themen mit Erklär-Animationen sind angelegt und fachlich zu prüfen. Weitere Themen (Platzhalter "Demnächst": Stress und Schlaf, Mental Load in der Familie, Stress im Beruf) sobald Joana Inhalte liefert. Neue Themen am besten in Dreiergruppen, Animation aus den sechs vorhandenen wählen.
- [ ] **Fotos von Joana** (Porträt + Arbeitssituation): in `lib/images.ts` bei `PORTRAIT` eintragen, dann erscheinen sie im Bogen auf Startseite und "Über mich". Bis dahin steht dort ein Monogramm (bewusst kein Stockfoto).
- [ ] **Google-Unternehmensprofil** anlegen (Kategorie z. B. "Lebensberater" oder "Gesundheitsberater", Servicegebiet statt Adresse möglich). Links in Coolify eintragen.
- [ ] **Google-Bewertungen / Kundenstimmen**: nur echte, freigegebene Stimmen in `lib/content/reviews.ts`. Dann erscheinen automatisch die Bewertungs-Section und das Sterne-Badge im Hero.
- [ ] **Online-Terminbuchung**: eigene Burocalendar-Instanz für Joana (`termine.joana-stressberatung.de`, Absender info@joana-stressberatung.de), kein Calendly. Website ist vorbereitet (`NEXT_PUBLIC_BOOKING_URL`, `BUROCALENDAR_API_KEY`). Einrichtung Schritt für Schritt: `docs/TERMINKALENDER.md`.
- [ ] **Preise**: bewusst nicht auf der Website (Entscheidung 16.10.2026). Können später in `lib/content/angebote.ts` ergänzt werden.
- [ ] **Webinar-Termine, Online-Kurs**: sobald fest, Status in `lib/content/angebote.ts` auf `buchbar` setzen und Texte ergänzen. Bis dahin führen beide Seiten zum Erstgespräch (Interesse vorausgewählt), die Warteliste liegt als Zusatz hinter dem Pfeil.
- [ ] **Instagram / LinkedIn**: `NEXT_PUBLIC_INSTAGRAM`, `NEXT_PUBLIC_LINKEDIN`.

## Entscheidungen, die ich getroffen habe (zur Info)
- Ansprache **Sie**, Joana schreibt in Ich-Form.
- Marke **Joana Kort Stressberatung**, Hauptangebot heißt **Stresscoaching** (Beratung + Umsetzung), so sind beide Suchbegriffe abgedeckt.
- Slogan bleibt **"Stress verstehen. Stress bewältigen. Stress managen."**. Die Sorge, "managen" klinge nach To-do-Liste, wird auf der Seite direkt aufgegriffen ("Stress managen heißt nicht, noch mehr zu leisten").
- Formular statt Geburtsdatum mit freiwilliger **Altersgruppe** (Datensparsamkeit), keine Fragen zur Gesundheit. Beruf/Branche und Altersgruppe kommen erst nach dem Absenden als freiwillige Ergänzung, damit der Einstieg kurz bleibt.
- **Funnel (18.10.2026)**: vier Schritte mit je höchstens drei Antworten (Für wen → Situation bzw. Teamgröße → Rhythmus bzw. Ort → Name + Telefon oder E-Mail per Schalter). Überschrift "In 1 Minute zu Ihrem kostenlosen Erstgespräch" statt "Angebot in 5 Minuten" (kein Angebot ohne Gespräch, wirkt sonst verkäuferisch). Schrittlinie: inaktiv Dunkelbraun, aktiv Amber.
- **Design (18.10.2026)**: Schrift Playfair Display (Überschriften, Akzentwörter kursiv) + DM Sans (Text), nach kurzem Ausflug zu Manrope wieder zurück. Rundes, weiches Design (Pillen-Buttons, große Radien), nicht eckig. Buttons wieder Terrakotta-Orange mit leichtem Glanz, Funnel-Schritte Amber, übrige Akzente Karamell, kein Bordeaux. Knoten-Linie im Hero mit größeren Ringen, Begleit-Linien beim Scrollen. Kein CTA-Knopf im Hero, ab 1024 px steht dort der Fragebogen. Telefon = Rückruf (Name + Nummer hinterlassen), Kontaktleiste mit drei Symbolen. Hero-Karte offen (dunkler Kopf, Antworten als freie runde Felder). Navigation mit fünf Punkten (Konzept, Angebote, Ablauf, Über mich, Kontakt), Kontaktleiste am rechten Rand.
- Eigene **FAQ-Seite** trotzdem angelegt: wichtig für Google und KI-Suchen (ChatGPT, Perplexity), Fragen lassen sich jederzeit anpassen. Startseite zeigt die 8 wichtigsten, die FAQ-Seite alle 15 (drei Gruppen à fünf).
- **Ein Ziel für alle Buttons**: das kostenlose 15-Minuten-Erstgespräch mit kurzem Fragebogen. Orange ist ausschließlich diesen Buttons vorbehalten, alle übrigen Akzente sind Karamell.
- **Dreiergruppen** wo möglich (Vertrauenspunkte, Schwerpunkte, Angebote, Ablauf, Stärken, Bestandteile), damit man sich die Inhalte leicht merkt.
- **Längere Texte hinter dem Pfeil**: Sie stehen vollständig im HTML (für Google und KI lesbar), sichtbar werden sie erst nach dem Klick.
- **Header**: Angebote, Stress verstehen, Über mich, Kontakt. Seltener gebrauchte Seiten (Mein Ansatz, Region, Ratgeber, FAQ) über "Mehr" im Angebote-Menü, im Footer und im Text verlinkt.
