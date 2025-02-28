import type { LocaleDictionary } from "@lib/actions";
import type { ReactNode } from "react";

export interface HeroProps {
	data: LocaleDictionary["hero"];
}

export interface SocialLinkProps {
	href: string;
	children: ReactNode;
}
