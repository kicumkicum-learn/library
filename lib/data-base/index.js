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
	 * @return {Promise<undefined>}
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
	 * @return {Promise<Object>}
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

	/**
	 * @param {string|Object} err
	 * @private
	 */
	_onError(err) {
		console.error(err);
		this.init();
	}
};
