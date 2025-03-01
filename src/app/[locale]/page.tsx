import { Experiences, Hero } from "./components";
import { fetchLocaleDictionary } from "@lib/actions";
import type { Locale } from "@/i18n";
import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n";

export default async function Home({ params }: { params: Promise<{ locale: Locale | "_next" }> }) {
	const { locale } = await params;
	if (locale === "_next") redirect(`/${defaultLocale}`);
	const data = await fetchLocaleDictionary(locale);
	return (
		<div>
			<Hero data={data.hero} />
			<Experiences data={data.experiences} />
		</div>
	);
}
