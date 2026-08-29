/**
 * Prerenders <App /> into dist/index.html so hero, services, and schema
 * are present for search and AI crawlers before JavaScript runs.
 */
import { writeFileSync, readFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import { sitemapXml } from '../src/schema'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

async function prerender() {
  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    const { render } = (await vite.ssrLoadModule('/src/entry-server.tsx')) as {
      render: () => string
    }
    const markup = render()
    const indexPath = resolve(dist, 'index.html')
    const html = readFileSync(indexPath, 'utf-8')

    if (!html.includes('<div id="root">')) {
      throw new Error('dist/index.html is missing <div id="root">')
    }

    const prerendered = html.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${markup}</div>`,
    )

    writeFileSync(indexPath, prerendered)
    writeFileSync(resolve(dist, 'sitemap.xml'), sitemapXml())

    const publicSitemap = resolve(root, 'public', 'sitemap.xml')
    mkdirSync(dirname(publicSitemap), { recursive: true })
    writeFileSync(publicSitemap, sitemapXml())

    const cname = resolve(root, 'CNAME')
    if (existsSync(cname)) {
      copyFileSync(cname, resolve(dist, 'CNAME'))
    }

    console.log('Prerendered index.html and wrote sitemap.xml')
  } finally {
    await vite.close()
  }
}

prerender().catch((error) => {
  console.error(error)
  process.exit(1)
})
