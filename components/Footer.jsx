'use client';
import { usePathname } from 'next/navigation';
import { juta } from '../lib/format';
import { tiers, TERMS } from '../lib/pricing';

export default function Footer() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith('/login')) return null;

  return (
    <footer>
      <div className="footer-grid">
        <div>
          <p className="footer-brand">TechSaaSWeb</p>
          <p>Website custom dan CS AI otomatis yang kami buatkan untuk usaha Anda. Domain dan pembuatan sudah termasuk, online 3–14 hari.</p>
          <div className="footer-social">
            <a href="#" aria-label="X">𝕏</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href={`https://wa.me/${TERMS.waNumber}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a>
          </div>
        </div>
        <div>
          <p className="footer-h">Layanan</p>
          <a href="/services">Website custom</a>
          <a href="/services">CS AI otomatis</a>
          <a href="/dashboard">Panel pemilik</a>
          <a href="/services">Booking otomatis</a>
          <a href="/jasa-website">Jasa pembuatan website</a>
        </div>
        <div>
          <p className="footer-h">Bandingkan</p>
          <a href="/pricing">Harga paket</a>
          <a href="/pricing">Starter & Business</a>
          <a href="/pricing">Automation custom</a>
        </div>
        <div>
          <p className="footer-h">Contoh website</p>
          <a href="/demos/klinik">Klinik gigi</a>
          <a href="/demos/properti">Properti</a>
          <a href="/demos/resto">Restoran</a>
          <a href="/demos/ecommerce">Toko online</a>
        </div>
        <div>
          <p className="footer-h">Paket</p>
          <a href="/pricing">Starter {juta(tiers[0].price)}</a>
          <a href="/pricing">Business {juta(tiers[1].price)}</a>
          <a href="/pricing">Automation hubungi kami</a>
          <a href="/booking">Pemesanan</a>
        </div>
        <div>
          <p className="footer-h">Company</p>
          <a href="/blog">Blog</a>
          <a href="/login">Log in</a>
          <a href="/booking">Get started</a>
        </div>
      </div>
      <div className="footer-crisp">
        © {new Date().getFullYear()} TechSaaSWeb
      </div>
    </footer>
  );
}
