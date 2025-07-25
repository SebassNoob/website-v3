"use server";
import "server-only";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { LocaleDictionary } from "./types";
import { z } from "zod";
import type { Locale } from "@/i18n";
import { LOCALE_DICTIONARY_DIR } from "@lib/constants";

const LocaleDictionarySchema = z.object({
	hero: z.object({
		now: z.object({
			title: z.string(),
			intro: z.string(),
			past: z.string(),
			hobbies: z.string(),
		}),
		social: z.object({
			github: z.string(),
			blog: z.string(),
			email: z.string(),
			linkedin: z.string(),
		}),
	}),
	experiences: z.object({
		title: z.string(),
		subtitle: z.string(),
		content: z.array(
			z.object({
				title: z.string(),
				entity: z.string(),
				entityUrl: z.string().optional(),
				startDate: z.string(),
				endDate: z.string(),
				descriptionPoints: z.array(z.string()),
			}),
		),
	}),
}) satisfies z.Schema<LocaleDictionary>;

export async function fetchLocaleDictionary(locale: Locale): Promise<LocaleDictionary> {
	const path = join(LOCALE_DICTIONARY_DIR, `${locale}.json`);

	if (!existsSync(path)) {
		throw new Error(`Locale dictionary file not found at ${path}`);
	}
	const data = readFileSync(path, "utf-8");
	// ensure that the data is valid JSON
	const parsed = JSON.parse(data);
	// ensure that the data is valid against the schema
	return LocaleDictionarySchema.parse(parsed);
}
