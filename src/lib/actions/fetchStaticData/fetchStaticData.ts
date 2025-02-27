"use server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { StaticData } from "./types";
import { z } from "zod";

const StaticDataSchema = z.object({
	now: z.object({
		occupation: z.string(),
		location: z.string(),
		beliefs: z.string(),
		past: z.string(),
		hobbies: z.string(),
		available: z.boolean(),
	}),
	social: z.object({
		github: z.string(),
		blog: z.string(),
		email: z.string(),
		linkedin: z.string(),
	}),
	experiences: z.array(
		z.object({
			title: z.string(),
			entity: z.string(),
			entityUrl: z.string().optional(),
			startDate: z.string(),
			endDate: z.string(),
			descriptionPoints: z.array(z.string()),
		}),
	),
}) satisfies z.ZodType<StaticData>;

export async function fetchStaticData(): Promise<StaticData> {
	const path = join(process.cwd(), "public", "static-data.json");

	const data = readFileSync(path, "utf-8");
	// ensure that the data is valid JSON
	const parsed = JSON.parse(data);
	// ensure that the data is valid against the schema
	return StaticDataSchema.parse(parsed);
}
