import { Inter, Noto_Sans_SC } from "next/font/google";
import type { ReactNode } from "react";
import { defaultLocale, locales, type Locale } from "@/i18n";
import { DefaultLayout } from "../components";
import { JSON_LD_PATH } from "@/lib/constants";
import { readFileSync } from "node:fs";

const enFont = Inter({
	subsets: ["latin"],
	display: "swap",
});

const zhFont = Noto_Sans_SC({
	display: "swap",
	preload: false,
});

function getFont(locale: string) {
	switch (locale) {
		case "en" satisfies Locale:
			return enFont;
		case "zh" satisfies Locale:
			return zhFont;
		case "ms" satisfies Locale:
			return enFont;
		default:
			return enFont;
	}
}

export async function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: ReactNode;
	params: Promise<{ locale: string } | undefined>;
}>) {
	const locale = (await params)?.locale ?? defaultLocale;

	let jsonLD: null | Record<string, unknown> = null;
	try {
		jsonLD = JSON.parse(readFileSync(JSON_LD_PATH, "utf-8")) as Record<string, unknown>;
	} catch (error) {
		console.warn("Error reading JSON-LD file:", error);
	}

	return (
		<html lang={locale}>
			{jsonLD && (
				<head>
					<script
						type="application/ld+json"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: this is safe as we control the content
						dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
						defer
					/>
				</head>
			)}

			<body className={getFont(locale).className}>
				<DefaultLayout>{children}</DefaultLayout>
			</body>
		</html>
	);
}
