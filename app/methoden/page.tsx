import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Coffee,
  ListOrdered,
  Map as MapIcon,
  MessageSquareQuote,
  NotebookPen,
  Repeat,
  Wind,
} from 'lucide-react'
import { PageHero } from '@/components/ui/PageHero'
import { Sheet } from '@/components/ui/Sheet'
import { ButtonLink } from '@/components/ui/Button'
import { CtaRow } from '@/components/ui/CtaRow'
import { JsonLd } from '@/components/ui/JsonLd'
import { More } from '@/components/ui/More'
import { PaperStack } from '@/components/ui/PaperStack'
import { Reveal } from '@/components/ui/Reveal'
import { CheckList } from '@/components/lists/CheckList'
import { MethodGroup, type Methode } from '@/components/methoden/MethodGroup'
import { serviceSchema } from '@/lib/schema'
import { pageMeta } from '@/lib/seo'
import { CTA_LABEL, ERSTGESPRAECH } from '@/lib/site'
import { InfoNote } from '@/components/ui/OpenBlock'

const PATH = '/methoden/'

export const metadata = pageMeta({
  title: 'Methoden und Werkzeuge im Stresscoaching | Joana Kort',
  description:
    'Wochenplaner, Stresslandkarte, Atemtechniken, Prioritäten und Routinen: So sieht die praktische Arbeit aus. Individuell ausgewählt, keine Lösung für alle.',
  path: PATH,
})

/** Zentrale Botschaft: drei Punkte (Dreiergruppe) */
const AUSWAHL = [
  'Ich schaue zuerst auf Ihren Alltag, Ihre Belastungen und das, was Ihnen schon hilft.',
  'Wir probieren Methoden gemeinsam aus und behalten nur, was bei Ihnen wirklich wirkt.',
  'Was nicht passt, lassen wir weg. Lieber zwei Werkzeuge, die Sie nutzen, als zehn, die liegen bleiben.',
]

const VERSTEHEN: Methode[] = [
  {
    title: 'Stresstagebuch',
    text: 'Vier Wochen lang Situation, Auslöser, Stresslevel von 0 bis 10 und Ihre Reaktion festhalten. So wird sichtbar, was vorher nur ein Gefühl war.',
    more: 'Am Ende jeder Woche und nach vier Wochen schauen wir gemeinsam zurück: Welche Auslöser kommen am häufigsten vor? Zu welchen Zeiten wird es eng? Was hat schon geholfen? Daraus leiten wir die nächsten Schritte ab.',
    Icon: NotebookPen,
  },
  {
    title: 'Stresslandkarte',
    text: 'Wo entsteht Ihr Stress: im Beruf, in der Familie, im Haushalt, durch eigene Ansprüche? Und wo tanken Sie Kraft? Alles auf einen Blick.',
    more: 'Die Stresslandkarte zeigt Belastungen und Entlastungen nebeneinander. Oft wird dabei klar, dass nicht ein großes Thema drückt, sondern viele kleine zusammen. Genau dort setzen wir an.',
    Icon: MapIcon,
  },
  {
    title: 'Ihre persönlichen Stresssignale',
    text: 'Wie zeigt sich Stress bei Ihnen, im Körper, in den Gedanken, im Verhalten? Wer seine Signale früh erkennt, kann früh gegensteuern.',
    more: 'Manche merken Stress zuerst im Nacken, andere daran, dass sie gereizt reagieren oder nachts grübeln. Wir sammeln Ihre persönlichen Frühwarnzeichen, damit Sie nicht erst handeln, wenn gar nichts mehr geht.',
    Icon: Activity,
  },
]

