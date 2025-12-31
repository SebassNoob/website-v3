import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";
import { getEnv } from "@/env";

export default function sitemap(): MetadataRoute.Sitemap {
	const appUrl = getEnv().APP_URL;
	return [
		{
			url: `${appUrl}/${defaultLocale}`,
			lastModified: new Date(),
			alternates: {
				languages: Object.fromEntries(locales.map((locale) => [locale, `${appUrl}/${locale}`])),
			},
		},
	];
}
