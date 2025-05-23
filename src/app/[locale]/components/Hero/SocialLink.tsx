import Link from "next/link";
import type { SocialLinkProps } from "./types";

export function SocialLink({ href, children }: SocialLinkProps) {
	return (
		<Link href={href} target="_blank" className="flex items-center gap-1">
			{children}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="2"
				stroke="currentColor"
				className="size-3 dark:stroke-white"
				role="img"
				aria-label="External Link"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
				/>
			</svg>
		</Link>
	);
}
