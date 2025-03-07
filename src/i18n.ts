export const locales = ["en", "zh", "ms"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "en" as const satisfies Locale;

export const languageNames = {
	en: "English",
	zh: "中文 (简体)",
	ms: "Bahasa Melayu",
} as const satisfies Record<Locale, string>;
