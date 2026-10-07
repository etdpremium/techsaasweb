// robots.txt — https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt
// Catatan: robots.txt hanya mencegah *crawl*, bukan *index*.
// Halaman privat juga dilindungi noindex di metadata masing-masing.
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/login', '/api/'],
      },
      // AI crawlers eksplisit diizinkan (konten untuk dikutip jawaban AI).
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
    sitemap: 'https://techsaasweb.com/sitemap.xml',
    host: 'https://techsaasweb.com',
  };
}
