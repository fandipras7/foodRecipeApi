const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
const upload = require('../middleware/upload')

router.get('/', productController.getData)
router.get('/:idProduct', productController.getData)
router.post('/', upload.single('photo'), productController.addData)
router.put('/:id', productController.updateData)
router.delete('/:idProduct', productController.deleteData)

module.exports = router
