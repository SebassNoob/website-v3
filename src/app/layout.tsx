import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return <>{children}</>;
}
