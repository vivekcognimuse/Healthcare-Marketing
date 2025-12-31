/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable Next.js image optimization for Firebase Hosting compatibility
  },
};

module.exports = nextConfig;

