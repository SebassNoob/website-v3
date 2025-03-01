import Link from "next/link";
import { Title, Text } from "@lib/components";

export default function NotFound() {
	return (
		<div className="flex items-center justify-center h-dvh w-full flex-col p-12">
			<Title order={1} className="text-4xl">
				You seem to be lost...
			</Title>
			<Text order="lg" className="mt-4">
				The page you are looking for does not exist. If you think this is a bug, please let me know{" "}
				<Link href="mailto:sebastian.ong@hotmail.com" className="underline">
					here
				</Link>
				.
			</Text>

			<Link
				href="/"
				className="mt-4 bg-black text-white px-4 py-2 rounded-md cursor-pointer dark:bg-gray-100 dark:text-black hover:bg-gray-800 hover:dark:bg-gray-200"
			>
				Go To Main Page
			</Link>
		</div>
	);
}
