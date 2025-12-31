import { z, prettifyError } from "zod";

export const EnvSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]),
	APP_URL: z.url(),
});

export type Env = z.infer<typeof EnvSchema>;

export function getEnv(): Env {
	// console.log(process.env);
	const parsed = EnvSchema.safeParse(process.env);
	if (!parsed.success) {
		const pretty = prettifyError(parsed.error);
		throw new Error(`Invalid environment variables:\n${pretty}`);
	}
	return parsed.data;
}
