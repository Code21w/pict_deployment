/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth/register',
        destination: `http://localhost:3000/auth/register`,
      },
    ];
  },
};

export default nextConfig;
