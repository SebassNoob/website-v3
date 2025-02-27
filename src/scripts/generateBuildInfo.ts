import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const commitSHA = execSync("git rev-parse --short HEAD").toString().trim();

const buildInfo = {
	lastUpdated: new Date().toISOString(),
	commit: commitSHA,
};

writeFileSync(join(process.cwd(), "public", "build-info.json"), JSON.stringify(buildInfo, null, 2));

console.info("✅ Build metadata generated!");
