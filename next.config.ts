import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ["zod", "tailwind-merge", "react-tiny-popover"],
	},
	reactCompiler: true,
	trailingSlash: false,
	output: "standalone",
	outputFileTracingExcludes: {
		"*": ["./biome.json"],
	},
};

export default nextConfig;
