const RestAPI = require('./api');
const DataBase = require('./data-base');

const config = require('../config');
const db = new DataBase(config.database);

let api = null;

db.init()
	.then(() => api = new RestAPI(db));
