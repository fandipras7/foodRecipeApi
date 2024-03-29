const createError = require('http-errors')
const errMessage = createError.InternalServerError()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const { checkEmail, addDataRegister, setStatus, deleteModelUser, getAllUsers, updataUserData } = require('../models/users')
const commonHelper = require('../helper/common')
const { generateToken, generateRefreshToken } = require('../helper/auth')
const cloudinary = require('../helper/cloudinary')
// const { sendEmail } = require('../helper/email')

const register = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password, roleId } = req.body
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
      phoneNumber,
      roleId: roleId || 'User'
    }
    await addDataRegister(dataRegister)
    delete dataRegister.password
    // sendEmail(email)
    commonHelper.response(res, dataRegister, 201, 'User berhasil ditambahkan')
  } catch (error) {
    console.log(error)
    next(createError('Internal Server Error'))
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const {
      rows: [user]
    } = await checkEmail(email)
    if (!user) {
      return commonHelper.response(res, null, 403, 'email atau password anda salah')
    }
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) {
      return commonHelper.response(res, null, 403, 'email atau password anda salah')
    }
    delete user.password
    const payload = {
      email: user.email,
      role: user.role_id,
      id: user.id
    }
    // const dataUser = {
    //   name: user.name,
    //   email: user.email,
    //   role: user.role_id
    // }
    user.token = generateToken(payload)
    user.refreshToken = generateRefreshToken(payload)
    // res.cookie('token', user.token, {
    //   httpOnly: true,
    //   maxAge: 60 * 1000 * 60 * 12,
    //   secure: process.env.NODE_ENV !== 'Development' ? true : false,
    //   path: '/',
    //   sameSite: 'strict'

    // })
    commonHelper.response(res, user, 201, 'Anda berhasil Login')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

// const logout = (req, res, next) => {
//   try {
//     const token = req.user.token
//     // res.cookie('token', token, {
//     //   httpOnly: true,
//     //   maxAge: 1,
//     //   secure: process.env.NODE_ENV !== 'Development' ? true : false,
//     //   path: '/',
//     //   sameSite: 'strict'
//     // })
//     commonHelper.response(res, null, 201, 'Anda berhasil Logout')
//   } catch (error) {
//     console.log(error)
//   }
// }

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const { name } = req.body
    console.log(name)
    let image = null

    if (req.files) {
      const [imageFile] = req.files.image
      image = await cloudinary.uploader.upload(imageFile.path, { folder: 'recipe/users' })
      image = image.secure_url
    }
    const data = {
      id,
      name,
      photo: image
    }

    console.log(data)
    const result = await updataUserData(data)
    // console.log(result)

    if (result.rowCount) {
      return commonHelper.response(res, data, 200, 'User data has been updated')
    } else {
      next(new Error('Id tidak ditemukan'))
    }

    console.log('apakah setelah respon jalan')
  } catch (error) {
    // console.log('cek error')
    console.log(error)
    next(errMessage)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id
    console.log(id)
    await deleteModelUser(id)
    commonHelper.response(res, id, 200, 'User dengan id diatas berhasl dihapus')
  } catch (error) {
    console.log(error)
    next(errMessage)
  }
}

const searchUser = async (req, res, next) => {
  try {
    const {
      rows: [...users]
    } = await getAllUsers()
    commonHelper.response(res, users, 200, 'Berhasil mengambil data users')
  } catch (error) {
    console.log(error)
    next(errMessage)
  }
}

const profile = async (req, res, next) => {
  try {
    const email = req.user.email
    const {
      rows: [user]
    } = await checkEmail(email)
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
  const payload = {
    email: decoded.email,
    role: decoded.role
  }
  const result = {
    token: generateToken(payload),
    refreshToken: generateRefreshToken(payload)
  }

  commonHelper.response(res, result, 200)
}

const activation = async (req, res, next) => {
  try {
    const email = req.user.email
    const status = 'actived'
    const data = {
      email,
      status
    }
    await setStatus(status, email)
    commonHelper.response(res, data, 201, 'Congratulation Your Account Is Actived')
  } catch (error) {
    next(errMessage)
  }
}

module.exports = {
  register,
  login,
  // logout,
  updateUser,
  profile,
  refreshToken,
  activation,
  deleteUser,
  searchUser
}
