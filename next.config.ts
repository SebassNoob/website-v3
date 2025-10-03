import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

if (process.env.ANALYZE) {
	console.info("ℹ️ Bundle analyzer is enabled!");
}

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
		optimizePackageImports: ["zod", "tailwind-merge", "react-tiny-popover"],
	},
	trailingSlash: false,
	output: "standalone",
};

export default withBundleAnalyzer({
	enabled: !!process.env.ANALYZE,
})(nextConfig);
