import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { ClientProvider } from "@lib/providers";
import { Footer, Header } from "@lib/components";
import type { ReactNode } from "react";
import { defaultLocale, locales, type Locale } from "@/i18n";
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

const enFont = Inter({
	subsets: ["latin"],
	display: "swap",
});
const zhFont = Noto_Sans_TC({
	display: "swap",
	preload: false,
});

function getFont(locale: Locale) {
	switch (locale) {
		case "en":
			return enFont;
		case "zh":
			return zhFont;
    case "ms":
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
	params: Promise<{ locale: Locale } | undefined>;
}>) {
	const locale = (await params)?.locale ?? defaultLocale;
	const font = getFont(locale);
	return (
		<html lang={locale}>
			<body className={font.className}>
				<ClientProvider>
					<main className="bg-zinc-50 dark:bg-black min-h-screen w-full flex flex-col transition-all">
						<Header />
						<section className="flex-grow flex flex-col">{children}</section>
						<Footer />
					</main>
				</ClientProvider>
			</body>
		</html>
	);
}
