const Routes = require('./router');
const config = require('../../config').server;
const express = require('express');


/**
 * @type {API}
 */
module.exports = class API {
	/**
	 * @param {DataBase} db
	 */
	constructor(db) {
		const app = express();

		this._routes = new Routes(app, db);

		app.listen(config.port, (a, b, c) => console.log(a, b, c));
	}
};
