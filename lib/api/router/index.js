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

			let books = [];
			const authorIds = {};

			db.query('SELECT * FROM books')
				.then((result) => {
					const rows = result.rows || [];
					books = rows.map((row) => {
						row.authors.forEach((author) => authorIds[author] = null);

						return {
							id: row.id,
							title: row.title,
							authors: row.authors
						}
					});

					const authorIdsQuery = Object.keys(authorIds).join(',');
					return db.query(`SELECT id, name, last_name FROM authors WHERE id = ANY (ARRAY[${authorIdsQuery}]);`);
				})
				.then((result) => {
					const rows = result.rows || [];
					rows.forEach((row) => authorIds[row['id']] = `${row['name']} ${row['last_name']}`);
					books.forEach((book) => {
						book.authors = book.authors.map((authorId) => authorIds[authorId]);
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
			if (Object.keys(incomingMessage.query).length) {
				return incomingMessage.next();
			}

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
		expressApp.post('/authors', (res, req) => {
			const params = {
				name: req.query.name
			};
			return db.query(`INSERT INTO authors (name) VALUES (${params.name});`);
		});

		expressApp.use('/coauthored-books', (res, req) => {});
	};
};
