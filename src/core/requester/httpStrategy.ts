import http, {RequestOptions} from 'node:http';
import https from 'node:https';

import {RequestConfig} from './interface';
import {handleResult} from './helpers';

export function httpStrategy<T>(config: RequestConfig): Promise<T | Error> {
	const
		url = new URL(config.url),
		protocol = url.protocol.includes('https') ? https : http;

	const options: RequestOptions = {
		hostname: url.hostname,
		path: url.pathname,
		method: config.method,
		headers: config.headers
	};

	/* eslint-disable no-unused-vars */
	let
		resolve: (value: T) => void,
		reject: (value: T | Error) => void;
	/* eslint-enable no-unused-vars */

	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});

	const req = protocol.request(options, (res) => {
		let result = '';

		res.setEncoding('utf8');
		res.on('data', (chunk) => result += chunk);
		res.on('end', () => resolve(handleResult(JSON.parse(result))));
	});

	req.on('error', (e) => reject(e));
	req.write(config.body);
	req.end();

	return promise;
}
