import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['bronze-casual-earthworm-792.mypinata.cloud'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bronze-casual-earthworm-792.mypinata.cloud',
      },
    ],
  },
};

export default nextConfig;
