const DataBase = require('../lib/data-base');
const databaseConfig = require('../config').database;
const readLine = require('readline');

const database = new DataBase(databaseConfig);
const rl = readLine.createInterface(process.stdin, process.stdout);

rl.question('Tables will be dropped. You are sure? (y/N): ', function(ask) {
	if (ask === 'y') {
		Promise.resolve()
			.then(() => database.query('DROP TABLE books'))
			.then(() => database.query('DROP TABLE authors'))
			.catch((err) => console.warn(String(err)))

			.then(() => database.query(`CREATE TABLE authors (id SERIAL, name TEXT, last_name TEXT);`))
			.then(() => database.query(`INSERT INTO authors (name, last_name) VALUES ('Mark', 'Twain');`))

			.then(() => database.query(`CREATE TABLE books (id SERIAL, title TEXT, authors INTEGER[]);`))
			.then(() => database.query(`INSERT INTO books (title, authors) VALUES ('Tom Sawyer', ARRAY[1]);`))
			.then(() => database.query(`INSERT INTO books (title, authors) VALUES ('Geklberi Finn', ARRAY[1]);`))

			.then(() => process.exit(0))
			.catch((err) => {
				console.error(String(err));
				process.exit(1);
			});
	} else {
		process.exit(0);
	}
});
