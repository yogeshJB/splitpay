const mysql = require('mysql2/promise');
require('dotenv').config();

async function setup() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  console.log('Database created or already exists.');
  process.exit();
}

setup().catch(err => {
  console.error(err);
  process.exit(1);
});
