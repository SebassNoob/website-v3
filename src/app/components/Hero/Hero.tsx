import { Title, Text } from "@lib/components";
import type { HeroProps } from "./types";

export async function Hero({ data }: HeroProps) {
	
	return (
		<div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
			<div className="animate-[pulse_7s_ease-in-out_infinite] absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_0.5px,transparent_0.5px),linear-gradient(to_bottom,#262626_0.5px,transparent_0.5px)] [mask-image:linear-gradient(20deg,rgba(255,255,255,0.05),rgba(255,255,255,0.7),rgba(255,255,255,0.05))] bg-[size:40px_40px]" />
			<div className="z-10 p-4 flex flex-col sm:flex-row items-center">
				<div className="flex flex-col gap-2">
					<Title className="bg-linear-to-r from-blue-400 to-purple-700 inline-block !text-transparent bg-clip-text mb-2">
						Hello, I'm Sebastian
					</Title>
					<Text order="sm" className="max-w-2xl">
						I currently work as a <span className="font-semibold">{data.now.occupation}</span> based
						in <span className="font-semibold">{data.now.location}</span>. {data.now.beliefs}
					</Text>
          <Text order="sm" className="max-w-2xl">
            {data.now.past}
          </Text>
          <Text order="sm" className="max-w-2xl">
            {data.now.hobbies}
          </Text>
				</div>
			</div>
		</div>
	);
}
