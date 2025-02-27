import { Text } from "@lib/components";
import { fetchBuildInfo } from "@lib/actions";

export async function Footer() {
	const buildInfo = await fetchBuildInfo();

	return (
		<footer>
			<div className="flex flex-col justify-center items-center p-6">
				<Text order="sm">Made with ❤️ © SebassNoob {new Date().getFullYear()}</Text>
				{buildInfo && (
					<Text order="sm">
						Last updated on {new Date(buildInfo.lastUpdated).toLocaleDateString()} (
						{buildInfo.commit})
					</Text>
				)}
			</div>
		</footer>
	);
}
