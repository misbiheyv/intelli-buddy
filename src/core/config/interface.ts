export interface AIConfig {
	request: Dictionary<any>;

	responsePath: string;

	prompts?: Dictionary<string>;

	langs?: Dictionary<string>;
}

export interface RequestConfig {
	url: string;

	method: 'get' | 'post' | 'put';

	body: string;

	headers?: Dictionary<string>;
}
