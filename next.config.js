/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Enable the app directory
  },
  eslint: {
      ignoreDuringBuilds: true,
  },
  images: {
      domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;