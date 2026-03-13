import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath: "/roam-website-menu",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
