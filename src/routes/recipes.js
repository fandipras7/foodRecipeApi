const express = require('express')
const router = express.Router()
const recipesController = require('../controller/recipes')
const { protect } = require('../middleware/auth')
const { upload } = require('../middleware/upload')

router.get('/', recipesController.getData)
router.get('/:idRecipe', recipesController.getData)
router.get('/myrecipe', protect, recipesController.getMyRecipe)
router.post('/', protect, upload, recipesController.addData)
router.put('/:id', protect, upload, recipesController.updateData)
router.delete('/:id', recipesController.deleteData)

module.exports = router
