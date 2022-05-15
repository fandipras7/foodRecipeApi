const pool = require('../config/db')
const addDataSeller = ({ id, name, email, password, phoneNumber, storeName }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users(id, name, email, password, phone_number, store_name)VALUES($1, $2, $3, $4)', [id, name, email, password, phoneNumber, storeName], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = addDataSeller
