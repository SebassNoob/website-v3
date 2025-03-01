import { type NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n";
import { match } from "@formatjs/intl-localematcher";

function parseAcceptLanguage(header: string): string[] {
	return header
		.split(",")
		.map((lang) => {
			const [code, qValue] = lang.split(";q=");
			return { code: code.trim(), q: qValue ? Number.parseFloat(qValue) : 1.0 }; // Default q=1.0
		})
		.sort((a, b) => b.q - a.q) // Sort by quality in descending order
		.map((lang) => lang.code); // Return sorted language codes
}

function getLocale(request: NextRequest) {
	const acceptLanguage = request.headers.get("Accept-Language");

	if (!acceptLanguage) return defaultLocale;
	const requestedLocales = parseAcceptLanguage(acceptLanguage);
	try {
		return match(requestedLocales, locales, defaultLocale);
	} catch (e) {
		console.warn(e);
		return defaultLocale;
	}
}

export function middleware(request: NextRequest) {
	// Check if there is any supported locale in the pathname
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) return;

	// Redirect if there is no locale
	const locale = getLocale(request);
	request.nextUrl.pathname = `/${locale}${pathname}`;
	// e.g. incoming request is /abc
	// The new URL is now /en/abc
	return NextResponse.redirect(request.nextUrl);
}

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|favicon.ico|sitemap.xml|robots.txt|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
	],
};
