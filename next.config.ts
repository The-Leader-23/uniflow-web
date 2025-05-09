import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ ADD THIS
  },
};

export default nextConfig;
