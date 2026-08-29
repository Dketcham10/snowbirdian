import { faqs, seo, services, site } from './content'

const absolute = (path: string) =>
  path.startsWith('http') ? path : `${site.url}${path.startsWith('/') ? '' : '/'}${path}`

export const professionalServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: absolute(site.logo.src),
  image: absolute(site.logo.og),
  description: seo.description,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Scottsdale',
    addressRegion: 'AZ',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  knowsAbout: [
    'Real Estate',
    'Commercial Real Estate',
    'Construction',
    'Real Estate Investment',
    'Insurance',
    'Mortgage Lending',
  ],
  slogan: 'Workflow automation and AI agents for deal-driven firms.',
}

export const serviceLdList = services.map((service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.summary,
  provider: {
    '@type': 'ProfessionalService',
    name: site.name,
    url: site.url,
  },
  url: `${site.url}/#services`,
  audience: service.audiences.map((name) => ({
    '@type': 'Audience',
    audienceType: name,
  })),
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
}))

export const faqPageLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export const jsonLdGraphs = [professionalServiceLd, ...serviceLdList, faqPageLd]

export function jsonLdScriptTags(): string {
  return jsonLdGraphs
    .map(
      (graph) =>
        `<script type="application/ld+json">${JSON.stringify(graph)}</script>`,
    )
    .join('\n    ')
}

export function sitemapXml(): string {
  const lastmod = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site.url}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
}
