import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { asyncHandlebars } from './core/handlebars';

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
