const pool = require('../config/db')

const orderDetails = {
  select: () => {
    return new Promise((resolve, reject) => {
      return pool.query('SELECT order_details.id, total, provider, users.name FROM order_details INNER JOIN users on order_details.users_id = users.id INNER JOIN payment on order_details.payment_id = payment.id', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
  // insert: ({ orderId, productId, qty }) => {
  //   return pool.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)', [orderId, productId, qty])
  // },
  // delete: (id) => {
  //   return pool.query('DELETE FROM order_items WHERE id = $1', [id])
  // },
  // update: ({ id, productId, qty }) => {
  //   return pool.query('UPDATE order_items set product_id = $1, quantity = $2 WHERE id = $3', [productId, qty, id])
  // }
}

module.exports = orderDetails
