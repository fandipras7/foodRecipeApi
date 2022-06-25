const express = require('express')
const router = express.Router()
const userRoute = require('./users')
const recipesRoute = require('./recipes')
const myrecipeRoute = require('./myrecipe')
const likesRoute = require('./likes')

router
  .use('/users', userRoute)
  .use('/recipes', recipesRoute)
  .use('/myrecipe', myrecipeRoute)
  .use('/likes', likesRoute)

module.exports = router
