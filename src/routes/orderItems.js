const express = require('express')
const router = express.Router()
const orderItemsController = require('../controller/oderItem')

router.get('/', orderItemsController.getOrderItems)
router.post('/', orderItemsController.addOrderItems)
router.delete('/:idOrder', orderItemsController.deleteOrderItems)
router.put('/:id', orderItemsController.updateOrderitems)

module.exports = router
