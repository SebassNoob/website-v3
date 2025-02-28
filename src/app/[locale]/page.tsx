import { Experiences, Hero } from "./components";
import { fetchLocaleDictionary } from "@lib/actions";
import type { Locale } from "@/i18n";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
	const { locale } = await params;
	const data = await fetchLocaleDictionary(locale);
	return (
		<div>
			<Hero data={data.hero} />
			<Experiences data={data.experiences} />
		</div>
	);
}
