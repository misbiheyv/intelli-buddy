import path from "path";
import { readFileSync, writeFileSync } from "fs";

import { asyncHandlebars } from "./core/handlebars";
import { langs } from "./core/ai-buddy";

export async function processFile(filePath: string) {
	const
		resolvedPath = path.resolve(filePath),
		fileData = readFileSync(resolvedPath, 'utf-8'),
		template = asyncHandlebars.compile(fileData);

	const
		processedData = await template({showDiff: false});

	writeFileSync(resolvedPath, processedData);
}

export function addLangs(dict: Dictionary) {
	Object.assign(langs, dict);
}
