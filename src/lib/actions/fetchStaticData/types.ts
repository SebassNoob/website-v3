export interface StaticData {
	now: {
		occupation: string;
		location: string;

		beliefs: string;
		past: string;
		hobbies: string;

		available: boolean;
	};
	social: {
		github: string;
		blog: string;
		email: string;
		linkedin: string;
	};
	experiences: Experience[];
}

interface Experience {
	title: string;
	entity: string;
	entityUrl?: string;

	startDate: string;
	endDate: string;
	descriptionPoints: string[];
}
