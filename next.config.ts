import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing.html',
        permanent: false, // This ensures you see the landing page first
      },
    ];
  },
};

export default nextConfig;