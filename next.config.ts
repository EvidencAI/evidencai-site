import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  async redirects() {
    return [
      // /formation → /formations (ancien slug)
      {
        source: '/:locale/formation',
        destination: '/:locale/formations',
        permanent: true,
      },
      {
        source: '/formation',
        destination: '/fr/formations',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
