import * as fs from "fs/promises";
import * as path from "path";

import * as shiki from "shiki";

await fs.rm("dist", {
	force: true,
	recursive: true,
});
await fs.mkdir("dist");

const filenames = await fs.readdir("code");
for (const filename of filenames) {
	const filenameParts = filename.split("_");
	const title = filenameParts[0];
	const outputFilename = filenameParts[0] + ".html";
	let lang = "";
	if (filenameParts.length > 1) {
		lang = filenameParts[1];
	}
	const codeBytes = await fs.readFile(path.join("code", filename));
	const code = codeBytes.toString();

	const codeHTML = await shiki.codeToHtml(code, {
		lang,
		theme: "one-light",
	});

	const html = `<html><head><title>${title}</title></head><body style="background-color:#FAFAFA;tab-size:4;">${codeHTML}</body></html>`;

	await fs.writeFile(path.join("dist", outputFilename), html);
}
