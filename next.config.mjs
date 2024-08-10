const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['tong.visitkorea.or.kr', 'ifh.cc'],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  

  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};
export default nextConfig;
