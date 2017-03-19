const Errors = require('../../errors');

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
						row.authors.forEach((authorId) => authorIds[authorId] = null);

						return {
							id: row.id,
							title: row.title,
							authors: row.authors
						}
					});

					const authorIdsQuery = Object.keys(authorIds).join(',');
					return db.query(`SELECT id,name,last_name FROM authors WHERE id = ANY(ARRAY[${authorIdsQuery}]);`);
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
			const authors = req.query['authors'];
			if (!title || !(authors && authors.length)) {
				return res.status(400).send(Errors.getError(Errors.codes.INPUT_DATA_IS_EMPTY));
			}

			return Promise.resolve()
				.then(() => db.query(`SELECT name FROM authors WHERE id = ANY(ARRAY[${authors}]);`))
				.then((result) => {
					if (result.rows.length === authors.length) {
						return Promise.resolve();
					} else {
						return Promise.reject(Errors.getError(Errors.codes.NOT_FIND_ITEM_IN_DATABASE));
					}
				})
				.then(() => db.query(`INSERT INTO books (title, authors) VALUES (${title}, ${authors.join(',')});`))
				.then((result) => res.status(200).send())
				.catch((err) => res.status(400).send(err))
		}
	};
};
