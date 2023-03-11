/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['dev-qhl.s3.amazonaws.com'],
  },
};

module.exports = nextConfig;
