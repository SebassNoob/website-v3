"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import type { JsonLdScriptProps } from "./types";

export function JsonLdScript({ jsonLd }: JsonLdScriptProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}
	return createPortal(
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: this is safe as we control the content
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>,
		document.head,
	);
}
