import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { RouteScroll } from '@/components/layout/RouteScroll'
import { QuickContactProvider } from '@/components/layout/QuickContact'
import { ToTop } from '@/components/layout/ToTop'
import { JsonLd } from '@/components/ui/JsonLd'
import { StackBack } from '@/components/ui/Stack'
import { organizationSchema } from '@/lib/schema'
import { INDEXABLE, SITE_URL, site } from '@/lib/site'
import { OG_DEFAULT } from '@/lib/seo'
import './globals.css'

// Playfair Display (SIL OFL), variabel, Latin-Subset, wie in Joanas Materialien: Überschriften, Zitate, Kursiv-Akzente
const playfair = localFont({
  src: [
    { path: './fonts/playfair-latin-normal.woff2', weight: '400 900', style: 'normal' },
    { path: './fonts/playfair-latin-italic.woff2', weight: '400 900', style: 'italic' },
  ],
  variable: '--font-playfair',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
})

// DM Sans (SIL OFL), variabel: Fließtext, Labels, Formulare
const dmsans = localFont({
  src: [{ path: './fonts/dmsans-latin-normal.woff2', weight: '100 1000', style: 'normal' }],
  variable: '--font-dmsans',
  display: 'swap',
  adjustFontFallback: 'Arial',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Stressberatung & Stresscoaching Gummersbach und online | Joana Kort',
    template: '%s | Joana Kort Stressberatung',
  },
  description:
    'Stress verstehen, bewältigen und managen: persönliche Stressberatung und Stresscoaching in Gummersbach und online. Kostenloses Erstgespräch, 15 Minuten.',
  applicationName: site.name,
  authors: [{ name: site.owner, url: `${SITE_URL}/joana-kort/` }],
  creator: site.owner,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { type: 'website', locale: 'de_DE', siteName: site.name, images: [OG_DEFAULT] },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '512x512' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } } : {}),
}

export const viewport: Viewport = {
  themeColor: '#2a211b',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${playfair.variable} ${dmsans.variable}`}>
      <body>
        <JsonLd data={organizationSchema()} />
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-espresso-800 focus:px-5 focus:py-3 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <QuickContactProvider>
          <Header />
          {/* Seite steht am Ende, der Footer (Sheet) schiebt sich darüber */}
          <StackBack as="main" id="inhalt" className="bg-paper">
            {children}
          </StackBack>
          <Footer />
          <ToTop />
          {/* Nach der Seite im Baum: korrigiert die Scrollposition nach dem Scroll von Next (Hero bzw. Anker) */}
          <RouteScroll />
        </QuickContactProvider>
      </body>
    </html>
  )
}
