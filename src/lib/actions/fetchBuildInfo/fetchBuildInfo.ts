"use server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { BuildInfo } from "./types";
import { z } from "zod";

const BuildInfoSchema = z.object({
	commit: z.string(),
	lastUpdated: z.string(),
}) satisfies z.ZodType<BuildInfo>;

export async function fetchBuildInfo(): Promise<BuildInfo> {
	const path = join(process.cwd(), "public", "build-info.json");

	const data = readFileSync(path, "utf-8");
	// ensure that the data is valid JSON
	const parsed = JSON.parse(data);
	// ensure that the data is valid against the schema
	return BuildInfoSchema.parse(parsed);
}
