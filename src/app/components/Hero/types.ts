import type { StaticData } from "@lib/actions";
import type { ReactNode } from "react";

export interface HeroProps {
	data: StaticData;
}

export interface SocialLinkProps {
	href: string;
	children: ReactNode;
}
