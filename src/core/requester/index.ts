import {fetchStrategy} from './fetchStrategy';
import {httpStrategy} from './httpStrategy';
import {RequestConfig} from './interface';

export { RequestConfig } from './interface';

export function request<T>(config: RequestConfig): Promise<T | Error> {
	try {
		fetch('http://google.com');

	} catch {
		return httpStrategy(config);
	}

	return fetchStrategy(config);
}
