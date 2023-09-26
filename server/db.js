const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
   user: process.env.DB_USERNAME,
   password: process.env.PASSWORD,
   host: process.env.HOST,
   port: process.env.DBPORT,
   database: process.env.DATABASE,
   keepAlive: true,
   ssl: 'no-verify'
});

module.exports = pool;
