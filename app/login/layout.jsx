export const metadata = {
  title: 'Masuk — TechSaaSWeb',
  description: 'Masuk ke dashboard TechSaaSWeb untuk mengelola website, pesanan, dan konten Anda.',
  robots: { index: false, follow: false },
};

// Kunci zoom (pinch-zoom) khusus halaman login.
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function LoginLayout({ children }) {
  return children;
}
