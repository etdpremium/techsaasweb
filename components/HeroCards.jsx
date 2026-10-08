import {
  Bot, Send, X, Ellipsis, UserRound, Home, Users, Building2,
  CircleDollarSign, BarChart3, Settings, Filter, Handshake,
  ArrowUp, Zap, Globe, ShieldCheck,
} from 'lucide-react';

/*
 * HeroCards — tiga kartu hero sebagai HTML/CSS murni (tajam di semua ukuran,
 * menggantikan raster AI yang blur). Ukuran interior memakai cqw agar ikut
 * mengecil/membesar proporsional seperti gambar. Murni dekoratif.
 */

export function ChatCard() {
  return (
    <div className="hs-card hs-chat" aria-hidden="true">
      <div className="hsc-head">
        <span className="hsc-bot"><Bot size="62%" strokeWidth={2.2} /></span>
        <span className="hsc-title">AI ASSISTANT
          <i><b />Online</i>
        </span>
        <span className="hsc-tools"><Ellipsis size="70%" /><X size="70%" /></span>
      </div>
      <div className="hsc-out">How can I help you?</div>
      <div className="hsc-in">
        <span className="hsc-ava"><UserRound size="62%" /></span>
        <p>Hi! I can help you manage leads, follow-ups, and close more deals.</p>
      </div>
      <div className="hsc-input"><span>Type a message…</span><Send size="62%" /></div>
    </div>
  );
}

const RAIL = [Home, Users, Building2, CircleDollarSign, BarChart3, Settings];
const KPIS = [
  { ico: UserRound, label: 'New Leads', val: '1,230', c: 'blue' },
  { ico: Handshake, label: 'Won Deals', val: '385', c: 'green' },
  { ico: Filter, label: 'Conversion Rate', val: '31%', c: 'blue' },
  { ico: CircleDollarSign, label: 'Avg. Deal Value', val: '$6,350', c: 'green' },
];

export function CrmCard() {
  return (
    <div className="hs-card hs-crm" aria-hidden="true">
      <div className="hsm-rail">
        {RAIL.map((Ico, i) => (
          <span key={i} className={i === 0 ? 'on' : ''}><Ico size="62%" strokeWidth={2} /></span>
        ))}
      </div>
      <div className="hsm-main">
        <p className="hsm-label">CRM PERFORMANCE</p>
        <div className="hsm-top">
          <div className="hsm-sales">
            <span>Sales Overview</span>
            <b>$2.45M</b>
            <i>Total Sales</i>
            <svg viewBox="0 0 200 64" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="hsmFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#16A870" stopOpacity=".35" />
                  <stop offset="1" stopColor="#16A870" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,52 C18,50 26,40 40,42 C54,44 60,30 78,32 C96,34 102,38 118,28 C134,18 142,24 158,14 C174,5 188,8 200,4 L200,64 L0,64 Z" fill="url(#hsmFill)" />
              <path d="M0,52 C18,50 26,40 40,42 C54,44 60,30 78,32 C96,34 102,38 118,28 C134,18 142,24 158,14 C174,5 188,8 200,4" fill="none" stroke="#16A870" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="200" cy="4" r="3.5" fill="#16A870" />
            </svg>
          </div>
          <div className="hsm-goal">
            <svg viewBox="0 0 72 72" aria-hidden="true">
              <circle cx="36" cy="36" r="29" fill="none" stroke="#E3F2EA" strokeWidth="9" />
              <circle cx="36" cy="36" r="29" fill="none" stroke="#16A870" strokeWidth="9"
                strokeLinecap="round" strokeDasharray="123.8 182.2" transform="rotate(-90 36 36)" />
            </svg>
            <b>68%</b>
            <i>Goal Achieved</i>
            <em><ArrowUp size="70%" />+115% Growth</em>
          </div>
        </div>
        <div className="hsm-kpis">
          {KPIS.map((k) => (
            <div key={k.label} className="hsm-kpi">
              <span className={`hsm-ki ${k.c}`}><k.ico size="62%" strokeWidth={2} /></span>
              <span className="hsm-kl">{k.label}</span>
              <b className={k.c}>{k.val}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/*
 * WebCard — mockup browser menampilkan HOMEPAGE (halaman awal) sebuah
 * website 8 halaman: bilah URL + badge "8 halaman" + 8 titik (titik 1 aktif).
 */
export function WebCard() {
  return (
    <div className="hs-card hs-web" aria-hidden="true">
      <div className="hsw-browser">
        <div className="hsw-urlbar">
          <i /><i /><i />
          <span>bisnisanda.com</span>
          <b>8 halaman</b>
        </div>
        <div className="hsw-page">
          <div className="hsw-pnav">
            <b>UsahaAnda</b>
            <span>Home&ensp;Layanan&ensp;Harga&ensp;Kontak</span>
            <em>Mulai</em>
          </div>
          <div className="hsw-phero">
            <div className="hsw-pcopy">
              <strong>Tampil Profesional, Banjir Pelanggan</strong>
              <span>Website custom + CS otomatis untuk usaha Anda.</span>
              <em>Konsultasi Gratis</em>
            </div>
            <div className="hsw-pimg"><Globe size="55%" strokeWidth={1.6} /></div>
          </div>
          <div className="hsw-pserv">
            <span><Users size="58%" />Layanan</span>
            <span><Zap size="58%" />Cepat</span>
            <span><ShieldCheck size="58%" />Aman</span>
          </div>
        </div>
      </div>
      <div className="hsw-pages" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <i key={i} className={i === 0 ? 'on' : ''} />
        ))}
      </div>
    </div>
  );
}
