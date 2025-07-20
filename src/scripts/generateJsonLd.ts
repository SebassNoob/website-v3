import { JSON_LD_PATH } from "@lib/constants";
import { writeFileSync } from "node:fs";
import { locales } from "@/i18n";
// import enDictionary from "@/dictionaries/en.json";

export function generateJsonLd() {
	const jsonLD = {
		"@context": "https://schema.org",
		"@type": "ProfilePage",
		dateModified: new Date().toISOString(),
		mainEntity: {
			"@type": "Person",
			name: "Sebastian Ong",
			familyName: "Ong",
			givenName: "Sebastian",
			alternateName: "SebassNoob",
			url: process.env.APP_URL ?? undefined,
			gender: "Male",
			pronouns: "he/him",
			nationality: "Singapore",
			knowsLanguage: locales,
			homeLocation: {
				"@type": "Place",
				name: "Singapore",
			},
		},
	};

	// Remove undefined values
	const cleanJsonLD = JSON.parse(
		JSON.stringify(jsonLD, (_key, value) => (value === undefined ? undefined : value)),
	);

	writeFileSync(JSON_LD_PATH, JSON.stringify(cleanJsonLD, null, 2));

	console.info("✅ JSON-LD structured data generated!");
}
