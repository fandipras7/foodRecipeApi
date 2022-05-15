const express = require('express')
const router = express.Router()
const { register, login, profile, refreshToken, activation } = require('../controller/users')
const { protect } = require('../middleware/auth')

router
  .post('/register', register)
  .post('/login', login)
  .post('/refresh-token', refreshToken)
  .get('/profile', protect, profile)
  .get('/active/:token', protect, activation)

module.exports = router
