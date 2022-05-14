const express = require('express')
const routerCategory = express.Router()
const categoryController = require('../controller/category')

routerCategory.get('/', categoryController.getData)
routerCategory.post('/', categoryController.addData)
routerCategory.put('/:idCategory', categoryController.updateData)
routerCategory.delete('/:id', categoryController.deleteData)

module.exports = routerCategory
