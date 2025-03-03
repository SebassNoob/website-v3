"use client";
import { useEffect } from "react";
import { Title, Text, Code } from "@lib/components";
import Link from "next/link";
import { DefaultLayout } from "./components";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html lang="en">
			<body>
				<DefaultLayout>
					<div className="flex items-center justify-center h-dvh w-full flex-col p-12">
						<Title order={1} className="text-4xl">
							This is quite embarassing...
						</Title>
						<Text order="lg" className="mt-4">
							A serious wild error appeared! This is definitely not supposed to happen. This is a
							bug, please let me know{" "}
							<Link href="mailto:sebastian.ong@hotmail.com" className="underline">
								here
							</Link>
							.
						</Text>
						<div className="flex gap-2 items-center justify-center flex-col max-w-2xl mt-4">
							<Code>
								{error.name}: {error.message}
							</Code>
						</div>
						<button
							onClick={reset}
							type="button"
							className="mt-4 bg-black text-white px-4 py-2 rounded-md cursor-pointer dark:bg-gray-100 dark:text-black hover:bg-gray-800 hover:dark:bg-gray-200"
						>
							Attempt to recover
						</button>
					</div>
				</DefaultLayout>
			</body>
		</html>
	);
}
