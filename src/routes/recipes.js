const express = require('express')
const router = express.Router()
const recipesController = require('../controller/recipes')
const { upload } = require('../middleware/upload')

router.get('/', recipesController.getData)
router.get('/:idRecipe', recipesController.getData)
router.post('/', upload, recipesController.addData)
router.put('/:id', upload, recipesController.updateData)
router.delete('/:id', recipesController.deleteData)

module.exports = router
