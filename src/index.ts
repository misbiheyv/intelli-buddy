import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { asyncHandlebars } from './core/handlebars';
import { langs } from './core/ai-buddy';


/**
 * Processes the file and rewrites it with improvements
 *
 * @param filePath
 * @param showDiff
 */
export async function processFile(filePath: string, showDiff: boolean = false) {
	const
		resolvedPath = path.resolve(filePath),
		fileData = readFileSync(resolvedPath, 'utf-8'),
		template = asyncHandlebars.compile(fileData);

	const
		processedData = await template({showDiff});

	writeFileSync(resolvedPath, processedData);
}


/**
 * Add languages to the dictionary e.g., {'pt': 'portuguese'}
 * After this, you can use them as shortcuts in templates: {{\#ai lang="pt"}}...{{\/ai}}
 *
 * @param dict
 */
export function addLangs(dict: Dictionary) {
	Object.assign(langs, dict);
}

/**
 * Returns the list of supported shortcuts languages
 */
export function langsList() {
	return Object.freeze({...langs});
}
