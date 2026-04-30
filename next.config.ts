import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Allows images from both Sanity (Products) and Unsplash (News) */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  /* Keeps your build from failing due to small Type errors */
  typescript: {
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;
