"use client";
import { useContext } from "react";
import { ClientContext } from "@lib/providers";
import Image from "next/image";

export function ThemeSwitcher() {
	const { theme, setTheme } = useContext(ClientContext);
	return (
		<button
			type="button"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			className="p-2 rounded-sm bg-slate-100 dark:bg-zinc-900"
		>
			{theme === "light" ? (
				<Image src="/moon.svg" alt="dark mode" className="size-6" height={24} width={24} />
			) : (
				<Image src="/sun.svg" alt="light mode" className="size-6" height={24} width={24} />
			)}
		</button>
	);
}
