import {getField} from './helpers';
import { Config } from './config';
import Handlebars from 'handlebars';

/**
 * Builds a fetch options from the `ai-config.json` and makes request
 *
 * @param {string} prompt
 */
export default async function request(prompt: string): Promise<string> {
	const
		{url, method, headers, body: rawBody} = new Config().requestConfig,
		body = Handlebars.compile(JSON.stringify(rawBody))({prompt}).replace(/\n/g, '\\n');

	return fetch(url, {method, headers, body})
		.then((res) => res.json())
		.then((res) => getField(res, new Config().responsePath));
}
