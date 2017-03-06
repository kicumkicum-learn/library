const RestAPI = require('./api');
const DataBase = require('./data-base');

const db = new DataBase;
const api = new RestAPI(db);
