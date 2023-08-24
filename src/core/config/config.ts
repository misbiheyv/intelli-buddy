import path from 'path';
import {readFileSync} from 'fs';
import type {AIConfig, RequestConfig} from './interface';

/**
 * Access to the configuration file `ai-config.json`
 */
export default class Config {
	/**
	 * Store the config
	 */
	protected config: AIConfig;

	constructor() {
		this.config = JSON.parse(readFileSync(path.resolve('ai-config.json'), 'utf-8'));
	}

	/**
	 * Request`s configuration
	 */
	get requestConfig(): RequestConfig {
		const
			{url, method, headers, body} = this.config.request;

		return {url, method, headers, body};
	}

	/**
	 * Path to necessary field in response
	 */
	get responsePath(): string {
		return this.config.responsePath;
	}

	/**
	 * Dictionary where keys are custom arguments names and values are prompts
	 */
	get prompts(): CanUndef<Dictionary<string>> {
		return this.config.prompts;
	}

	/**
	 * Dictionary where keys are shortcuts and values are languages
	 */
	get langs(): CanUndef<Dictionary<string>> {
		return this.config.langs;
	}
}
