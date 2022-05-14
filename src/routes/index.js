const express = require('express')
const router = express.Router()
const categoryRoute = require('./category')
const productRoute = require('./product')
const userRoute = require('./users')

router
  .use('/category', categoryRoute)
  .use('/products', productRoute)
  .use('/users', userRoute)

module.exports = router
