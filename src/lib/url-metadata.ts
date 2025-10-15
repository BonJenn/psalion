import { JSDOM } from 'jsdom'

export interface UrlMetadata {
  title?: string
  description?: string
  image?: string
  siteName?: string
  publishedTime?: string
  favicon?: string
}

export async function fetchUrlMetadata(url: string): Promise<UrlMetadata> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PsalionBot/1.0)',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document
    
    const metadata: UrlMetadata = {
      title: document.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
             document.querySelector('title')?.textContent ||
             '',
      description: document.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                  document.querySelector('meta[name="description"]')?.getAttribute('content') ||
                  '',
      image: document.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
             document.querySelector('meta[name="twitter:image"]')?.getAttribute('content') ||
             '',
      siteName: document.querySelector('meta[property="og:site_name"]')?.getAttribute('content') ||
               document.querySelector('meta[name="application-name"]')?.getAttribute('content') ||
               new URL(url).hostname.replace('www.', ''),
      publishedTime: document.querySelector('meta[property="article:published_time"]')?.getAttribute('content') ||
                    document.querySelector('meta[name="date"]')?.getAttribute('content') ||
                    '',
      favicon: document.querySelector('link[rel="icon"]')?.getAttribute('href') ||
              document.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') ||
              `https://${new URL(url).hostname}/favicon.ico`
    }
    
    return metadata
  } catch (error) {
    console.error('Error fetching URL metadata:', error)
    throw new Error('Failed to fetch article metadata')
  }
}

export async function getPublisherLogoFromUrl(url: string): Promise<string | null> {
  try {
    const metadata = await fetchUrlMetadata(url)
    return metadata.favicon || metadata.image || null
  } catch (error) {
    console.error('Error getting publisher logo:', error)
    return null
  }
}
