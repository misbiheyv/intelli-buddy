export interface AIConfig {
	request: RequestConfig;

	response: ResponseConfig;

	prompts?: Dictionary<string>;

	langs?: Dictionary<string>;

	tag?: Tag;
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

export interface Tag {
	opening: {
		start: string;
		end: string;
	}

	closing: {
		start: string;
		end: string;
	}
}
