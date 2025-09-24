import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
		optimizePackageImports: ["zod", "tailwind-merge", "react-tiny-popover"],
	},
	trailingSlash: false,
	output: "standalone",
};

export default nextConfig;
