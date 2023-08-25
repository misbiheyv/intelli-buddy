import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { asyncHandlebars } from 'core/handlebars';
import request from 'core/request';

/**
 * Processes the file and rewrites it with improvements
 *
 * @param filePath
 * @param [showDiff]
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
 * Processes the content and returns it with improvements
 *
 * @param content
 */
export async function processData(content: string): Promise<string> {
	return request(content);
}

export type { AIConfig } from 'core/config';
