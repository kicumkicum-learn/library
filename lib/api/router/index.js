const routes = require('./routes');

/**
 * @type {Router}
 */
module.exports = class Router {
	/**
	 * @param {Object} expressApp
	 * @param {DataBase} db
	 */
	constructor(expressApp, db) {
		const route = /** @type {Routes} */(routes.create(db));

		expressApp.get('/books', (...args) => route.books.get(...args));
		expressApp.post('/books', (...args) => route.books.post(...args));

		expressApp.get('/authors', (...args) => route.authors.get(...args));
		expressApp.post('/authors', (...args) => route.authors.get(...args));

		expressApp.get('/coauthored-books', (...args) => route.coauthoredBooks.get(...args));
	};
};
