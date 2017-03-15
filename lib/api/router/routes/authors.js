/**
 * @param {DataBase} db
 * @return {IRoute}
 */
module.exports = (db) => {
	return {
		get: function(incomingMessage, res) {
			if (Object.keys(incomingMessage.query).length) {
				return this.post(...arguments);
			}

			let authors = [];
			return db
				.query('SELECT id,name FROM authors')
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
		},
		post: function(req, res) {
			const name = req.query['name'];
			const lastName = req.query['last_name'];
			if (!name && !lastName) {
				return res.status(400)
					.send('Input data is empty');
			}

			return Promise.resolve()
				.then(() => db.query(`SELECT name, last_name FROM authors WHERE name = '${name}' AND last_name = '${lastName}';`))
				.then((result) => {
					if (result.rows.length) {
						return Promise.reject({
							status: 409,
							message: 'Author already exists'
						});
					} else {
						return Promise.resolve();
					}
				})
				.then(() => db.query(`INSERT INTO authors (name, last_name) VALUES ('${name}', '${lastName}');`))
				.catch((result) => result)
				.then((result) => {
					let status = NaN;
					let message = '';

					if (result.severity === 'ERROR') {
						status = 500;
						message = 'Database error: ' + String(result);
					} else {
						status = result.status;
						message = result.message;
					}

					return res
						.status(status)
						.send(message);
				});
		}
	};
};
