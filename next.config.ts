import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		reactCompiler: true,
	},
	trailingSlash: false,
	output: "standalone",
};

export default nextConfig;
