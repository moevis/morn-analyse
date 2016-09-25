var psql = require('pg-promise')();
var config = require('../config.json');
var db = psql(config.database);

console.log(config);
module.exports = db;