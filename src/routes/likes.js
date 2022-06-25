const express = require('express')
const likesController = require('../controller/likes')
const router = express.Router()
const { protect } = require('../middleware/auth')

router.get('/', protect, likesController.getData)

module.exports = router
