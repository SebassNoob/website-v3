import { Title, Text } from "@lib/components";
import type { ExperiencesProps } from "./types";
import { Fragment } from "react";
import Link from "next/link";

export function Experiences({ data }: ExperiencesProps) {
	return (
		<div className="p-4 flex flex-col gap-6 items-center">
			<div className="flex flex-col gap-2 items-center">
				<Title order={2} className="text-3xl">
					{data.title}
				</Title>
				<Text className="max-w-2xl">{data.subtitle}</Text>
			</div>
			<div className="sm:grid sm:grid-cols-[2fr_5fr] flex flex-col gap-4 sm:gap-0">
				{data.content.map((experience) => (
					<Fragment key={experience.title + experience.entity}>
						<div className="sm:border-r-[1px] sm:border-black sm:dark:border-white sm:px-4 sm:justify-self-end flex flex-col sm:items-end sm:text-end">
							<Title order={3} className="text-lg">
								{experience.title}
							</Title>

							{experience.entityUrl ? (
								<Link
									href={experience.entityUrl}
									className="flex gap-1 items-center"
									target="_blank"
								>
									<Text className="underline cursor-pointer hover:decoration-[0.1em]">
										{experience.entity}
									</Text>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="2"
										stroke="currentColor"
										className="size-3 dark:stroke-white"
										role="img"
										aria-label="External Link"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
										/>
									</svg>
								</Link>
							) : (
								<Text>{experience.entity}</Text>
							)}
							<Text>
								{experience.startDate} - {experience.endDate}
							</Text>
						</div>
						<div className="pb-8 sm:pb-10 px-6">
							<ul className="flex flex-col gap-1.5">
								{experience.descriptionPoints.map((point) => (
									<li key={point} className="list-disc dark:marker:text-white">
										<Text>{point}</Text>
									</li>
								))}
							</ul>
						</div>
					</Fragment>
				))}
			</div>
		</div>
	);
}
