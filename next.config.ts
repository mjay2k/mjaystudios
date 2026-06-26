import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1440, 1920, 2048],
  },
  async rewrites() {
    return [
      // Serve the standalone Clabber cheat sheet at a clean /clabber URL.
      { source: "/clabber", destination: "/clabber/clabber-cheat-sheet.html" },
      // Serve the standalone Nashville Bride site at a clean /nashvillebride URL.
      { source: "/nashvillebride", destination: "/nashvillebride/index.html" },
    ];
  },
};

export default nextConfig;
