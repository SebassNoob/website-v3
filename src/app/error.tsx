"use client";
import { useEffect } from "react";
import { Title, Text, Code } from "@lib/components";
import Link from "next/link";

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
		<div className="flex items-center justify-center h-dvh w-full flex-col p-12">
			<Title order={1} className="text-4xl">
				This is embarassing...
			</Title>
			<Text order="lg" className="mt-4">
				A wild error appeared! This is not supposed to happen. If you think this is a bug, please
				let me know{" "}
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
				className="mt-4 bg-black text-white px-4 py-2 rounded-md cursor-pointer dark:bg-gray-100 dark:text-black"
			>
				Attempt to recover
			</button>
		</div>
	);
}
