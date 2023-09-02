import path from 'path';
import {readFileSync} from 'fs';
import type {AIConfig, RequestConfig, ResponseConfig} from './interface';

/**
 * Access to the configuration file `.ai-config.json`
 */
export default abstract class Config {
	/**
	 * Store the config
	 */
	protected static config: AIConfig;

	/**
	 * Request configuration
	 */
	static get requestConfig(): RequestConfig {
		this.updateConfig();

		const
			{url, method, headers, body} = this.config.request;

		return {url, method, headers, body};
	}

	/**
	 * Response configuration
	 */
	static get responseConfig(): ResponseConfig {
		this.updateConfig();
		return this.config.response;
	}

	/**
	 * Dictionary where keys are custom arguments names and values are prompts
	 */
	static get prompts(): CanUndef<Dictionary<string>> {
		this.updateConfig();
		return this.config.prompts;
	}

	/**
	 * Dictionary where keys are shortcuts and values are languages
	 */
	static get langs(): CanUndef<Dictionary<string>> {
		this.updateConfig();
		return this.config.langs;
	}

	/**
	 * Updates local config
	 */
	protected static updateConfig() {
		this.config = JSON.parse(readFileSync(path.resolve('.ai-config.json'), 'utf-8'));
	}
}
