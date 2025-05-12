"use server";
import { readFileSync } from "node:fs";
import type { BuildInfo } from "./types";
import { z } from "zod";
import { BUILD_INFO_PATH } from "@lib/constants";

const BuildInfoSchema = z.object({
	commit: z.string(),
	lastUpdated: z.string(),
}) satisfies z.ZodType<BuildInfo>;

export async function fetchBuildInfo(): Promise<BuildInfo> {
	const data = readFileSync(BUILD_INFO_PATH, "utf-8");
	// ensure that the data is valid JSON
	const parsed = JSON.parse(data);
	// ensure that the data is valid against the schema
	return BuildInfoSchema.parse(parsed);
}
