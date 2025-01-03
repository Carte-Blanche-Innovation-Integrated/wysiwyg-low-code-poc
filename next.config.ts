import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    generateBuildId: async () => {
        // This could be anything, using the latest git hash
        return process.env.GIT_HASH || null
    }
};

export default nextConfig;
