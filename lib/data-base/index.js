const pg = require('pg');
module.exports = class DataBase {
	constructor() {
		const connectionString = 'postgres://postgres:postgresd@localhost:5432/postgres';

		const client = new pg.Client(connectionString);
		client.connect();

		const query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');

		query.on('end', () => {
			console.log('END');
			client.end();
		});

		client.on('error', console.error);
	}
};
