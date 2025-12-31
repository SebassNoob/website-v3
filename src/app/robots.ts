import { getEnv } from "@/env";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const appUrl = getEnv().APP_URL;

	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${appUrl}/sitemap.xml`,
	};
}
