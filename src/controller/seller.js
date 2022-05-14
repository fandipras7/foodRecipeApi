const sellerRegister = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, storeName } = req.body
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
      phoneNumber,
      storeName,
      password: hashPassword
    }
    await addDataRegister(dataRegister)
    commonHelper.response(res, dataRegister, 201, 'User berhasil ditambahkan')
  } catch (error) {
    console.log(error)
    next(createError('Internal Server Error'))
  }
}

module.exports = sellerRegister