const BEWAELTIGEN: Methode[] = [
  {
    title: 'Atem- und Entspannungstechniken',
    text: 'Für akute Momente: kurze Übungen, die Sie unauffällig überall anwenden können, vor einem schwierigen Gespräch oder an der Kasse.',
    more: 'Welche Technik passt, ist sehr individuell. Für die eine ist ruhiges, verlängertes Ausatmen ideal, für den anderen eine kurze Muskelentspannung. Wir üben so lange, bis Sie die Übung auch dann abrufen können, wenn es hektisch wird.',
    Icon: Wind,
  },
  {
    title: 'Gedanken prüfen und umformulieren',
    text: 'Sätze wie "Ich muss alles perfekt schaffen" verstärken Stress. Wir schauen sie gemeinsam an und finden Formulierungen, die Sie entlasten.',
    more: 'Aus "Ich muss alles schaffen" kann zum Beispiel werden: "Diese Woche reicht das Wichtigste." Es geht nicht um positives Denken auf Knopfdruck, sondern um einen realistischen, freundlicheren Blick auf die eigene Situation.',
    Icon: MessageSquareQuote,
  },
  {
    title: 'Pausen, die wirklich erholen',
    text: 'Kurze Erholungsinseln im Tag, die zu Ihrem Rhythmus passen. Nicht noch eine Aufgabe, sondern ein Moment, der Ihnen gehört.',
    more: 'Fünf Minuten an der frischen Luft, eine Tasse Tee ohne Bildschirm, ein kurzer Übergang zwischen Arbeit und Familie: Wir finden heraus, welche Pausen Ihnen guttun und wo sie realistisch in Ihren Tag passen.',
    Icon: Coffee,
  },
]

const MANAGEN: Methode[] = [
  {
    title: 'Wochen- und Zeitplaner',
    text: 'Termine, Aufgaben und feste Zeitfenster für das, was Ihnen wichtig ist, übersichtlich auf einer Seite. Mit Luft für das Unerwartete.',
    more: 'Der Wochenfokus hilft, sich auf ein Wochenziel zu konzentrieren statt auf zehn Baustellen. Auf Wunsch erstelle ich Ihren Planer nach Ihren Angaben, damit Sie direkt starten können.',
    Icon: CalendarDays,
  },
  {
    title: 'Tagespläne und Routinen',
    text: 'Feste Abläufe für Morgen und Abend nehmen Ihnen viele kleine Entscheidungen ab. Dazu ein Minimum für Tage, an denen wenig geht.',
    more: 'Routinen strukturieren den Alltag und sparen Kraft. Wichtig ist, dass sie klein anfangen. Für schwere Tage gibt es eine Minimalversion, und was ausfällt, wird nicht nachgeholt.',
    Icon: Repeat,
  },
  {
    title: 'Aufgaben priorisieren',
    text: 'Was ist wirklich wichtig, was kann warten, was darf jemand anderes übernehmen, und was kann ganz weg? Weniger, aber das Richtige.',
    more: 'Wir sortieren Ihre Aufgaben gemeinsam nach Dringlichkeit und Wichtigkeit und schauen, welche Verantwortung Sie abgeben oder vereinfachen können, im Beruf ebenso wie in der Familie.',
    Icon: ListOrdered,
  },
]

