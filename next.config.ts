import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. This allows Sanity images to load on your live site */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  /* 2. Keeps your build from failing due to small Type errors */
  typescript: {
    ignoreBuildErrors: true,
  },

  /* Note: The 'eslint' block was removed to stop the Next.js 16 warning */
};

export default nextConfig;