const DataBase = require('../lib/data-base');
const databaseConfig = require('../config').database;

const database = new DataBase(databaseConfig);

Promise.resolve()
	.then(() => database.query('CREATE TABLE books (id INTEGER, title TEXT);'))
	.then(() => database.query('INSERT INTO books (id, title) VALUES (1, \'Tom Sawyer\');'))
	.then(() => database.query('INSERT INTO books (id, title) VALUES (2, \'Geklberi Finn\');'))

	.then(() => database.query('CREATE TABLE authors (id INTEGER, name TEXT);'))
	.then(() => database.query('INSERT INTO authors (id, name) VALUES (1, \'Mark Twain\');'))

	.then(() => database.query('CREATE TABLE library (id INTEGER, authorId INTEGER, bookId INTEGER);'))
	.then(() => database.query('INSERT INTO library (id, authorId, bookId) VALUES (1, 1, 1);'));
