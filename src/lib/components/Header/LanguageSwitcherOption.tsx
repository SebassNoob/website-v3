import type { LanguageSwitcherOptionProps } from "./types";
import Link from "next/link";
import { Text } from "@lib/components";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export function LanguageSwitcherOption({
	language,
	href,
	isSelected,
}: LanguageSwitcherOptionProps) {
	return (
		<Link
			type="button"
			className="flex gap-3 items-center px-4 py-2 hover:dark:bg-zinc-800  hover:bg-gray-100 rounded-lg w-full"
			href={href}
		>
			<Text order="sm">{language}</Text>

			<Image
				src="/tick.svg"
				alt="selected"
				className={twMerge("size-4 dark:invert", isSelected ? null : "invisible")}
				height={16}
				width={16}
			/>
		</Link>
	);
}
