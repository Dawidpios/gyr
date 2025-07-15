import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["bronze-casual-earthworm-792.mypinata.cloud"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bronze-casual-earthworm-792.mypinata.cloud",
      },
      {
        protocol: "https",
        hostname: "gyrpython.onrender.com",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "8000",
      },
    ],
  },
};

export default nextConfig;
