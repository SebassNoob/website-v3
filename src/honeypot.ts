import { NextResponse } from "next/server";

export const honeypotRegex =
	/(wp-|wordpress|xmlrpc|phpmyadmin|pma|adminer|\.env|\.git|\.svn|\.bak|\.old|\.sql|dump|backup|shell|cmd|eval|bypass|alfa|cgi-bin|\.php$)/i;

const sussyResponse = `OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=supersecretpassword
JWT_SECRET=anothersecretkey
COOKIE_SECRET=yetanothersecretkey
EXTERNAL_SERVER_URL=http://67.67.67.2
# If you found this, you're probably a bot trying to scrape sensitive info.
# Nice try! But this is just a honeypot to catch malicious actors.
# Your IP and activity have been logged.
`;

export function punishHoneypot(): Promise<NextResponse> {
	// Slow down the response to deter bots
	const ms = Math.floor(Math.random() * 2000) + 3000; // 3-5 seconds
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(new NextResponse(sussyResponse, { status: 200 }));
		}, ms);
	});
}
