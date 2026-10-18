# Regeln
Globale Standards + Skills: `C:\Users\Jannis Kort\CLAUDE.md`

## Stack-Hinweise
- Next.js 15.5 (App Router, `output: 'standalone'`, `trailingSlash: true`) · React 19 · Tailwind 4 · Framer Motion 12 (`LazyMotion`, nur `Reveal`)
- Kein `next/image` → `<img>` mit width/height · Fonts lokal über `next/font/local` (`app/fonts`)
- Alle Seiten statisch vorgerendert. `page.tsx` ohne `'use client'`
- Keine Gedankenstriche (– —) in sichtbaren Texten, Bereiche mit "bis"
- UX/UI-Grundlage: Aufbau und Effekte aus der Website Jeannine Ludwig Immobilien (gleiche Agentur), Farben und Inhalte eigen

## Projekt
**Joana Kort Stressberatung** · Stressberatung und Stresscoaching · Gummersbach (vor Ort ca. 20 km) und online
Hauptangebot: persönliche Begleitung, wöchentlich über 3 Monate (45 bis 60 Min.) oder alle 2 Wochen über 6 Monate (90 Min.), je Karte Schalter "Laufzeit verdoppeln" (6 bzw. 12 Monate, 15 % Rabatt pro Sitzung, `RABATT_LANG`, `ProgrammCard`)
Weitere Angebote: zu zweit/Gruppe, Online-Webinar (4 Wochen, Termine folgen, Warteliste), Online-Kurs (in Vorbereitung, Warteliste), Schulungen für Unternehmen
Ziel jeder Seite: kostenloses Erstgespräch (15 Min., Telefon oder Video) → `ERSTGESPRAECH` = `/erstgespraech/#anfrage`
Ton: Sie-Ansprache, Ich-Form von Joana, warm, klar, praktisch. Keine Heilversprechen, klare Abgrenzung zur Psychotherapie
Slogan/Konzept: "Stress verstehen. Stress bewältigen. Stress managen." Kernproblem: Lücke zwischen Wissen und Umsetzung
Briefing-Entscheidungen und offene Punkte: `docs/OFFENE-PUNKTE.md`

## Stammdaten / Inhalte
- Name, Kontakt, Region, Berufsbezeichnung (`ROLE`, Schalter `STUDIUM_ABGESCHLOSSEN`), Env-Schalter: `lib/site.ts`
- Angebote, Programme, drei Schwerpunkte, Ablauf, Formular-Interessen: `lib/content/angebote.ts` (eine Quelle für Nav, Karten, Schema, Formular)
- FAQ je Thema: `lib/content/faqs.ts` (15 = 3 Gruppen à 5, Startseite `HOME_FAQS` 8) · Wissen "Stress verstehen": `lib/content/wissen.ts` (Themen in Dreiergruppen, Kurzantwort + Langtext + Animation `scene`) · Ratgeber: `lib/content/ratgeber.ts` (6 Artikel, Kurzantwort für GEO, Quellen) · Bewertungen: `lib/content/reviews.ts` (leer = Section + Hero-Badge ausgeblendet, nur echte Stimmen)
- Bilder: `lib/images.ts` (Materialien aus Joanas PDFs in `public/images/material`, `PORTRAIT` = null bis Fotos da sind, `VIDEO` = null bis das Vorstellungsvideo da ist)
- Rich-Text: `**fett**` und `[Text](/pfad/)` (`components/ui/Rich.tsx`) · Langtexte hinter dem Pfeil: `More` (`components/ui/More.tsx`, `<details>`, im HTML für SEO/GEO, ohne Vorschau) · CTA-Zeile: `CtaRow` · Rechtstexte: `components/legal/*Content.tsx` (PRÜFEN-Kommentare)

