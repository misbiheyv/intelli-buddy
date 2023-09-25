import {getField} from 'core/helpers';
import {errorMessage} from 'core/const';
import {Config} from 'core/config';

export function handleResult(res) {
	const
		responseConfig = Config.responseConfig,
		successStatus = responseConfig.successStatus ?? [200];

	if (
		responseConfig.statusCodePath &&
		responseConfig.errorPath &&
		getField(res, responseConfig.statusCodePath) &&
		getField(res, responseConfig.errorPath) &&
		!successStatus.includes(Number(getField(res, responseConfig.statusCodePath)))
	) {
		console.error(new Error(getField(res, responseConfig.errorPath)));
		return errorMessage;
	}

	return getField(res, responseConfig.contentPath);
}
