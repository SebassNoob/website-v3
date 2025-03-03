import type { PropsWithChildren } from "react";
import { ClientProvider } from "@lib/providers";
import { Footer, Header } from "@lib/components";

export function DefaultLayout({ children }: PropsWithChildren) {
	return (
		<ClientProvider>
			<main className="bg-zinc-50 dark:bg-black min-h-screen w-full flex flex-col">
				<Header />
				<section className="flex-grow flex flex-col">{children}</section>
				<Footer />
			</main>
		</ClientProvider>
	);
}
