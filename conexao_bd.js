const pgp = require('pg-promise')();
const DB_HOST = 'localhost';
const DB_PORT = '5432';
const DB_USER = 'postgres';
const DB_PWD = 'batata';
const DB_NAME = 'projeto_final';
const strconn = `postgres://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const db_conn = pgp(strconn);
module.exports = db_conn;