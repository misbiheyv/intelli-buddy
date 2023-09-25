import { RequestConfig } from './interface';
import { handleResult } from './helpers';

export function fetchStrategy<T>(config: RequestConfig): Promise<T | Error> {
	const {url, headers, method, body} = config;

	return fetch(url, {headers, method, body})
		.then((res) => res.json())
		.then(handleResult);
}
