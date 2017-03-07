const pg = require('pg');


/**
 * @type {DataBase}
 */
module.exports = class DataBase {
	constructor(config) {
		/**
		 * @type {Client}
		 * @private
		 */
		this._client = new pg.Client({
			user: config.user,
			password: config.password,
			database: config.database,
			host: config.host,
			port: config.port
		});

		this._client.on('error', (err) => this._onError(err));
	}

	/**
	 * @return {Promise<undefined>}
	 */
	init() {
		return new Promise((resolve, reject) => {
			this._client.connect((err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	/**
	 * @param {Object} config
	 * @param {*} values
	 * @return {Promise<undefined>}
	 */
	query(config, values) {
		return new Promise((resolve, reject) => {
			const query = this._client.query(config, values, (err, result) => {
				if (err) {
					reject(err);
				}

				this._client.end((err) => {
					if (err) {
						this._onError(err);
					} else {
						resolve();
					}
				});
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
