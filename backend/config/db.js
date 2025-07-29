const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool instead of a single connection for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// We export the promise-based version of the pool to use async/await elsewhere
module.exports = pool.promise();