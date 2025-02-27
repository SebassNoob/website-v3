import { Hero } from "./components";
import { fetchStaticData } from "@lib/actions";

export default async function Home() {
  const data = await fetchStaticData();
  if (!data) return null;
	return (
		<div>
			<Hero data={data}/>
		</div>
	);
}
