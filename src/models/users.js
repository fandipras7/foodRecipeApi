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

const addDataRegister = ({ id, name, email, password, roleId }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users(id, name, email, password, role_id)VALUES($1, $2, $3, $4, $5)', [id, name, email, password, roleId], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const setStatus = (status, email) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE users SET status = $1 WHERE email = $2', [status, email], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { checkEmail, addDataRegister, setStatus }
