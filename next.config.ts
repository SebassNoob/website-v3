import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
    optimizePackageImports: ['zod']
	},
	trailingSlash: false,
	output: "standalone",
};

export default nextConfig;
