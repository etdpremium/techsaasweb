import Image from 'next/image';
import { ChatCard, CrmCard, WebCard } from './HeroCards';

/*
 * HeroArt — komposisi hero berlapis:
 *
 *   belakang → .hs-floor (bayangan lantai)
 *   tengah   → wanita (WebP transparan, bottom-anchored, fade-mask bawah)
 *   depan    → 3 kartu HTML/CSS (ChatCard, CrmCard, WebCard — tajam vektor,
 *              animasi float, murni dekoratif aria-hidden)
 *
 * Wanita: 900x907. Kartu memakai cqw agar proporsional di semua ukuran.
 */
export default function HeroArt() {
  return (
    <div className="hero-stage">
      <div className="hs-blob" aria-hidden="true" />
      <div className="hs-floor" aria-hidden="true" />
      <Image
        src="/hero/woman.webp"
        alt="Wanita tersenyum menunjuk mockup website TechSaasWeb"
        width={900}
        height={907}
        priority
        sizes="(max-width: 768px) 80vw, (max-width: 1100px) 46vw, 520px"
        className="hs-woman"
      />
      <ChatCard />
      <CrmCard />
      <span className="hs-webwrap" aria-hidden="true">
        <WebCard />
      </span>
    </div>
  );
}
