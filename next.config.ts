import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    // Baked once at build time so statically-exported pages don't drift across a year boundary.
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
};

export default nextConfig;
