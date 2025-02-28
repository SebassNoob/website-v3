export const locales = ["en-SG", "zh-SG"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "en-SG" as const satisfies Locale;

export const languageNames = {
	"en-SG": "English",
	"zh-SG": "中文 (简体)",
} as const satisfies Record<Locale, string>;
