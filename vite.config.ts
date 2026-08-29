import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { seo, site } from './src/content'
import { jsonLdScriptTags } from './src/schema'

function seoHeadPlugin(): Plugin {
  return {
    name: 'seo-head',
    transformIndexHtml(html) {
      const og = `${site.url}${site.logo.og}`
      const tags = `
    <title>${seo.title}</title>
    <meta name="description" content="${seo.description}" />
    <meta name="keywords" content="${seo.keywords.join(', ')}" />
    <link rel="canonical" href="${site.url}/" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#14110E" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${site.locale}" />
    <meta property="og:site_name" content="${site.name}" />
    <meta property="og:title" content="${seo.title}" />
    <meta property="og:description" content="${seo.description}" />
    <meta property="og:url" content="${site.url}/" />
    <meta property="og:image" content="${og}" />
    <meta property="og:image:alt" content="${site.name} — workflow automation for deal-driven firms" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seo.title}" />
    <meta name="twitter:description" content="${seo.description}" />
    <meta name="twitter:image" content="${og}" />
    ${jsonLdScriptTags()}
`
      return html.replace('<!--seo-head-->', tags.trim())
    },
  }
}

export default defineConfig({
  plugins: [react(), seoHeadPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
