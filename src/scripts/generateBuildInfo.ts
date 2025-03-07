import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import type { BuildInfo } from "@lib/actions";


let commitSHA: string;
try {
  commitSHA = execSync("git rev-parse --short HEAD").toString().trim();
} catch (error) {
  console.warn("⚠️ Failed to retrieve commit SHA, falling back to 'Unknown commit SHA'");
  if (error instanceof Error) {
    console.error(error.message);
  }
  commitSHA = "Unknown commit SHA";
}


const buildInfo = {
	lastUpdated: new Date().toISOString(),
	commit: commitSHA,
} as const satisfies BuildInfo;

writeFileSync(join(process.cwd(), "public", "build-info.json"), JSON.stringify(buildInfo, null, 2));

console.info("✅ Build metadata generated!");
