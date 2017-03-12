const RestAPI = require('./api');
const DataBase = require('./data-base');

const config = require('../config');
const db = new DataBase(config.database);

let api = new RestAPI(config.server, db);
