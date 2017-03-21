import utils from './utils';

export class ApiTransport {
	/**
	 * @param {string} baseUrl
	 * @param {number} timeout
	 */
	constructor(baseUrl, timeout) {
		/**
		 * @type {string}
		 * @private
		 */
		this._baseUrl = baseUrl;

		/**
		 * @type {number}
		 * @private
		 */
		this._timeout = timeout;
	}

	/**
	 * @param {string} url
	 * @param {{
	 *      method: (ApiTransport.Method|undefined),
	 *      data: (Object|undefined),
	 *      headers: (Object|undefined),
	 *      timeout: (number|undefined)
	 * }=} opt_options
	 */
	request(url, opt_options) {
		const options = opt_options || {};
		const method = options || 'GET';
		let data = null;

		if (options.data) {
			if (method === 'GET') {
				url = utils.addQueryParams(url, options.data);
			} else {
				data = utils.buildQueryString(options.data);
			}
		}

		const fetchParams = {
			method: method,
			headers: new Headers(options.headers || {}),
			body: data
		};

		const fetchPromise = fetch(url, fetchParams)
			.then(function(response) {
				return response.json();
			});

		return utils.timeoutifyPromise(options.timeout || this._timeout, fetchPromise, 'request timeout');
	}
}


/**
 * @enum {string}
 */
ApiTransport.Method = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
};
