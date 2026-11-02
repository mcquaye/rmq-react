// Renders the PeoplePerHour portfolio images into portfolio-images/dark and portfolio-images/light.
// PeoplePerHour bans links and contact details in portfolio images, and shows the first six files first,
// so keep the best six at the top of this list and keep the wording free of both.
// Run with: npm run portfolio:images

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = resolve("portfolio-images");
const FORBIDDEN_COPY = /@|https?:|www\.|\.com|\.app|\+?\d[\d\s-]{7,}/i;

// cropTop skips that many screenshot pixels, to drop a page's top bar or "Contact us" button
const PROJECTS = [
	{
		key: "adwuma",
		url: "https://adwuma.app",
		name: "Adwuma",
		kind: "Software product, built solo",
		description:
			"Run client work and get paid in any currency: projects, teams and invoices in one account.",
		tags: ["Laravel", "React", "React Native", "PostgreSQL"],
		cropTop: 0,
	},
	{
		key: "lecanis",
		url: "https://lecanisgh.com/",
		name: "Le Canis",
		kind: "Marketplace platform",
		description:
			"Pet sales and adoption, with AI content moderation and automatic detection of harmful activity.",
		tags: ["Laravel", "PostgreSQL", "AWS", "REST API"],
		cropTop: 0,
	},
	{
		key: "electroland",
		url: "https://electrolandgh.com/",
		name: "Electroland Ghana",
		kind: "Online store",
		description:
			"The store for Ghana’s largest electronics distributor, with 20+ showrooms and thousands of daily sales.",
		tags: ["WordPress", "WooCommerce", "PHP", "JavaScript"],
		cropTop: 45,
	},
	{
		key: "sankofa",
		url: "https://www.sankofamarket.place",
		name: "Sankofa Market Place",
		kind: "Online store",
		description: "A custom Shopify marketplace with Stripe and PayPal payments.",
		tags: ["Shopify", "JavaScript", "Stripe", "PayPal"],
		cropTop: 0,
	},
];

const THEMES = {
	dark: { ground: "#050a18", text: "#ffffff", muted: "#b6c2d6", accent: "#22d3ee", line: "#26324a" },
	light: { ground: "#f4f6fa", text: "#0b1220", muted: "#475569", accent: "#0e7490", line: "#d5dbe6" },
};

function chrome(profileDir, width, height, waitMs, screenshotPath, url) {
	// Started natively: under an Intel build of Node, Chrome runs through Rosetta and skips screenshots
	execFileSync("/usr/bin/arch", [
		"-arm64",
		CHROME,
		"--headless=new",
		"--disable-gpu",
		`--user-data-dir=${profileDir}`,
		"--hide-scrollbars",
		`--window-size=${width},${height}`,
		`--virtual-time-budget=${waitMs}`,
		`--screenshot=${screenshotPath}`,
		url,
	], { stdio: "ignore" });

	// Chrome can exit cleanly without writing the file, which would render an empty card
	if (!existsSync(screenshotPath)) {
		throw new Error(`Chrome did not capture ${url}`);
	}
}

function cardHtml(project, theme, screenshotPath) {
	const screenshot = readFileSync(screenshotPath).toString("base64");
	const tags = project.tags
		.map(
			(tag) =>
				`<span style="border:2px solid ${theme.line};border-radius:10px;padding:8px 18px;font-size:27px;color:${theme.muted}">${tag}</span>`,
		)
		.join("");

	return `<!doctype html><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet">
<body style="margin:0"><div style="width:1200px;height:900px;box-sizing:border-box;background:${theme.ground};padding:40px 48px 44px;font-family:Poppins,sans-serif;display:flex;flex-direction:column;overflow:hidden">
<div style="height:470px;flex:none;border-radius:18px;border:2px solid ${theme.line};background:url('data:image/png;base64,${screenshot}') center -${Math.round((project.cropTop * 1104) / 1440)}px/100% auto no-repeat"></div>
<div style="margin-top:30px;font-size:27px;font-weight:500;color:${theme.accent};letter-spacing:.02em">${project.kind}</div>
<div style="font-size:66px;line-height:1.12;font-weight:700;color:${theme.text};margin-top:2px;white-space:nowrap">${project.name}</div>
<div style="font-size:31px;line-height:1.35;font-weight:500;color:${theme.muted};margin-top:12px">${project.description}</div>
<div style="display:flex;gap:12px;margin-top:auto">${tags}</div>
</div></body>`;
}

// Start from empty folders so a project dropped from the list leaves no image behind
const workDir = join(OUTPUT_DIR, ".work");
for (const dir of [workDir, ...Object.keys(THEMES).map(themeName => join(OUTPUT_DIR, themeName))]) {
	rmSync(dir, { recursive: true, force: true });
}
mkdirSync(workDir, { recursive: true });

try {
	for (const [index, project] of PROJECTS.entries()) {
		const copy = [project.name, project.kind, project.description, ...project.tags].join(" ");
		if (FORBIDDEN_COPY.test(copy)) {
			throw new Error(`${project.name}: the wording contains a link or contact detail`);
		}

		const screenshotPath = join(workDir, `${project.key}.png`);
		chrome(join(workDir, `profile-${project.key}`), 1440, 900, 30000, screenshotPath, project.url);

		for (const [themeName, theme] of Object.entries(THEMES)) {
			const themeDir = join(OUTPUT_DIR, themeName);
			mkdirSync(themeDir, { recursive: true });

			const number = String(index + 1).padStart(2, "0");
			const htmlPath = join(workDir, `${project.key}-${themeName}.html`);
			const pngPath = join(workDir, `${project.key}-${themeName}.png`);
			writeFileSync(htmlPath, cardHtml(project, theme, screenshotPath));
			chrome(join(workDir, `profile-${project.key}-${themeName}`), 1200, 900, 4000, pngPath, `file://${htmlPath}`);
			execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "88", pngPath, "--out", join(themeDir, `${number}-${project.key}.jpg`)], { stdio: "ignore" });
		}
		console.log(`Rendered ${project.name}`);
	}
} finally {
	rmSync(workDir, { recursive: true, force: true });
}
