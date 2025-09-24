import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { readFileSync } from "node:fs";
import { JSON_LD_PATH } from "@lib/constants";
import { JsonLdScript } from "./components";
import { defaultLocale, locales } from "@/i18n";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.APP_URL ?? "http://localhost:9999"),
	title: "sebassnoob",
	description: "A personal website!",
	alternates: {
		canonical: `/${defaultLocale}`,
		languages: Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])),
	},
	openGraph: {
		type: "website",
		locale: defaultLocale,
		alternateLocale: locales.filter(l => l !== defaultLocale),
		siteName: "SebassNoob - Personal Website",
		url: "/",
		title: "sebassnoob",
		description: "A personal website!",
		emails: ["sebastian.ong@hotmail.com"],
	},
};

export const dynamic = "force-static";

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	let jsonLd: null | Record<string, unknown> = null;
	try {
		jsonLd = JSON.parse(readFileSync(JSON_LD_PATH, "utf-8")) as Record<string, unknown>;
	} catch (error) {
		console.warn("Error reading JSON-LD file:", error);
	}
	return (
		<>
			{children}
			{jsonLd && <JsonLdScript jsonLd={jsonLd} />}
			<SpeedInsights />
		</>
	);
}
