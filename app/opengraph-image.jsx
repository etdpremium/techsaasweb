import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// OG image bawaan situs (dipakai semua halaman tanpa gambar sendiri).
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#0F1B4C',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: -2 }}>TechSaaSWeb</div>
        <div style={{ fontSize: 34, marginTop: 18, color: '#BFDBFE' }}>
          Website Custom + CS AI Otomatis
        </div>
      </div>
    ),
    { ...size }
  );
}
