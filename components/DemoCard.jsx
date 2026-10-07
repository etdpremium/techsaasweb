import Link from 'next/link';

// Kartu demo ala microns: thumb + tag niche + nama + deskripsi + pasangan metrik
const METRICS = {
  klinik: { a: ['47', 'Leads / month'], b: ['3 days', 'Launch time'] },
  properti: { a: ['32', 'Viewings booked'], b: ['3 days', 'Launch time'] },
  saas: { a: ['1.8s', 'Reply time'], b: ['7 days', 'Launch time'] },
  resto: { a: ['212', 'Reservations / mo'], b: ['5 days', 'Launch time'] },
  rental: { a: ['2AM', 'Deposits anytime'], b: ['5 days', 'Launch time'] },
  ecommerce: { a: ['1.1k', 'Orders / month'], b: ['10 days', 'Launch time'] },
};
const THUMB = {
  klinik: 'https://picsum.photos/seed/tsw-klinik/640/400',
  properti: 'https://picsum.photos/seed/tsw-properti/640/400',
  saas: 'https://picsum.photos/seed/tsw-saas/640/400',
  resto: 'https://picsum.photos/seed/tsw-resto/640/400',
  rental: 'https://picsum.photos/seed/tsw-rental/640/400',
  ecommerce: 'https://picsum.photos/seed/tsw-ecommerce/640/400',
};

export default function DemoCard({ demo }) {
  const m = METRICS[demo.slug] || { a: ['+38%', 'Leads / month'], b: ['7 days', 'Launch time'] };
  const thumb = THUMB[demo.slug] || `https://picsum.photos/seed/tsw-${demo.slug}/640/400`;
  return (
    <Link href={`/demos/${demo.slug}`} className="listing-card">
      <div className="thumb">
        <img src={thumb} alt={`${demo.niche} website demo — ${demo.name}`} width={640} height={400} loading="lazy" />
        <span className="tag">{demo.niche}</span>
      </div>
      <div className="body">
        <h3>{demo.name}</h3>
        <p className="desc">{demo.headline} — {demo.sub}</p>
        <div className="metric-pair">
          <div><b>{m.a[0]}</b><span>{m.a[1]}</span></div>
          <div><b>{m.b[0]}</b><span>{m.b[1]}</span></div>
        </div>
      </div>
    </Link>
  );
}
