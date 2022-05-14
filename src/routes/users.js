const express = require('express')
const router = express.Router()
const { register, login, profile } = require('../controller/users')

router
  .post('/register', register)
  .post('/login', login)
  .get('/profile', profile)

module.exports = router
