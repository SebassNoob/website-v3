import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { readFileSync } from "node:fs";
import { JSON_LD_PATH } from "@lib/constants";
import { JsonLdScript } from "./components";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.APP_URL ?? "http://localhost:9999"),
	title: "sebassnoob",
	description: "A personal website!",
	openGraph: {
		type: "website",
		locale: "en-SG",
		alternateLocale: ["zh-SG", "ms-SG"],
		siteName: "SebassNoob - Personal Website",
		url: new URL(process.env.APP_URL ?? "http://localhost:9999"),
		title: "sebassnoob",
		description: "A personal website!",
		emails: ["sebastian.ong@hotmail.com"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	let jsonLd: null | Record<string, unknown> = null;
	try {
		jsonLd = JSON.parse(readFileSync(JSON_LD_PATH, "utf-8")) as Record<string, unknown>;
	} catch (error) {
		console.warn("Error reading JSON-LD file:", error);
	}
	return (
		<>
			{children}
			<JsonLdScript jsonLd={jsonLd} />
			<SpeedInsights />
		</>
	);
}
