

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.domain.com', // subdomain wildcard
      },
      {
        protocol: 'https',
        hostname: 'another-domain.com',
        pathname: '/uploads/**', // path uyğunlaşdırması
      },
    ],
  },
};

module.exports = nextConfig;