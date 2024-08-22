/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    if (dev) {
      config.module.rules.push({
        test: /@web3icons\/react/,
        sideEffects: false,
      });
    }

    return config;
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
