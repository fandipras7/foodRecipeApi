const pool = require('../config/db')

const modelsOrderItems = {
  select: () => {
    return pool.query(`SELECT order_items.id, order_items.order_id, order_items.product_id, order_items.quantity,
    products.id AS id_product, products.name, products.brand, products.size, products.color,
    products.price FROM order_items JOIN products on order_items.product_id = products.id`)
  },
  insert: ({ orderId, productId, qty }) => {
    return pool.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)', [orderId, productId, qty])
  },
  delete: (id) => {
    return pool.query('DELETE FROM order_items WHERE id = $1', [id])
  },
  update: ({ id, productId, qty }) => {
    return pool.query('UPDATE order_items set product_id = $1, quantity = $2 WHERE id = $3', [productId, qty, id])
  }
}

module.exports = modelsOrderItems
