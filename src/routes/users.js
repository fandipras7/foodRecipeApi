const express = require('express')
const router = express.Router()
const { register, login, profile, refreshToken, activation, deleteUser, searchUser, /* logout, */updateUser } = require('../controller/users')
const { protect, isAdmin } = require('../middleware/auth')
const { upload } = require('../middleware/upload')

router
  .post('/register', register)
  .post('/login', login)
  // .get('/logout', protect, logout)
  .post('/refresh-token', refreshToken)
  .get('/', protect, /* isAdmin, */ searchUser)
  .get('/profile', protect, profile)
  .get('/active/:token', protect, activation)
  .put('/:id', protect, upload, updateUser)
  .delete('/:id', protect, isAdmin, deleteUser)

module.exports = router
