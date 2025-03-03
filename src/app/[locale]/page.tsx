import { Experiences, Hero } from "./components";
import { fetchLocaleDictionary } from "@lib/actions";
import type { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import { defaultLocale, locales } from "@/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	if (!locales.some((v) => v === locale)) redirect(`/${defaultLocale}`);
	const data = await fetchLocaleDictionary(locale as Locale);
	return (
		<div>
			<Hero data={data.hero} />
			<Experiences data={data.experiences} />
		</div>
	);
}
