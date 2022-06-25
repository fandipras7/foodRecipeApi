const express = require('express')
const recipesController = require('../controller/recipes')
const router = express.Router()
const { protect } = require('../middleware/auth')

router.get('/', protect, recipesController.getMyRecipe)

module.exports = router
