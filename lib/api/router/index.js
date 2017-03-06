/**
 * @type {Router}
 */
module.exports = class Router {
	/**
	 * @param {Object} expressApp
	 * @param {DataBase} db
	 */
	constructor(expressApp, db) {
		expressApp.get('/books', (res, req) => {});
		expressApp.post('/books', (res, req) => {});

		expressApp.get('/authors', (res, req) => {});
		expressApp.post('/authors', (res, req) => {});

		expressApp.use('/coauthored-books', (res, req) => {});
	};
};