export default function MethodenPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: 'Methoden und Werkzeuge im Stresscoaching',
          description:
            'Individuell ausgewählte Methoden zur Stressbewältigung und Alltagsorganisation: Stresstagebuch, Stresslandkarte, Atem- und Entspannungstechniken, Gedanken prüfen, Wochen- und Tagespläne, Routinen und Priorisierung.',
          path: PATH,
        })}
      />
      <PageHero
        eyebrow="Methoden und Werkzeuge"
        title={
          <>
            Keine Lösung für alle, sondern <span className="text-caramel-600">Ihre</span> Werkzeuge
          </>
        }
        intro={
          <p>
            Ein Einblick in die praktische Arbeit: Pläne, Übungen und Materialien, die Sie im Alltag wirklich nutzen. Welche davon wir einsetzen,
            entscheiden wir gemeinsam, passend zu Ihnen.
          </p>
        }
        actions={
          <>
            <ButtonLink href={ERSTGESPRAECH} variant="primary" size="lg" className="w-full sm:w-auto">
              {CTA_LABEL}
            </ButtonLink>
            <ButtonLink href="#verstehen" variant="outline" size="lg" className="w-full sm:w-auto">
              Methoden ansehen
            </ButtonLink>
          </>
        }
        aside={<PaperStack layout="hero" priority className="mx-auto w-[92%]" />}
      />

      <Sheet crumbs={[{ name: 'Methoden und Werkzeuge', path: PATH }]}>
        {/* Zentrale Botschaft: individuell statt Einheitslösung */}
        <section aria-labelledby="individuell" className="sec-b pt-[clamp(1.5rem,3svh,2.5rem)]">
          <div className="wrap grid gap-[var(--sec-gap)] lg:grid-cols-12 lg:items-center lg:gap-x-12 xl:gap-x-16">
            <Reveal className="lg:col-span-5">
              <p className="t-label text-bordeaux">Individuell statt Einheitslösung</p>
              <h2 id="individuell" className="t-h2 mt-3 text-espresso-900">
                Nicht jede Person bekommt <span className="text-caramel-600">dieselben</span> Methoden
              </h2>
              <p className="t-lead mt-[clamp(0.75rem,2svh,1.25rem)] text-muted max-md:text-[0.9375rem] max-md:leading-relaxed">
                Jeder Mensch erlebt Stress anders. Was der einen hilft, stresst den anderen zusätzlich. Deshalb gibt es bei mir kein festes
                Programm, sondern eine Auswahl, die zu Ihrem Leben passt.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="rounded-lg bg-stone p-5 md:p-[clamp(1.5rem,4svh,2.25rem)] lg:col-span-7">
              <h3 className="text-[1.125rem] font-semibold text-espresso-900 md:text-[1.25rem]">So wähle ich Methoden mit Ihnen aus</h3>
              <CheckList
                items={AUSWAHL}
                className="mt-[clamp(0.75rem,2svh,1.25rem)] space-y-[clamp(0.5rem,1.5svh,0.875rem)] text-[0.9375rem] md:text-[1.0625rem]"
                itemClassName="border-b border-line pb-[clamp(0.5rem,1.5svh,0.875rem)] last:border-0 last:pb-0"
              />
            </Reveal>
          </div>
        </section>

        <MethodGroup
          id="verstehen"
          nr={1}
          step="Stress verstehen"
          tone="stone"
          title={
            <>
              Sichtbar machen, <span className="text-caramel-600">wo</span> Ihr Stress entsteht
            </>
          }
          intro="Bevor wir etwas verändern, schauen wir genau hin. Diese Werkzeuge helfen, Auslöser, Muster und Ihre persönlichen Signale zu erkennen."
          items={VERSTEHEN}
        />

        <MethodGroup
          id="bewaeltigen"
          nr={2}
          step="Stress bewältigen"
          title={
            <>
              Was Ihnen hilft, wenn es <span className="text-caramel-600">eng</span> wird
            </>
          }
          intro="Für akute Momente brauchen Sie Methoden, die schnell greifen und zu Ihnen passen. Wir probieren aus, üben und behalten, was wirkt."
          items={BEWAELTIGEN}
        />

        <MethodGroup
          id="managen"
          nr={3}
          step="Stress managen"
          tone="greige"
          title={
            <>
              Den Alltag so gestalten, dass <span className="text-caramel-600">weniger</span> Stress entsteht
            </>
          }
          intro="Struktur entlastet. Mit Plänen, Routinen und klaren Prioritäten wird Ihr Alltag übersichtlicher, ohne dass Sie noch mehr leisten müssen."
          items={MANAGEN}
        />

        {/* Beispiel aus der Praxis: Essensplan (Briefing) + Materialien */}
        <section aria-labelledby="essensplan" className="grain sec overflow-hidden bg-espresso-800 text-white xl:flex xl:min-h-svh xl:items-center">
          <div className="wrap grid items-center gap-[var(--sec-gap)] lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            <Reveal className="lg:col-span-6">
              <p className="t-label text-caramel-300">Ein Beispiel aus der Praxis</p>
              <h2 id="essensplan" className="t-h2 mt-3 text-white">
                Ich nehme Ihnen auch <span className="text-caramel-300">Arbeit</span> ab
              </h2>
              <p className="t-lead mt-[clamp(0.5rem,2svh,1.25rem)] text-espresso-100/90 max-md:text-[0.9375rem] max-md:leading-relaxed">
                Keine reine Wissensvermittlung: Innerhalb der Begleitung erstelle ich auf Wunsch konkrete Pläne für Sie. Zum Beispiel einen
                Essensplan.
              </p>
              <ol className="mt-[clamp(0.75rem,3svh,1.75rem)] divide-y divide-white/12 border-y border-white/12">
                {[
                  ['Sie erzählen', 'Ihre Lieblingsgerichte, was in der Familie gut ankommt und wie viel Zeit Sie unter der Woche zum Kochen haben.'],
                  ['Ich erstelle', 'Einen Wochenplan mit passenden Gerichten und der Einkaufsliste dazu. Eine tägliche Entscheidung weniger.'],
                  ['Wir passen an', 'Was nicht funktioniert, ändern wir. So entsteht ein Plan, der wirklich zu Ihrem Alltag passt.'],
                ].map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[2.25rem_1fr] gap-x-3 py-[clamp(0.5rem,1.6svh,1rem)] sm:grid-cols-[2.25rem_9rem_1fr] sm:gap-x-5">
                    <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-md border border-white/20 text-[0.875rem] font-semibold text-caramel-200">
                      {i + 1}
                    </span>
                    <span className="self-center font-semibold text-white">{t}</span>
                    <span className="col-start-2 text-[0.875rem] leading-snug text-espresso-100/85 max-md:hidden sm:col-start-3 md:text-[0.9375rem] md:leading-relaxed">{d}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-[clamp(0.5rem,2svh,1.25rem)] text-[0.875rem] leading-relaxed text-espresso-200 max-md:hidden lowdesk:hidden lowtab:hidden">
                Genauso entstehen Haushaltspläne, Lernpläne oder ein Wochenplan für die ganze Familie.
              </p>
              <CtaRow tone="dark" className="mt-[clamp(1rem,3svh,2rem)]" />
            </Reveal>
            <Reveal delay={0.1} className="mx-auto w-full max-w-[min(36rem,calc(19svh*1.11))] max-lg:order-first md:max-w-[min(36rem,calc(30svh*1.11))] lg:col-span-6 lg:max-w-[min(100%,calc((100svh-2*var(--sec-y))*1.05))]">
              <PaperStack layout="planer" />
            </Reveal>
          </div>
        </section>

        {/* Abgrenzung */}
        <section aria-label="Hinweis zu den Methoden" className="sec-t">
          <div className="wrap">
            <Reveal>
              <InfoNote kicker="Abgrenzung" title="Praktische Werkzeuge, keine Therapie">
                <p>
                  Die Methoden unterstützen Sie im Umgang mit alltäglichem Stress. Sie sind keine Psychotherapie und keine Heilbehandlung. Bei
                  anhaltenden Beschwerden ist Ihre Hausarztpraxis die richtige erste Adresse.{' '}
                  <Link href="/ratgeber/stressberatung-coaching-oder-therapie/" className="link">
                    Mehr zur Abgrenzung
                  </Link>
                </p>
              </InfoNote>
            </Reveal>
          </div>
        </section>

        {/* Weiter: Ablauf, Begleitung, Qualifikationen */}
        <section aria-labelledby="weiter" className="sec-t pb-[calc(var(--sec-y)+var(--sheet-overlap))]">
          <div className="wrap">
            <Reveal>
              <h2 id="weiter" className="t-h2 text-espresso-900">
                Wie geht es weiter?
              </h2>
              <More label="Wann welche Methode zum Einsatz kommt" showLabel className="mt-2" bodyClassName="max-w-[44rem] text-[0.9375rem] leading-relaxed text-muted">
                In der persönlichen Begleitung folgen die Methoden den drei Schritten: Zuerst verstehen wir Ihren Stress, dann finden wir Wege, ihn
                zu bewältigen, und zum Schluss gestalten wir Ihren Alltag so, dass weniger Stress entsteht. Welche Werkzeuge wir in welcher Phase
                nutzen und wie viel Raum sie bekommen, legen wir in Ihrem persönlichen Unterstützungsplan fest.
              </More>
            </Reveal>
            <Reveal delay={0.08} className="mt-[var(--sec-gap)] grid gap-3 md:grid-cols-3 md:gap-5">
              {[
                { href: '/ablauf/', title: 'So läuft die Zusammenarbeit ab', text: 'Vom Erstgespräch bis zur Umsetzung im Alltag, mit Beispiel.' },
                { href: '/stresscoaching/', title: 'Persönliche Begleitung', text: 'Über drei oder sechs Monate, online oder vor Ort.' },
                { href: '/qualifikationen-und-referenzen/', title: 'Qualifikationen und Referenzen', text: 'Mein fachlicher Hintergrund, transparent erklärt.' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="group floaty flex h-full items-start justify-between gap-4 rounded-lg border border-line bg-white p-5 transition-colors duration-500 hover:border-caramel-500">
                  <span>
                    <span className="block font-semibold text-espresso-900">{l.title}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-snug text-muted">{l.text}</span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-caramel-700 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      </Sheet>
    </>
  )
}
