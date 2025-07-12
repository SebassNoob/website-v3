import { join } from "node:path";

export const GENERATED_DIR = join(process.cwd(), "public", "generated");

export const BUILD_INFO_PATH = join(GENERATED_DIR, "build-info.json");
export const JSON_LD_PATH = join(GENERATED_DIR, "person.jsonld");
export const LOCALE_DICTIONARY_DIR = join(process.cwd(), "src", "dictionaries");
