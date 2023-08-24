import { readFileSync } from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { getField } from '../helpers';

export function request(prompt) {
	const
		config = JSON.parse(readFileSync(path.resolve('ai-config.json'), 'utf-8')),
		{url, method, headers, responsePath} = config,
		body = Handlebars.compile(JSON.stringify(config.body))({prompt}).replace(/\n/g, '\\n');

	return fetch(url, {
		method,
		headers,
		body
	})
		.then((res) => res.json())
		.then((res) => getField(res, responsePath));
}
