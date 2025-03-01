import type { MetadataRoute } from "next";
import { locales } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
	const appUrl = process.env.APP_URL;
	if (!appUrl) {
		console.warn("⚠️ APP_URL is not set in process.env");
		return [];
	}
	return [
		{
			url: appUrl,
			lastModified: new Date(),
			alternates: {
				languages: Object.fromEntries(locales.map((locale) => [locale, `${appUrl}/${locale}`])),
			},
		},
	];
}
