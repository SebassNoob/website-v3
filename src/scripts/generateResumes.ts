// @ts-nocheck
// biome-ignore-all lint: unused
// TODO: consider in the future. not a priority right now

import PDFDocument from "pdfkit";
import { createWriteStream, existsSync, mkdirSync } from "node:fs";
import { fetchLocaleDictionary, type LocaleDictionary } from "@lib/actions";
import { locales, RESUMES_DIR } from "@lib/constants";
import { join } from "node:path";

interface FontConfig {
	font: string;
	size: number;
}

const CONSTANTS = {
	TITLE_FONT: {
		font: "Times-Bold",
		size: 18,
	} as const satisfies FontConfig, // Font configuration for titles
	TEXT_FONT: {
		font: "Times-Roman",
		size: 10,
	} as const satisfies FontConfig, // Font configuration for normal text
	TEXT_BOLD_FONT: {
		font: "Times-Bold",
		size: 10,
	} as const satisfies FontConfig, /// Font configuration for bold text
	TEXT_ITALIC_FONT: {
		font: "Times-Italic",
		size: 10,
	} as const satisfies FontConfig, // Font configuration for italic text

	X_MARGIN: 56 as const, // Left margin in points
	Y_MARGIN: 72 as const, // Top margin in points

	BULLET_RADIUS: 1.5 as const, // Bullet radius in points

	useFont(doc: typeof PDFDocument, { font, size }: FontConfig) {
		doc.font(font).fontSize(size);
	},
};

function generateSingleResume(locale: string, data: LocaleDictionary) {
	const doc = new PDFDocument({
		size: "A4",
		margins: {
			top: CONSTANTS.Y_MARGIN,
			left: CONSTANTS.X_MARGIN,
			right: CONSTANTS.X_MARGIN,
			bottom: CONSTANTS.Y_MARGIN,
		},
	});

	// Generate PDF content using LocaleDictionary
	CONSTANTS.useFont(doc, CONSTANTS.TITLE_FONT);
	doc.text(data.hero.now.title, { align: "center" });
	doc.moveDown(1);

	data.experiences.content.forEach((experience) => {
		CONSTANTS.useFont(doc, CONSTANTS.TEXT_BOLD_FONT);
		doc.text(`${experience.title} @ ${experience.entity}`, {
			link: experience.entityUrl,
			continued: true,
		});

		CONSTANTS.useFont(doc, CONSTANTS.TEXT_ITALIC_FONT);
		const duration = `${experience.startDate} - ${experience.endDate}`;
		doc.text(duration, { align: "right" });

		CONSTANTS.useFont(doc, CONSTANTS.TEXT_FONT);
		doc.list(experience.descriptionPoints, { bulletRadius: CONSTANTS.BULLET_RADIUS });
		doc.moveDown(1);
	});

	// End the document
	doc.end();

	const path = join(RESUMES_DIR, `resume-${locale}.pdf`);
	doc.pipe(createWriteStream(path));

	console.info(`✅ Resume generated for locale: ${locale}`);
}

export async function generateResumes() {
	// Create the resumes directory if it doesn't exist
	if (!existsSync(RESUMES_DIR)) {
		mkdirSync(RESUMES_DIR, { recursive: true });
	}

	// Generate resumes for all locales
	for (const locale of locales) {
		const data = await fetchLocaleDictionary(locale);
		generateSingleResume(locale, data);
	}
}
