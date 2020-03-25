const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection; //exporto esta conexion como modulo para ser usado en el js principa