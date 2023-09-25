export interface RequestConfig {
	url: string;

	method: string;

	headers?: Dictionary<string>;

	body?: string;
}
