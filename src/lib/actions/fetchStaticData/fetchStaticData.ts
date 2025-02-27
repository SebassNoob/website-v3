"use server";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { StaticData } from "./types";

export async function fetchStaticData(): Promise<StaticData | null> {
	const path = join(process.cwd(), "public", "static-data.json");
	const data = readFileSync(path, "utf-8");
	try {
		// ensure that the data is valid JSON
		const parsed = JSON.parse(data);
		return parsed;
	} catch (e) {
		console.error(e);
		return null;
	}
}
