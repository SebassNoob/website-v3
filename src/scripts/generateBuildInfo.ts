import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import type { BuildInfo } from "@lib/actions";
import { BUILD_INFO_PATH } from "@lib/constants";

export function generateBuildInfo() {
	let commitSHA: string;
	try {
		commitSHA = execSync("git rev-parse --short HEAD").toString().trim();
	} catch (error) {
		console.warn("⚠️ Failed to retrieve commit SHA, falling back to '???'");
		if (error instanceof Error) {
			console.error(error.message);
		}
		commitSHA = "???";
	}

	const buildInfo = {
		lastUpdated: new Date().toISOString(),
		commit: commitSHA,
	} as const satisfies BuildInfo;

	writeFileSync(BUILD_INFO_PATH, JSON.stringify(buildInfo, null, 2));

	console.info("✅ Build metadata generated!");
}
