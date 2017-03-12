const pg = require('pg');


/**
 * @type {DataBase}
 */
module.exports = class DataBase {
	constructor(config) {
		/**
		 * @type {Object}
		 * @private
		 */
		this._config = config;
	}

	/**
	 * @param {string} str
	 * @return {Promise<Result>}
	 */
	query(str) {
		return new Promise((resolve, reject) => {
			const client = this._createClient();
			client.on('drain', () => client.end());
			client.on('error', reject);

			client.connect();

			this._query(client, str)
				.then(resolve, reject);
		});
	}

	/**
	 * @param {Array<string>} stringList
	 * @return {Promise<Array<Result>>}
	 */
	queryAll(stringList) {
		return new Promise((resolve, reject) => {
			const results = [];
			return stringList
				.reduce((promise, str, index) => {
					return promise
						.then((result) => {
							if (index) {
								results.push(result);
							}

							return this.query(str);
						})
				}, Promise.resolve())
				.then((result) => results.push(result))
				.then(() => resolve(results), reject);
		});
	}
	/**
	 * @return {Client}
	 * @private
	 */
	_createClient() {
		return new pg.Client({
			user: this._config.user,
			password: this._config.password,
			database: this._config.database,
			host: this._config.host,
			port: this._config.port
		});
	}

	/**
	 * @param {Client} client
	 * @param {string} query
	 * @return {Promise<Result>}
	 * @private
	 */
	_query(client, query) {
		return new Promise((resolve, reject) => {
			client.query(query, function(err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
};
