const pool = require('../config/db')

exports.selectCategory = () => {
  return new Promise((resolve, reject) => {
    pool.query(('SELECT*FROM category'), (err, result) => {
      if (!err) {
        resolve(result.rows)
      } else {
        reject(err)
      }
    })
  })
}

exports.insertCategory = (name) => {
  return pool.query('INSERT INTO category (name)VALUES($1)', [name])
}

exports.updateCategory = ({ name, id }) => {
  return pool.query('UPDATE category SET name = $1 WHERE id = $2', [name, id])
}

exports.deleteCategory = (id) => {
  return pool.query('DELETE FROM category WHERE id = $1', [id])
}
