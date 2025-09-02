import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour le déploiement sur Render
  output: "standalone",
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  },
};

export default nextConfig;
