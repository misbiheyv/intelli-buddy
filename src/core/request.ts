import Handlebars from 'handlebars';
import {getField} from 'core/helpers';
import {Config} from 'core/config';
import {errorMessage} from 'core/const';

/**
 * Builds a fetch options from the `ai-config.json` and makes request
 *
 * @param prompt
 */
export default async function request(prompt: string): Promise<string> {
	// TODO Refactor this method
	const
		{url, method, headers, body: rawBody} = new Config().requestConfig,
		body = Handlebars.compile(JSON.stringify(rawBody))({prompt})
			.replace(/\\/gu, '\\\\')
			.replace(/\n/gu, '\\n')
			.replace(/\t/gu, '\\t');

	return fetch(url, {headers, method, body})
		.then((res) => res.json())
		.then((res) => {
			const
				c = new Config().responseConfig;

			if (
				c.statusCodePath &&
				c.errorPath &&
				getField(res, c.statusCodePath) &&
				getField(res, c.errorPath) &&
				(Number(getField(res, c.statusCodePath)) > 299 || Number(getField(res, c.statusCodePath)) < 200)
			) {
				console.error(getField(res, c.errorPath));
				return errorMessage;
			}

			return getField(res, c.contentPath);
		});
}
