import {Config} from 'core/config';
import {errorMessage} from 'core/const';
import {syncCompile} from './templates-processor';
import * as requester from './requester';

/**
 * Builds a fetch options from the `.ai-config.json` and makes request
 *
 * @param prompt
 */
export default async function request(prompt: string): Promise<string> {
	// TODO Refactor this method
	const
		{url, method, headers, body: rawBody} = Config.requestConfig,
		body = syncCompile(JSON.stringify(rawBody))({prompt})
			.replace(/\\/g, '\\\\')
			.replace(/\n/g, '\\n')
			.replace(/\t/g, '\\t');

	try {
		const res = await requester.request<string>({url, headers, method, body});

		if (typeof res === 'string') {
			return res;
		}

		throw res;

	} catch (error) {
		return errorMessage;
	}
}
