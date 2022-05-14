const jwt = require('jsonwebtoken')
const generateToken = (payload) => {
  const verivyOption = { expiresIn: 60 }
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, verivyOption)
  return token
}

module.exports = { generateToken }
