import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientProvider } from "@lib/providers";
import { Footer, Header } from "@lib/components";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
	title: "SebassNoob",
	description: "Personal website!",
};

const inter = Inter({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
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
