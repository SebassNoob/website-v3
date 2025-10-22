import { mkdirSync, existsSync, rmSync } from "node:fs";
import { GENERATED_DIR } from "@lib/constants";
import { generateBuildInfo } from "./generateBuildInfo";
import { generateJsonLd } from "./generateJsonLd";

// process flags
const FORCE = process.argv.includes("--force") || process.argv.includes("-f");

if (existsSync(GENERATED_DIR) && !FORCE) {
	console.info(`ℹ️ ${GENERATED_DIR} exists, skipping...`);
	process.exit(0);
} else {
	console.warn(`⚠️ Recreating ${GENERATED_DIR}...`);
	rmSync(GENERATED_DIR, { recursive: true, force: true });
	mkdirSync(GENERATED_DIR);
}

generateBuildInfo();
generateJsonLd();
