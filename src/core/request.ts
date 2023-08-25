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
			.replace(/\\/g, '\\\\')
			.replace(/\n/g, '\\n')
			.replace(/\t/g, '\\t');

	return fetch(url, {headers, method, body})
		.then((res) => res.json())
		.then((res) => {
			const
				c = new Config().responseConfig,
				successStatus = c.successStatus ?? [200];

			if (
				c.statusCodePath &&
				c.errorPath &&
				getField(res, c.statusCodePath) &&
				getField(res, c.errorPath) &&
				!successStatus.includes(Number(getField(res, c.statusCodePath)))
			) {
				console.error(new Error(getField(res, c.errorPath)));
				return errorMessage;
			}

			return getField(res, c.contentPath);
		});
}
