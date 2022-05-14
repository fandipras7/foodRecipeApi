const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const protect = (req, res, next) => {
  try {
    let token
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      console.log(decoded)
      req.user = decoded
      next()
    } else {
      next(createError(400, 'Server need token'))
    }
  } catch (error) {
    console.log(error)
    if (error && error.name === 'JsonWebTokenError') {
      next(createError(400, 'Token Invalid'))
    } else if (error && error.name === 'TokenExpiredError') {
      next(createError(400, 'Token Expired'))
    } else {
      next(createError(400, 'Token not active'))
    }
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.role !== 1) {
    return next(createError(400, 'Admin Only'))
  }
  next()
}
module.exports = { protect, isAdmin }