## Design
Farben aus Joanas Materialien: Papier `#FBF8F3` · Espresso `#2A211B` (Marke, dunkle Flächen, Text, Skala `espresso-*`) · Karamell `#8F6A44` (Akzent, `caramel-*`) · Beige `stone` `#F5EDE3` · Greige `greige` `#E9E3DA` (Kontrastflächen) · CTA-Buttons neutral dunkles Braun `--color-cta` `#2A211B` (auf dunklen Flächen automatisch Greige, `--cta-bg`), KEIN Rot/Orange auf Buttons (Briefing Ä6) · Amber `--color-amber` `#C8893A` AUSSCHLIESSLICH für aktive Schritte im Funnel · alle übrigen Akzente Karamell (`caramel-300` auf Dunkel)
Fonts: Manrope (`font-serif`/`font-display` = Überschriftenschrift, halbfett, KEIN Kursiv, `em` ist normal, Akzentwörter über Farbe/leichteres Gewicht) · DM Sans (Text)
Formen: leicht abgerundet, NIE eckig (Entscheidung 18.10.2026, Radien `rounded-sm` 6 px, `md` 10 px für Buttons/Kacheln/Bilder, `lg` 16 px Karten, `xl` 20 px), Schalter, Umschalter und Schrittpunkte IMMER ganz rund (`rounded-full`), Sheets mit runden oberen Ecken
Typo-Utilities: `t-hero` `t-hero-sub` `t-h1` `t-h2` `t-h3` `t-lead` `t-label` · Container `wrap`/`wrap-wide` · Links `link` · Lesetext `prose-jk` · Körnung `grain` (dunkel) / `paper-grain` (hell)
Viewport-Regel: JEDE Section passt in einen Bildschirm (Handy ab 390 × 844, Tablet, Laptop 1280 × 720 bis 4K), mobile first. Mittel: Abstände `sec`/`sec-t`/`sec-b` (`--sec-y`) und `--sec-gap` in svh, Überschriften durch svh begrenzt, Grundschrift ab 1024 nach Breite UND Höhe (16px bei 1440 × 900, bis 32px in 4K), Bild-/Grafikhöhen in svh. Wiederholte Karten am Handy als `Carousel`, Langtext hinter `More`, lange Inhalte auf mehrere Sections verteilen. Varianten: `compact` (Handy < 800 hoch), `lowtab` (Tablet quer niedrig), `lowdesk` (Laptop niedrig). Prüfen: alle Sections ≤ Viewport (inkl. festem Header) messen
Logo: Textlogo "Joana Kort" (Manrope, fett) mit feiner Linie und "STRESSBERATUNG" darunter (`Logo` in `components/layout/Logo.tsx`, Intro: Name wischt herein, Linie zieht sich, Zusatz). Markenzeichen: eine Linie, die sich verknotet und ruhig ausläuft (`LogoMark`/`KNOT_PATH`), groß im Hero (`components/ui/HeroLine.tsx`, Varianten home/mobile/page), zeichnet sich (`LogoDraw`, Intro). Hero zeigt "Joana Kort Stressberatung" groß über dem Slogan (mit `PORTRAIT` daneben)
Seitenaufbau (wie Vorlage): `PageHero` (hell wie die Startseite: Beige mit Körnung, Linie, weiches Licht; Elemente tauchen nacheinander auf `.intro-rise`; optional `aside` mit Papierstapel, `tone="greige"` für Abwechslung) + direkt danach `<Sheet crumbs>` mit dem gesamten Inhalt (schiebt sich über den stehenden Hero via `StackBack`). Footer = dunkles Sheet mit Schluss-CTA (`FooterCta`, Text je Pfad)
Startseite (Funnel, etwa alle drei Elemente ein CTA): Hero hell (Marke groß, Slogan als Titel, Zeilen tauchen nacheinander auf, drei Vertrauenspunkte, Erstgespräch-Karte rechts ab Desktop, mobil im Sheet) → Video (`VideoIntro`, Platzhalter bis `VIDEO`) → Fragebogen mobil → Vertrauensleiste (3, `TrustBar` + `TrustScene`) → Bewertungen (wenn vorhanden) → "Kennen Sie das?" (`Situation`, 3 Fragen, `GapScene`) → "Die Antwort" (Espresso, StackBack) + drei Schritte als Sheet darüber (`Pillars`: drei versetzte Zeilen, jede weiter rechts eingerückt, eigene Linien-Icons `components/ui/StepIcons.tsx`, Überschrift und Satz nebeneinander, Langtext hinter dem Pfeil) → drei Wege (`Offer`) → Stress verstehen (`WissenTeaser`, 3 Erklär-Animationen) → Ablauf in 3 Schritten (`Process`) → Werkzeuge (`Tools`) → Über mich + Region (`AboutArea`) → 8 FAQ (Link zu allen 15)
Effekte (`globals.css`): `lift-tile`, `lift-warm`, `glow-icon`, `step-dot`, `loop-card`, `frame`/`frame-soft`, `floaty`/`floaty-lg`, `paper` (Papierstapel fächert beim Hover), `breathe`, `.gap-scene`, `.area-map`, `.pillar-line`, `.more` (Pfeil), `.explain` + `.ex-*` (Erklär-Animationen `components/wissen/ExplainScene.tsx`: puls, waage, kette, welle, ebenen, saeulen) (InView: `data-view`)
Header (wie Vorlage, hell): transparent über dem Hero, Glas-Leiste Navigation mit 5 Punkten (Konzept ▾ [Ansatz, Methoden, Stress verstehen], Angebote ▾ mit "Mehr", Ablauf, Über mich ▾ [Über mich, Qualifikationen und Referenzen], Kontakt) + E-Mail-Knopf, rechts "Kostenloses Erstgespräch" mit Kalender-Symbol (Tablet "Termin buchen", scrollt auf der Startseite zum Funnel). Kein "Anrufen" im Header. Handy: Leiste fährt beim Runterscrollen "Termin buchen" (Kalender-Symbol) aus dem Menü-Knopf · Anrufen (Entscheidung 18.10.2026): runder Telefon-Knopf unten rechts (`CALL_HREF`, direkter Anruf) und in der Kontaktleiste (`ContactRail` in `WhatsAppChat.tsx`, ab 1280 px fest am rechten Rand: Termin buchen, Anrufen, E-Mail, Kontaktformular). Nummer ausgeschrieben nur mit `NEXT_PUBLIC_PHONE`. WhatsApp über das Menü, ohne Fremd-Skript → wa.me, Nummer aus `lib/site.ts`, abweichend `NEXT_PUBLIC_WHATSAPP`
Robustheit ohne JS: `StackBack` erst per JS sticky, `Reveal` blendet ohne Hydrierung nach 3 s ein, alle Animationen zeigen ohne JS/bei reduzierter Bewegung das fertige Bild

