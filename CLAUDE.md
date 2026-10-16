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
Hauptangebot: persönliche Begleitung über 3 Monate (wöchentlich, 60 Min.) oder 6 Monate (alle 2 Wochen, 90 Min.)
Weitere Angebote: zu zweit/Gruppe, Online-Webinar (4 Wochen, Termine folgen, Warteliste), Online-Kurs (in Vorbereitung, Warteliste), Schulungen für Unternehmen
Ziel jeder Seite: kostenloses Erstgespräch (15 Min., Telefon oder Video) → `ERSTGESPRAECH` = `/erstgespraech/#anfrage`
Ton: Sie-Ansprache, Ich-Form von Joana, warm, klar, praktisch. Keine Heilversprechen, klare Abgrenzung zur Psychotherapie
Slogan/Konzept: "Stress verstehen. Stress bewältigen. Stress managen." Kernproblem: Lücke zwischen Wissen und Umsetzung
Briefing-Entscheidungen und offene Punkte: `docs/OFFENE-PUNKTE.md`

## Stammdaten / Inhalte
- Name, Kontakt, Region, Berufsbezeichnung (`ROLE`, Schalter `STUDIUM_ABGESCHLOSSEN`), Env-Schalter: `lib/site.ts`
- Angebote, Programme, drei Schwerpunkte, Ablauf, Formular-Interessen: `lib/content/angebote.ts` (eine Quelle für Nav, Karten, Schema, Formular)
- FAQ je Thema: `lib/content/faqs.ts` · Ratgeber: `lib/content/ratgeber.ts` (6 Artikel, Kurzantwort für GEO, Quellen) · Bewertungen: `lib/content/reviews.ts` (leer = Section + Hero-Badge ausgeblendet, nur echte Stimmen)
- Bilder: `lib/images.ts` (Materialien aus Joanas PDFs in `public/images/material`, `PORTRAIT` = null bis Fotos da sind)
- Rich-Text: `**fett**` und `[Text](/pfad/)` (`components/ui/Rich.tsx`) · Rechtstexte: `components/legal/*Content.tsx` (PRÜFEN-Kommentare)

## Design
Farben aus Joanas Materialien: Papier `#FBF8F3` · Espresso `#2A211B` (Marke, dunkle Flächen, Text, Skala `espresso-*`) · Karamell `#8F6A44` (Akzent, `caramel-*`) · Beige `stone` `#F5EDE3` · Greige `greige` `#E9E3DA` (Kontrastflächen) · Terrakotta `--color-cta` `#A9572B` (nur CTA, AA 5,1:1), Hover `#B8652F`, Skala `terra-*` · Apricot `terra-300` `#E8A877` (Kursiv-Akzent auf Dunkel)
Fonts: Playfair Display (`font-serif`/`font-display`, Kursiv als Akzent wie in den PDFs) · DM Sans (Text)
Typo-Utilities: `t-hero` `t-hero-sub` `t-h1` `t-h2` `t-h3` `t-lead` `t-label` · Container `wrap`/`wrap-wide` · Links `link` · Lesetext `prose-jk` · Körnung `grain` (dunkel) / `paper-grain` (hell)
Markenzeichen: eine Linie, die sich verknotet und ruhig ausläuft (`LogoMark`/`KNOT_PATH` in `components/layout/Logo.tsx`), groß im Hero (`components/ui/HeroLine.tsx`, Varianten home/mobile/page), zeichnet sich (`LogoDraw`, Intro)
Seitenaufbau (wie Vorlage): `PageHero` (Espresso ohne Foto, Linie, warmes Licht; optional `aside` mit Papierstapel, `tone="mocha"` für Abwechslung) + direkt danach `<Sheet crumbs>` mit dem gesamten Inhalt (schiebt sich über den stehenden Hero via `StackBack`). Footer = dunkles Sheet mit Schluss-CTA (`FooterCta`, Text je Pfad)
Startseite: Hero (Slogan als Titel, Erstgespräch-Karte rechts ab Desktop, mobil im Sheet) → Vertrauensleiste (`TrustBar` + `TrustScene` Linien-Animationen) → Bewertungen (wenn vorhanden) → "Kennen Sie das?" (`Situation`, `GapScene`: Brücke über die Lücke) → "Die Antwort" (Espresso, StackBack) + drei Schwerpunkte als Sheet darüber (`Pillars`, versetzt mit gestrichelter Treppe) → Angebot (`Offer`) → Ablauf (`Process`) → Werkzeuge (`Tools`, `PaperStack`) → Über mich + Region (`AboutArea`, `AreaMap` Umkreis 20 km) → FAQ
Effekte (`globals.css`): `lift-tile`, `lift-warm`, `glow-icon`, `step-dot`, `loop-card`, `frame`/`frame-soft`, `floaty`/`floaty-lg`, `paper` (Papierstapel fächert beim Hover), `breathe`, `.gap-scene`, `.area-map`, `.pillar-line` (InView: `data-view`)
Header (wie Vorlage): transparent über dem Hero, Glas-Pille Navigation + E-Mail-Knopf, CTA "Erstgespräch" ab Desktop nach dem Hero, Handy: Pille fährt beim Runterscrollen "Erstgespräch" aus dem Menü-Kreis · Schwebender Knopf unten rechts nach dem Hero: `QuickContact` (Fenster mit Erstgespräch + E-Mail)
Robustheit ohne JS: `StackBack` erst per JS sticky, `Reveal` blendet ohne Hydrierung nach 3 s ein, alle Animationen zeigen ohne JS/bei reduzierter Bewegung das fertige Bild

