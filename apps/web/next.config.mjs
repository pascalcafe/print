/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }

    return config;
  }
};

export default nextConfig;
