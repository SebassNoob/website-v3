import { mkdirSync, existsSync } from "node:fs";
import { GENERATED_DIR } from "@lib/constants";
import { generateBuildInfo } from "./generateBuildInfo";
import { generateJsonLd } from "./generateJsonLd";

// process flags
const NO_CACHE = process.argv.includes("--no-cache");

if (!NO_CACHE && existsSync(GENERATED_DIR)) {
	console.info(`ℹ️ ${GENERATED_DIR} exists, skipping...`);
	process.exit(0);
}

if (!existsSync(GENERATED_DIR)) {
	console.warn(`⚠️ ${GENERATED_DIR} directory does not exist, creating it...`);
	mkdirSync(GENERATED_DIR);
}

generateBuildInfo();
generateJsonLd();