## Seiten
`/` · `/angebote/` · `/stresscoaching/` · `/zu-zweit-und-in-der-gruppe/` · `/webinar/` · `/online-kurs/` · `/stressmanagement-unternehmen/` (gemeinsames Layout `components/angebote/OfferLayout.tsx`) · `/mein-ansatz/` · `/joana-kort/` · `/erstgespraech/` · `/stressberatung-gummersbach/` · `/stressberatung-online/` · `/haeufige-fragen/` · `/ratgeber/` (+`[slug]`) · `/impressum/` `/datenschutz/`
Neue Seite: `pageMeta()` aus `lib/seo.ts` + `app/sitemap.ts` + ggf. Nav (`components/layout/nav.ts`) und Footer · Querverlinkung: `MoreOffers` am Ende jeder Angebotsseite

## Formulare
Erstgespräch: `components/funnel/ErstgespraechFunnel.tsx` (Interesse → Gesprächsform → Über Sie optional → Kontakt → Bestätigung), Vorauswahl über `?interesse=` oder `preset`. Startseite: zwei Instanzen (Desktop im Hero `jkh`, mobil im Sheet `jk`, `data-funnel-anchor`, Hero-CTA löst `jk:funnel-call` aus)
Warteliste: `components/forms/WartelisteForm.tsx` · API: `app/api/anfrage` (typ erstgespraech/kontakt/warteliste, Rate-Limit 5/h/IP, Honeypot, JSONL in `DATA_DIR`, Mail an Joana + Bestätigung)
Datensparsam: keine Gesundheitsfragen, kein Geburtsdatum (nur freiwillige Altersgruppe)

## SEO / GEO
Schema `lib/schema.ts`: ProfessionalService + Person + WebSite global, Service/FAQPage/Breadcrumb/BlogPosting/ItemList je Seite. Keine eigenen Sterne
Vorschau: `NEXT_PUBLIC_INDEXABLE` nicht gesetzt → noindex + robots Disallow. Live: `true` · KI-Crawler erlaubt (`app/robots.ts`) · `public/llms.txt`
OG-Bild `public/og/og-joana-kort-stressberatung.jpg`, Icons `public/icon.png`, `apple-icon.png`, `app/favicon.ico`

## Datenschutz
Kein Tracking, keine Cookies, keine Drittanbieter-Inhalte, Fonts lokal

## Deployment
Git push → Coolify (Dockerfile, Port 3000) → VPS · Env siehe `.env.example` (NEXT_PUBLIC_* sind Build-Variablen) · Volume `/app/data` für Anfragen
Repo `kortjannis-web/joana-kort-website` (Branch `main`)
