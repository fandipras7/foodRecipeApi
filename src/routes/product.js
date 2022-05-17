const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
const { upload } = require('../middleware/upload')
const { protect, isAdmin } = require('../middleware/auth')

router.get('/', /* protect , */ productController.getData)
router.get('/:idProduct', /* protect, */ productController.getData)
router.post('/', protect, upload.single('photo'), productController.addData)
router.put('/:id', protect, upload.single('photo'), productController.updateData)
router.delete('/:idProduct', protect, productController.deleteData)

module.exports = router
