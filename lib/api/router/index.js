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
			const books = [];
			db.query('SELECT id,title FROM books')
				.then((result) => {
					const rows = result.rows || [];
					rows.forEach((row) => books.push({
						id: row.id,
						title: row.title,
						authors: []
					}));
				})
				.then(() => {
					const list = books.map((book) => `SELECT id,book_id,author_id FROM library WHERE book_id = ${book.id}`);
					return db.queryAll(list);
				})
				.then((results) => {
					const rows = results.map((result) => result.rows);

					books.forEach((book, index) => {
						const bookRows = rows[index];
						bookRows.forEach((bookRow) => {
							if (book.id === bookRow['book_id']) {
								book.authors.push(bookRow['author_id']);
							}
						});
					});

					incomingMessage.res.send(books);
				}, (err) => incomingMessage.res.send(err));
		});
		expressApp.post('/books', (res, req) => {});

		expressApp.get('/authors', (res, req) => {});
		expressApp.post('/authors', (res, req) => {});

		expressApp.use('/coauthored-books', (res, req) => {});
	};
};
