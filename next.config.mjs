/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/.well-known/walletconnect.txt',
        destination: '/api/walletconnect',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/swap',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
