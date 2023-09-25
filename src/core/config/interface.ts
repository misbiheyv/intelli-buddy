export interface AIConfig {
	request: RequestConfig;

	response: ResponseConfig;

	prompts?: Dictionary<string>;

	langs?: Dictionary<string>;
}

export interface RequestConfig {
	url: string;

	method: string;

	body: string;

	headers?: Dictionary<string>;
}

export interface ResponseConfig {
	contentPath: string;

	errorPath?: string;

	statusCodePath?: string;

	successStatus?: number[];
}
