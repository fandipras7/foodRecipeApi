const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'food_recipe',
  password: 'kloppo2015',
  port: 5432
})

module.exports = pool
