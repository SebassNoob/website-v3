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

class DiscordWebhookAdapter {
	private url = process.env.DISCORD_WEBHOOK_URL;
	private requestOptions: RequestInit = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	};

	async sendMessage({ content, embed }: { content?: string; embed?: Record<string, unknown> }) {
		if (!this.url) {
			console.warn("Discord webhook URL is not defined. Logging to console instead.");
			console.info({ content, embed });
			return;
		}

		const [contentLength, embedLength] = [
			content ? content.length : 0,
			embed ? JSON.stringify(embed).length : 0,
		];
		if (contentLength + embedLength > 2000) {
			console.warn("Message exceeds Discord limit of 2000 characters. Logging to console instead.");
			console.info({ content, embed });
			return;
		}

		const body = JSON.stringify({ content, embeds: embed ? [embed] : [] });

		try {
			const response = await fetch(this.url, { ...this.requestOptions, body });
			if (!response.ok) {
				console.error("Failed to send message to Discord webhook:", response);
			}
		} catch (error) {
			console.error("Error sending message to Discord webhook:", error);
		}
	}

	makeEmbed(title: string, description: string, color = 0x000000) {
		return {
			title,
			type: "rich",
			description,
			color,
			timestamp: new Date().toISOString(),
		};
	}
}

export async function logPageView(req: NextRequest) {
	const adapter = new DiscordWebhookAdapter();

	const forwarded = req.headers.get("x-forwarded-for");
	const ip = normalizeIp(forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip"));

	const agent = userAgent(req);

	const embedData = {
		url: req.nextUrl.href,
		ip: await (async () => {
			if (!ip) return { ip: "Unknown" };
			if (PRIVATE_IP_REGEX.test(ip)) return { ip: `${ip} (Private)` };
			return await GET_IP_LOCATION(ip)
				.then((res) => {
					if (!res.ok) throw new Error("Failed to fetch IP location");
					return res.json();
				})
				.catch(() => ({ ip }));
		})(),
		...agent,
	};

	const embed = adapter.makeEmbed(
		"New Page View",
		Object.entries(embedData)
			.map(([key, value]) => {
				if (typeof value === "object" && value !== null) {
					value = JSON.stringify(value, null, 2);
				}
				return `**${key}**: \`\`\`${value}\`\`\``;
			})
			.join("\n"),
	);
	await adapter.sendMessage({ embed });
}

export async function logError(error: {
	name: string;
	message: string;
	stack?: string;
	digest?: string;
}) {
	const adapter = new DiscordWebhookAdapter();

	if (error.stack && error.stack.length > 1000) {
		error.stack = `${error.stack.substring(0, 1000)}...(truncated)`;
	}

	const embedData = {
		name: error.name,
		message: error.message,
		stack: error.stack ?? "N/A",
		digest: error.digest ?? "N/A",
	};
	const embed = adapter.makeEmbed(
		"New Error Logged",
		Object.entries(embedData)
			.map(([key, value]) => `**${key}**: \`\`\`${value}\`\`\``)
			.join("\n"),
		0xff0000,
	);
	await adapter.sendMessage({ embed });
}
