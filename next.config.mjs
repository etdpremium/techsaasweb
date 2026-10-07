/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimasi gambar aktif (WebP/AVIF + lazy). Picsum hanya sementara
  // sampai foto asli tiba — saat itu ganti remotePatterns ke domain sendiri.
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
  },
};
export default nextConfig;
