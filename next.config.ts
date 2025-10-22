import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

if (process.env.ANALYZE) {
	console.info("ℹ️ Bundle analyzer is enabled!");
}

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

export default withBundleAnalyzer({
	enabled: !!process.env.ANALYZE,
})(nextConfig);
