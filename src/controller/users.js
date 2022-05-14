const createError = require('http-errors')
const errMessage = createError.InternalServerError()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const { checkEmail, addDataRegister } = require('../models/users')
const commonHelper = require('../helper/common')
const { generateToken, generateRefreshToken } = require('../helper/auth')

const register = async (req, res, next) => {
  try {
    const { name, email, password, roleId } = req.body
    const { rowCount } = await checkEmail(email)
    if (rowCount) {
      return next(createError(403, 'User sudah terdaftar'))
    }
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    const dataRegister = {
      id: uuidv4(),
      name,
      email,
      password: hashPassword,
      roleId: roleId || 'user'
    }
    await addDataRegister(dataRegister)
    commonHelper.response(res, dataRegister, 201, 'User berhasil ditambahkan')
  } catch (error) {
    console.log(error)
    next(createError('Internal Server Error'))
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { rows: [user] } = await checkEmail(email)
    if (!user) {
      return commonHelper.response(res, null, 403, 'email atau password anda salah')
    }
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) {
      return commonHelper.response(res, null, 403, 'email atau password anda salah')
    }
    delete user.password
    console.log(user.role_id)
    const payload = {
      email: user.email,
      role: user.role_id
    }

    user.token = generateToken(payload)
    user.refreshToken = generateRefreshToken(payload)
    commonHelper.response(res, user, 201, 'Anda berhasil Login')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const profile = async (req, res, next) => {
  try {
    const email = req.user.email
    const { rows: [user] } = await checkEmail(email)
    delete user.password
    commonHelper.response(res, user, 200, 'Berhasil mengambil data')
  } catch (error) {
    console.log(error)
    next(errMessage)
  }
}

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
}

module.exports = { register, login, profile }
