# Offene Punkte für Joana (Stand 16.10.2026)

Die Website ist fertig gebaut und läuft als Vorschau (noindex). Diese Punkte brauchen Angaben oder eine Entscheidung von Joana, bevor die Seite live geht.

## Pflicht vor dem Go-live
- [ ] **Anschrift fürs Impressum** (ladungsfähig, kein Postfach). Eintragen in Coolify: `NEXT_PUBLIC_STREET`, `NEXT_PUBLIC_ZIP`. Bis dahin steht im Impressum ein rot markierter Platzhalter.
- [ ] **E-Mail-Adresse** bestätigen (Platzhalter: kontakt@joana-kort.de) → `NEXT_PUBLIC_EMAIL`.
- [ ] **Domain** festlegen → `NEXT_PUBLIC_SITE_URL`, danach `NEXT_PUBLIC_INDEXABLE=true`.
- [ ] **E-Mail-Versand (SMTP)** einrichten, sonst kommen Formular-Anfragen nur in `/app/data/anfragen.jsonl` an (siehe `.env.example`).
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
- [ ] **Fotos von Joana** (Porträt + Arbeitssituation): in `lib/images.ts` bei `PORTRAIT` eintragen, dann erscheinen sie im Bogen auf Startseite und "Über mich". Bis dahin steht dort ein Monogramm (bewusst kein Stockfoto).
- [ ] **Google-Unternehmensprofil** anlegen (Kategorie z. B. "Lebensberater" oder "Gesundheitsberater", Servicegebiet statt Adresse möglich). Links in Coolify eintragen.
- [ ] **Google-Bewertungen / Kundenstimmen**: nur echte, freigegebene Stimmen in `lib/content/reviews.ts`. Dann erscheinen automatisch die Bewertungs-Section und das Sterne-Badge im Hero.
- [ ] **Online-Terminbuchung** (z. B. Calendly): Link in `NEXT_PUBLIC_BOOKING_URL`, dann führen alle "Erstgespräch"-Buttons dorthin, das Formular bleibt als Alternative.
- [ ] **Preise**: bewusst nicht auf der Website (Entscheidung 16.10.2026). Können später in `lib/content/angebote.ts` ergänzt werden.
- [ ] **Webinar-Termine, Online-Kurs**: sobald fest, Status in `lib/content/angebote.ts` auf `buchbar` setzen und Texte ergänzen. Bis dahin sammeln beide Seiten Wartelisten-Einträge.
- [ ] **Instagram / LinkedIn**: `NEXT_PUBLIC_INSTAGRAM`, `NEXT_PUBLIC_LINKEDIN`.

## Entscheidungen, die ich getroffen habe (zur Info)
- Ansprache **Sie**, Joana schreibt in Ich-Form.
- Marke **Joana Kort Stressberatung**, Hauptangebot heißt **Stresscoaching** (Beratung + Umsetzung), so sind beide Suchbegriffe abgedeckt.
- Slogan bleibt **"Stress verstehen. Stress bewältigen. Stress managen."**. Die Sorge, "managen" klinge nach To-do-Liste, wird auf der Seite direkt aufgegriffen ("Stress managen heißt nicht, noch mehr zu leisten").
- Formular statt Geburtsdatum mit freiwilliger **Altersgruppe** (Datensparsamkeit), keine Fragen zur Gesundheit.
- Eigene **FAQ-Seite** trotzdem angelegt: wichtig für Google und KI-Suchen (ChatGPT, Perplexity), Fragen lassen sich jederzeit anpassen.
