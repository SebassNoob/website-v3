"use client";
import { Popover } from "react-tiny-popover";
import { useState } from "react";
import Image from "next/image";
import { LanguageSwitcherOption } from "./LanguageSwitcherOption";
import { languageNames } from "@/i18n";
import { useParams } from "next/navigation";

export function LanguageSwitcher() {
	const [open, setOpen] = useState(false);
	const params = useParams();
	const currentLocale = params?.locale;
	return (
		<Popover
			isOpen={open}
			positions={["bottom", "left"]}
			containerClassName="z-50"
			onClickOutside={() => setOpen(false)}
			align="end"
			padding={5}
			content={
				<div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-gray-700">
					{Object.entries(languageNames).map(([language, name]) => (
						<LanguageSwitcherOption
							key={language}
							language={name}
							href={`/${language}`}
							isSelected={currentLocale === language}
						/>
					))}
				</div>
			}
		>
			<button
				onClick={() => setOpen((value) => !value)}
				className="p-2 rounded bg-slate-100 dark:bg-black cursor-pointer"
				data-testid="theme-toggle"
				tabIndex={-1}
				type="button"
			>
				<Image
					src="/language.svg"
					alt="menu"
					className="size-6 dark:invert"
					height={24}
					width={24}
				/>
			</button>
		</Popover>
	);
}
