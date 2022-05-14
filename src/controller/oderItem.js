const modelsOrderItems = require('../models/orderItems')
const createError = require('http-errors')
const errorMessage = new createError.InternalServerError()

exports.getOrderItems = (req, res, next) => {
  modelsOrderItems.select()
    .then((result) => {
      console.log(result.rows)
      res.json({
        data: result.rows
      })
    })
    .catch((error) => {
      console.log(error)
      next(errorMessage)
    })
}

exports.addOrderItems = (req, res, next) => {
  const orderId = req.body.orderId
  const productId = req.body.productId
  const qty = req.body.qty
  const data = {
    orderId,
    productId,
    qty
  }
  modelsOrderItems.insert(data)
    .then((result) => {
      res.json({
        message: 'Data berhasil ditambahkan'
      })
    })
    .catch((error) => {
      console.log(error)
      next(errorMessage)
    })
}

exports.deleteOrderItems = (req, res, next) => {
  const id = req.params.idOrder
  modelsOrderItems.delete(id)
    .then(() => {
      res.json({
        message: 'data berhasil di hapus'
      })
    })
    .catch((error) => {
      console.log(error)
      next(errorMessage)
    })
}

exports.updateOrderitems = (req, res, next) => {
  const id = req.params.id
  const { productId, qty } = req.body
  const data = {
    id,
    productId,
    qty
  }
  modelsOrderItems.update(data)
    .then(() => {
      res.json({
        message: 'Data berhasil diupdate'
      })
    })
    .catch((error) => {
      console.log(error)
      next(errorMessage)
    })
}
