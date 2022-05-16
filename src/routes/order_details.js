const express = require('express')
const getDetailsOrder = require('../controller/order_details')
const router = express.Router()
// const orderItemsController = require('../controller/oderItem')

router.get('/', getDetailsOrder)
// router.post('/', orderItemsController.addOrderItems)
// router.delete('/:idOrder', orderItemsController.deleteOrderItems)
// router.put('/:id', orderItemsController.updateOrderitems)

module.exports = router
