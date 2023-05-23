/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


module.exports = {
  async rewrites() {
    return [
      {
        source: '/mongodb/:path/:param*',
        destination: 'http://localhost:8000/mongodb/:path*',
      },
    ];
  },
};