import path from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

import { asyncCompile } from 'core/templates-processor';
import { Config } from 'core/config';
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
		template = asyncCompile(fileData);

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

/**
 * Sets the path to the configuration file
 *
 * @param path
 */
export function setConfigPath(path: string) {
	if (path != null && existsSync(path)) {
		Config.path = path;
	}
}

/**
 * Path to the configuration file
 */
export function getConfigPath() {
	return Config.path;
}

export type { AIConfig } from 'core/config';
