const Routes = require('./router');
const express = require('express');


/**
 * @type {API}
 */
module.exports = class API {
	/**
	 * @param {Object} config
	 * @param {DataBase} db
	 */
	constructor(config, db) {
		/**
		 * @type {*}
		 * @private
		 */
		this._app = express();

		/**
		 * @type {Object}
		 * @private
		 */
		this._config = config;

		this._routes = new Routes(this._app, db);
		this._app.on('error', () => this._init());
	}

	/**
	 * @private
	 */
	_init() {
		this._app.listen(this._config.port, (a, b, c) => console.log(a, b, c));
	}
};
