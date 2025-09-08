/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    return [{ source: '/api/:path*', destination: 'http://backend:8000/:path*' }];
  },
};
module.exports = nextConfig;
