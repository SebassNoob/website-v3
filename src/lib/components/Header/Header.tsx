"use client";
import { Code } from "@lib/components";
import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function Header() {
	return (
		<header className="flex items-center justify-between px-6 py-4 sticky top-0 z-50 backdrop-blur-sm shadow-xs">
			<Link className="flex items-center cursor-pointer" href="/" scroll>
				<Image
					src="/pfp.webp"
					width={48}
					height={48}
					alt="Profile"
					className="rounded-full sm:size-12 size-8 object-cover mr-4"
					placeholder="empty"
				/>
				<pre className="dark:bg-black bg-slate-100 p-2 rounded-sm hidden sm:block">
					<Code>SebassNoob</Code>
				</pre>
			</Link>
			<div className="flex items-center gap-2">
				<ThemeSwitcher />
				<LanguageSwitcher />
			</div>
		</header>
	);
}
