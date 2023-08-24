import path from 'path';
import {readFileSync} from 'fs';
import type {AIConfig, RequestConfig} from './interface';

export default class Config {
	protected config: AIConfig;

	constructor() {
		this.config = JSON.parse(readFileSync(path.resolve('ai-config.json'), 'utf-8'));
	}

	get requestConfig(): RequestConfig {
		const
			{url, method, headers, body} = this.config.request;

		return {url, method, headers, body};
	}

	get responsePath(): string {
		return this.config.responsePath;
	}

	get prompts(): CanUndef<Dictionary<string>> {
		return this.config.prompts;
	}

	get langs(): CanUndef<Dictionary<string>> {
		return this.config.langs;
	}
}
