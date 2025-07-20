"use server";
import "server-only";
import { readFileSync } from "node:fs";
import type { BuildInfo } from "./types";
import { z } from "zod";
import { BUILD_INFO_PATH } from "@lib/constants";

const BuildInfoSchema = z.object({
	commit: z.string(),
	lastUpdated: z.string(),
}) satisfies z.ZodType<BuildInfo>;

export async function fetchBuildInfo(): Promise<BuildInfo> {
	let data: unknown;
	try {
		data = JSON.parse(readFileSync(BUILD_INFO_PATH, "utf-8"));
	} catch (error) {
		console.warn("Error reading build info file:", error);
		data = {
			commit: "???",
			lastUpdated: new Date(0).toISOString(),
		} satisfies BuildInfo;
	}

	// ensure that the data is valid against the schema
	return BuildInfoSchema.parse(data);
}
