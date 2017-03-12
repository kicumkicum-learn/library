/**
 * @type {Router}
 */
module.exports = class Router {
	/**
	 * @param {Object} expressApp
	 * @param {DataBase} db
	 */
	constructor(expressApp, db) {
		expressApp.get('/books', (incomingMessage) => {
			if (Object.keys(incomingMessage.query).length) {
				return incomingMessage.next();
			}
			db.query('SELECT * FROM books')
				.then((result) => {
					const rows = result.rows || [];
					const books = rows.map((row) => {
						return {
							id: row.id,
							title: row.title,
							authors: row.authors
						}
					});
					incomingMessage.res.send(books);
				})
		});
		expressApp.post('/books', (req, res) => {
			const params = {
				title: req.query.name,
				author: req.query.author
			};
			return db.query('INSERT INTO books (id, title) VALUES ();')
		});

		expressApp.get('/authors', (incomingMessage) => {
			let authors = [];
			db.query('SELECT id,name FROM authors')
				.then((result) => {
					const rows = result.rows || [];
					const authors = rows.map((row) => {
						return {
							id: row.id,
							name: row.name
						};
					});
					return incomingMessage.res.send(authors);
				});
		});
		expressApp.post('/authors', (res, req) => {});

		expressApp.use('/coauthored-books', (res, req) => {});
	};
};
