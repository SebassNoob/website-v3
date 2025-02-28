interface Experience {
	title: string;
	entity: string;
	entityUrl?: string;

	startDate: string;
	endDate: string;
	descriptionPoints: string[];
}

export interface LocaleDictionary {
	hero: {
		now: {
			title: string;
			intro: string;
			past: string;
			hobbies: string;
		};
		social: {
			github: string;
			blog: string;
			email: string;
			linkedin: string;
		};
	};
	experiences: {
		title: string;
		subtitle: string;
		content: Experience[];
	};
}
