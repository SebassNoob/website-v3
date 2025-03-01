import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const appUrl = process.env.APP_URL;

	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: appUrl ? `${appUrl}/sitemap.xml` : undefined,
	};
}
