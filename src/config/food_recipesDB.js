const { Pool } = require('pg')
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'food_recipe',
//   password: 'kloppo2015',
//   port: 5432
// })

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
  // ssl: {
  //   rejectUnauthorized: false
  // }
})

module.exports = pool
