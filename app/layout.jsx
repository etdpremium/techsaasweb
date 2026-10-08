import './globals.css';
import ChatWidget from '../components/ChatWidget';
import ScrollTop from '../components/ScrollTop';
import PageGlow from '../components/PageGlow';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JsonLd from '../components/JsonLd';
import { Plus_Jakarta_Sans } from 'next/font/google';

const body = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-body' });
const head = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-head', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://techsaasweb.com'),
  title: {
    default: 'Jasa Pembuatan Website Profesional + CS AI Otomatis — TechSaaSWeb',
    template: '%s | TechSaaSWeb',
  },
  description:
    'Website custom dan CS AI otomatis yang kami buatkan untuk usaha Anda. Domain, hosting, dan SSL sudah termasuk, online 3–14 hari.',
  keywords: [
    'jasa pembuatan website', 'website bisnis', 'website UMKM', 'domain .com', 'domain .id',
    'CS AI website', 'asisten CS otomatis', 'booking otomatis', 'toko online',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', siteName: 'TechSaaSWeb', locale: 'id_ID',
    title: 'Jasa Pembuatan Website Profesional + CS AI Otomatis — TechSaaSWeb',
    description: 'Website custom dan CS AI otomatis yang kami buatkan untuk usaha Anda. Domain, hosting, dan SSL sudah termasuk.',
    images: ['/logo-biru-tua.svg'],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'TechSaaSWeb',
  url: 'https://techsaasweb.com',
  description: 'Jasa pembuatan website custom dan CS AI otomatis untuk UMKM Indonesia.',
  areaServed: 'Indonesia',
  priceRange: 'Rp 1.200.000+/tahun',
  // TODO: isi sameAs dengan profil yang benar-benar dimiliki — ini sinyal
  // entitas paling berdampak untuk AI answer engines (audit docs/10).
  sameAs: [
    'https://wa.me/6285113294575',
  ],
};

const SITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TechSaaSWeb',
  url: 'https://techsaasweb.com',
  inLanguage: 'id',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${body.variable} ${head.variable}`}>
      <body style={{ fontFamily: 'var(--font-body), "Plus Jakarta Sans", system-ui, sans-serif' }}>
        <JsonLd data={ORG_JSONLD} />
        <JsonLd data={SITE_JSONLD} />
        <Navbar />
        <ScrollTop />
        <PageGlow />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
