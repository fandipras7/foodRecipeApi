const pool = require('../config/db')
const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const addDataRegister = ({ id, name, email, password }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users(id, name, email, password)VALUES($1, $2, $3, $4)', [id, name, email, password], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { checkEmail, addDataRegister }
