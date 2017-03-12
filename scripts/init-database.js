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
			.then(() => database.query('DROP TABLE library'))

			.then(() => database.query('CREATE TABLE books (id INTEGER, title TEXT);'))
			.then(() => database.query('INSERT INTO books (id, title) VALUES (1, \'Tom Sawyer\');'))
			.then(() => database.query('INSERT INTO books (id, title) VALUES (2, \'Geklberi Finn\');'))

			.then(() => database.query('CREATE TABLE authors (id INTEGER, name TEXT);'))
			.then(() => database.query('INSERT INTO authors (id, name) VALUES (1, \'Mark Twain\');'))

			.then(() => database.query('CREATE TABLE library (id INTEGER, author_id INTEGER, book_id INTEGER);'))
			.then(() => database.query('INSERT INTO library (id, author_id, book_id) VALUES (1, 1, 1);'))
			.then(() => database.query('INSERT INTO library (id, author_id, book_id) VALUES (2, 1, 2);'))
			.then(() => process.exit(0));
	} else {
		process.exit(0);
	}
});
