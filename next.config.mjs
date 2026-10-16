/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  // Je Build eindeutig: Ist nach einem Deploy noch eine alte Seite offen, lädt Next beim nächsten Klick neu, statt mit fehlenden Skripten abzustürzen
  deploymentId: process.env.SOURCE_COMMIT || `build-${Date.now()}`,
  experimental: {
    inlineCss: true,
  },

  // Entwicklung: gespeicherte Anfragen in data/ sollen keinen Neuaufbau auslösen
  webpack(config, { dev }) {
    if (dev) config.watchOptions = { ...config.watchOptions, ignored: ['**/node_modules/**', '**/data/**', '**/.git/**'] }
    return config
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },

  /** Naheliegende Adressen auf die echten Seiten (Links aus Signaturen, Visitenkarten, Profilen) */
  async redirects() {
    return [
      { source: '/kontakt', destination: '/erstgespraech/', permanent: true },
      { source: '/ueber-mich', destination: '/joana-kort/', permanent: true },
      { source: '/leistungen', destination: '/angebote/', permanent: true },
      { source: '/stressberatung', destination: '/stresscoaching/', permanent: true },
      { source: '/schulungen', destination: '/stressmanagement-unternehmen/', permanent: true },
      { source: '/faq', destination: '/haeufige-fragen/', permanent: true },
    ]
  },
}

export default nextConfig
