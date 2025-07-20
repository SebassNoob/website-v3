import { mkdirSync, existsSync } from "node:fs";
import { GENERATED_DIR } from "@lib/constants";
import { generateBuildInfo } from "./generateBuildInfo";
import { generateJsonLd } from "./generateJsonLd";

if (!existsSync(GENERATED_DIR)) {
	console.warn("⚠️ '/public/generated' directory does not exist, creating it...");
	mkdirSync(GENERATED_DIR);
}

generateBuildInfo();
generateJsonLd();
