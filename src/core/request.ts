import {getField} from 'core/helpers';
import { Config } from 'core/config';
import Handlebars from 'handlebars';

/**
 * Builds a fetch options from the `ai-config.json` and makes request
 *
 * @param prompt
 */
export default async function request(prompt: string): Promise<string> {
	const
		{url, method, headers, body: rawBody} = new Config().requestConfig,
		body = Handlebars.compile(JSON.stringify(rawBody))({prompt}).replace(/\n/gu, '\\n').replace(/\t/gu, '\\t');

	return fetch(url, {headers, method, body})
		.then((res) => res.json())
		.then((res) => {
			const
				c = new Config().responseConfig;

			if (getField(res, c.statusCodePath) === null || getField(res, c.statusCodePath) < 300) {
				return getField(res, c.contentPath);
			}

			throw Error(`Server message:\n${getField(res, c.errorPath)}`);
		})
		.catch(err => {
			console.error(err);
		});
}
