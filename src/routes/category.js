const express = require('express')
const routerCategory = express.Router()
const categoryController = require('../controller/category')
const { protect } = require('../middleware/auth')

routerCategory.get('/', categoryController.getData)
routerCategory.post('/', protect, categoryController.addData)
routerCategory.put('/:idCategory', categoryController.updateData)
routerCategory.delete('/:id', categoryController.deleteData)

module.exports = routerCategory
