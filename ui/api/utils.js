const utils = {};

utils.timeoutifyPromise = (timeout, promise, errMessage) => {
	return new Promise((resolve, reject) => {
		const timeoutId = setTimeout(() => reject(new Error(errMessage)), timeout);
		promise
			.then((result) => {
				clearTimeout(timeoutId);
				resolve(result);
			})
			.catch((err) => {
				clearTimeout(timeoutId);
				reject(err);
			});
	});
};


/**
 * @param {!Object} queryObject
 * @return {string}
 */
utils.buildQueryString = function(queryObject) {
	return Object
		.keys(queryObject)
		.map(function(key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(queryObject[key]);
		})
		.join('&');
};


/**
 * @param {string} url
 * @param {!Object} queryObject
 * @return {string}
 */
utils.addQueryParams = function(url, queryObject) {
	const queryString = utils.buildQueryString(queryObject);

	if (queryString) {
		url += (url.indexOf('?') === -1 ? '?' : '&') + queryString;
	}

	return url;
};


export default utils;
