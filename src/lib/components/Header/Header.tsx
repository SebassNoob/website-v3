"use client";
import { Code } from "@lib/components";
import { useContext } from "react";
import { ClientContext } from "@lib/providers";
import Image from "next/image";

export function Header() {
	const { theme, setTheme } = useContext(ClientContext);

	return (
		<header className="flex items-center justify-between px-6 py-4 sticky top-0 z-50 backdrop-blur-sm shadow-xs">
			<div className="flex items-center cursor-pointer">
				<Image
					src="/pfp.jpg"
					alt="Profile"
					className="rounded-full h-12 w-12 object-cover mr-4"
					width={48}
					height={48}
				/>
				<pre className="dark:bg-black bg-slate-100 p-2 rounded-sm hidden sm:block">
					<Code>SebassNoob</Code>
				</pre>
			</div>
			<button
				type="button"
				onClick={() => setTheme(theme === "light" ? "dark" : "light")}
				className="p-2 rounded-sm bg-slate-100 dark:bg-black"
				data-testid="theme-toggle"
				tabIndex={-1}
			>
				{theme === "light" ? (
					<Image src="/moon.svg" alt="dark mode" className="h-6 w-6" height={24} width={24} />
				) : (
					<Image src="/sun.svg" alt="light mode" className="h-6 w-6" height={24} width={24} />
				)}
			</button>
		</header>
	);
}
