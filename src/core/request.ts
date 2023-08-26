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
		{url, method, headers, body: rawBody} = Config.requestConfig,
		body = Handlebars.compile(JSON.stringify(rawBody))({prompt})
			.replace(/\\/g, '\\\\')
			.replace(/\n/g, '\\n')
			.replace(/\t/g, '\\t');

	return fetch(url, {headers, method, body})
		.then((res) => res.json())
		.then((res) => {
			const
				responseConfig = Config.responseConfig,
				successStatus = responseConfig.successStatus ?? [200];

			if (
				responseConfig.statusCodePath &&
				responseConfig.errorPath &&
				getField(res, responseConfig.statusCodePath) &&
				getField(res, responseConfig.errorPath) &&
				!successStatus.includes(Number(getField(res, responseConfig.statusCodePath)))
			) {
				console.error(new Error(getField(res, responseConfig.errorPath)));
				return errorMessage;
			}

			return getField(res, responseConfig.contentPath);
		});
}
