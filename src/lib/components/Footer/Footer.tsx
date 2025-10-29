import { Text } from "@lib/components";
import { fetchBuildInfo } from "@lib/actions";
import Link from "next/link";

export async function Footer() {
	const buildInfo = await fetchBuildInfo();

	return (
		<footer>
			<div className="flex flex-col justify-center items-center p-6 mt-4">
				<Text order="sm">Made with ❤️ • SebassNoob {new Date().getFullYear()}</Text>
				<Text order="xs">
					This site is translated by hand. Please report any issues{" "}
					<span>
						<Link href="mailto:sebastian.ong@hotmail.com" className="underline">
							here
						</Link>
					</span>
					!
				</Text>
				{buildInfo && (
					<Text order="xs">
						Last updated on {new Date(buildInfo.lastUpdated).toLocaleDateString("en-SG")} (
						{buildInfo.commit})
					</Text>
				)}
			</div>
		</footer>
	);
}