## Seiten
`/` · `/stress-verstehen/` · `/angebote/` · `/stresscoaching/` · `/zu-zweit-und-in-der-gruppe/` · `/webinar/` · `/online-kurs/` · `/stressmanagement-unternehmen/` (gemeinsames Layout `components/angebote/OfferLayout.tsx`) · `/mein-ansatz/` · `/methoden/` · `/ablauf/` · `/joana-kort/` · `/qualifikationen-und-referenzen/` (Inhalte `lib/content/referenzen.ts`, leere Listen = Section ausgeblendet, laufende Qualifikationen mit Badge) · `/erstgespraech/` (+ `#kontaktformular`, `components/forms/KontaktForm.tsx`) · `/stressberatung-gummersbach/` · `/stressberatung-online/` · `/haeufige-fragen/` · `/ratgeber/` (+`[slug]`) · `/impressum/` `/datenschutz/`
Neue Seite: `pageMeta()` aus `lib/seo.ts` + `app/sitemap.ts` + ggf. Nav (`components/layout/nav.ts`) und Footer · Querverlinkung: `MoreOffers` am Ende jeder Angebotsseite

## Formulare
Erstgespräch: `components/funnel/ErstgespraechFunnel.tsx` (Briefing Ä6: immer 4 Schritte, je höchstens 3 Antworten, Inhalte in `FUNNEL` in `lib/content/angebote.ts`: Für wen → Situation/Wer/Teamgröße → Rhythmus/Ort → Name + Telefon ODER E-Mail per Schalter → Bestätigung mit freiwilliger Ergänzung Beruf, Alter, Ort, Nachricht als eigene Anfrage `ergaenzung`). Kopfband "In 1 Minute zu Ihrem kostenlosen Erstgespräch" mit Schrittlinie (inaktiv Dunkelbraun, aktiv/erledigt Amber, `.fstep`/`.fline`). Datenschutzhinweis statt Häkchen (Art. 6 Abs. 1 lit. b). Vorauswahl über `?interesse=` oder `preset` (`INTERESSEN` beantwortet Schritte vorab). ALLE CTAs führen dorthin (`CTA_LABEL`, `ERSTGESPRAECH`; Angebotsseiten mit `interesse`). Startseite: zwei Instanzen (Desktop im Hero `jkh`, mobil im Sheet `jk`, `data-funnel-anchor`, Hero-CTA löst `jk:funnel-call` aus)
Warteliste: `components/forms/WartelisteForm.tsx` (Webinar/Kurs nur als Zusatz hinter dem Pfeil im CTA-Block) · API: `app/api/anfrage` (typ erstgespraech/ergaenzung/kontakt/warteliste, Antwort mit `id`, Rate-Limit 5/h/IP, Honeypot, JSONL in `DATA_DIR`, Mail an Joana + Bestätigung)
Datensparsam: keine Gesundheitsfragen, kein Geburtsdatum (nur freiwillige Altersgruppe nach dem Absenden)

## SEO / GEO
Schema `lib/schema.ts`: ProfessionalService + Person + WebSite global, Service/FAQPage/Breadcrumb/BlogPosting/ItemList je Seite. Keine eigenen Sterne
Vorschau: `NEXT_PUBLIC_INDEXABLE` nicht gesetzt → noindex + robots Disallow. Live: `true` · KI-Crawler erlaubt (`app/robots.ts`) · `public/llms.txt`
OG-Bild `public/og/og-joana-kort-stressberatung.jpg`, Icons `public/icon.png`, `apple-icon.png`, `app/favicon.ico`

## Datenschutz
Kein Tracking, keine Cookies, keine Drittanbieter-Inhalte, Fonts lokal

## Deployment
Git push → Coolify (Dockerfile, Port 3000) → VPS · Env siehe `.env.example` (NEXT_PUBLIC_* sind Build-Variablen) · Volume `/app/data` für Anfragen
Repo `kortjannis-web/joana-kort-website` (Branch `main`)
