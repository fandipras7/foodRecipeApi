const express = require('express')
const router = express.Router()
const recipesController = require('../controller/recipes')
const { upload } = require('../middleware/upload')

router.get('/', recipesController.getData)
router.post('/', upload.single('image'), recipesController.addData)
router.put('/:id', upload.single('image'), recipesController.updateData)
router.delete('/:id', recipesController.deleteData)

module.exports = router
