import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { ClientProvider } from "@lib/providers";
import { Footer, Header } from "@lib/components";
import type { ReactNode } from "react";
import { defaultLocale, locales, type Locale } from "@/i18n";
import "./globals.css";

export const metadata: Metadata = {
	title: "SebassNoob",
	description: "Personal website!",
};

const enFont = Inter({
	subsets: ["latin"],
	display: "swap",
});
const zhFont = Noto_Sans_TC({
	display: "swap",
	preload: false,
});

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
	let font: typeof enFont | typeof zhFont;
	switch (locale) {
		case "en-SG":
			font = enFont;
			break;
		case "zh-SG":
			font = zhFont;
			break;
		default:
			font = enFont;
	}
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
