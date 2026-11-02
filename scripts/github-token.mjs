// Writes GITHUB_TOKEN from .env.local into out/api/github-token.php after the build, so the token
// reaches the server inside the upload but never the browser. .htaccess in that folder blocks the file.

import { writeFileSync } from "node:fs";

const token = (process.env.GITHUB_TOKEN ?? "").trim();

if (!token) {
	console.warn("GITHUB_TOKEN is not set in .env.local, so the contribution graph will be unavailable");
	process.exit(0);
}

writeFileSync("out/api/github-token.php", `<?php return ${JSON.stringify(token)};\n`);
console.log("Wrote out/api/github-token.php");
