/**
 * @param {DataBase} db
 * @return {IRoute}
 */
module.exports = (db) => {
	return {
		get: function(incomingMessage, res) {
			if (Object.keys(incomingMessage.query).length) {
				this.post(...arguments);
			}

			incomingMessage.res.send('get.authors');
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
		},
		post: function(req, res) {
			const name = req.query['name'];
			const lastName = req.query['last_name'];
			if (!name && !lastName) {
				return res.status(400)
					.send('Input data is empty');
			}

			return Promise.resolve()
				.then(() => db.query(`SELECT name, last_name authors (name, last_name) WHERE name = '${name}' AND last_name = '${lastName}';`))
				.then((result) => {
					if(result.rows.length) {
						return Promise.reject({
							status: 409,
							message: 'Author already exists'
						});
					} else {
						return Promise.resolve();
					}
				})
				.then(() => db.query(`INSERT INTO authors (name, last_name) VALUES (${name}, ${lastName});`))
				.catch((result) => {
					let status = NaN;
					let message = '';

					if (result.status) {
						status = result.status;
						message = result.message;
					} else {
						status = 500;
						message = 'Database error';
					}

					return res.status(status)
						.send(message);
				});
		}
	};
};
