/**
 * @param {DataBase} db
 * @return {IRoute}
 */
module.exports = (db) => {
	return {
		get: function(incomingMessage) {
			if (Object.keys(incomingMessage.query).length) {
				return this.post(incomingMessage, incomingMessage.res);
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
		},
		post: function(req, res) {
			const title = req.query['title'];
			const author = req.query['author'];
			if (!title && !author) {
				return res.status(400)
					.send('Input data is empty');
			}

			return db
				.query('INSERT INTO books (id, title) VALUES ();')
				.then((result) => res.send(200))
		}
	};
};
