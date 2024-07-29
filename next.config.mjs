/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*', // The :path parameter is used here so will not be automatically passed in the query
      },
    ];
  },
};

export default nextConfig;
