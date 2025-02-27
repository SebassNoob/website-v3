import { Experiences, Hero } from "./components";
import { fetchStaticData } from "@lib/actions";

export default async function Home() {
	const data = await fetchStaticData();
	return (
		<div>
			<Hero data={data} />
			<Experiences data={data.experiences} />
		</div>
	);
}
