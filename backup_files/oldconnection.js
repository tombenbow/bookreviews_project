const knex = require('knex'); //this is just like requiring axios, it isnt an import. 
const dbConfig = require('../knexfile');

const connection = knex(dbConfig);

module.exports = connection;