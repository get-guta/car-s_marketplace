// PG database client/connection setup
require('dotenv').config();
const { Pool } = require('pg');


const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
};

const db = new Pool(dbConfig);

db.connect();

module.exports = db;
