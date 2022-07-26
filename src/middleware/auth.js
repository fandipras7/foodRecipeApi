const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const protect = (req, res, next) => {
  try {
    let token
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //   token = req.headers.authorization.split(' ')[1]
    // eslint-disable-next-line prefer-const
    token = req.cookies.token
    if (!token) {
      console.log('apakah ini jalan')
      return next(createError(400, 'server need token'))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    //   console.log(decoded)
    req.user = decoded
    next()
    // } else if (req.params.token && req.method === 'GET') {
    //   console.log(req)
    //   token = req.params.token
    //   const decoded = jwt.verify(token, 'errrooo')
    //   req.user = decoded
    //   next()
    // } else {
    //   next(createError(400, 'Server need token'))
    // }
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
  if (req.user.role !== 'Admin') {
    return next(createError(400, 'Admin Only'))
  }
  next()
}

const isUser = (req, res, next) => {
  if (req.user.role !== 'Customer') {
    return next(createError(400, 'Customer only'))
  }
  next()
}
module.exports = { protect, isAdmin, isUser }
