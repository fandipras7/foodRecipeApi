const { response } = require('../helper/common')
const createError = require('http-errors')
// const orderDetails = require('../models/order_detail')
const modelOrderDetails = require('../models/order_detail')

const getDetailsOrder = async (req, res, next) => {
  try {
    const { rows: order } = await modelOrderDetails.select()
    response(res, order, 200, 'Transaksi berhasil')
  } catch (error) {
    console.log(error)
    next(createError.InternalServerError)
  }
}

module.exports = getDetailsOrder
