import type { PropsWithChildren } from "react";
import { ClientProvider } from "@lib/providers";
import { Footer, Header } from "@lib/components";

export function DefaultLayout({ children }: PropsWithChildren) {
	return (
		<>
			<noscript>
				<p>Please re-enable JavaScript to view this website.</p>
				<p>
					In the meantime, you can drop me an email{" "}
					<span>
						<a href="mailto:sebastian.ong@hotmail.com" style={{ textDecoration: "underline" }}>
							here
						</a>
					</span>
					!
				</p>
			</noscript>
			<ClientProvider>
				<main className="bg-zinc-50 dark:bg-neutral-950 min-h-screen w-full flex flex-col">
					<Header />
					<section className="flex-grow flex flex-col">{children}</section>
					<Footer />
				</main>
			</ClientProvider>
		</>
	);
}
