"use server";
import { userAgent, type NextRequest } from "next/server";

const GET_IP_LOCATION = (ip: string) => fetch(`https://ipapi.co/${ip}/json/`);
const PRIVATE_IP_REGEX =
	/(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/;

function normalizeIp(ip?: string | null): string | null {
	if (!ip) return null;
	// ipv6-mapped ipv4 address always starts with ::ffff:
	if (ip.startsWith("::ffff:")) {
		return ip.substring(7);
	}
	return ip;
}

export async function logPageView(req: NextRequest) {
	const forwarded = req.headers.get("x-forwarded-for");
	const ip = normalizeIp(forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip"));

	const agent = userAgent(req);

	const embedData = {
		url: req.nextUrl.href,
		meta: await (async () => {
			if (!ip) return { ip: "Unknown" };
			if (PRIVATE_IP_REGEX.test(ip)) return { ip: `${ip} (Private)` };

			const loc = await GET_IP_LOCATION(ip);
			if (!loc.ok) return { ip };
			return { ip, ...((await loc.json()) as Promise<Record<string, string>>) };
		})(),
		agent,
	};

	console.info("Page View:", JSON.stringify(embedData, null, 2));
}

export async function logError(error: {
	name: string;
	message: string;
	stack?: string;
	digest?: string;
}) {
	if (error.stack && error.stack.length > 1000) {
		error.stack = `${error.stack.substring(0, 1000)}...(truncated)`;
	}
	const embedData = {
		name: error.name,
		message: error.message,
		stack: error.stack ?? "N/A",
		digest: error.digest ?? "N/A",
	};
	console.error("Error Logged:", JSON.stringify(embedData, null, 2));
}
