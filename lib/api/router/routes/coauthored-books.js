/**
 * @param {DataBase} db
 * @return {IRoute}
 */
module.exports = (db) => {
	return {
		get: function(incomingMessage, res) {
			return Promise.resolve()
				.then(() => db.query('SELECT title, authors FROM books WHERE array_length(authors, 1) > 1;'))
				.then((result) => {
					const rows = result.rows || [];
					const coAuthoredBooks = rows.map((row) => {
						return {
							'id': row['id'],
							'title': row['title'],
							'authors': row['authors'].length
						};
					});

					return res
						.status(200)
						.send(coAuthoredBooks);
				});
		}
	};
};
