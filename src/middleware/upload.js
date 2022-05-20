const createError = require('http-errors')
const multer = require('multer')
// const checkImage = (req, res, next) => {
//   // console.log(req.file)
//   next()
// }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './imgUpload')
    // cb(null, path.join(__dirname, './imagesUpload'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }

})

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    // console.log(file.fi)
    const filetypes = /jpg|png|jpeg/
    // console.log(filetypes)
    const extname = filetypes.test(file.originalname)
    // console.log(extname)
    const mimetype = filetypes.test(file.mimetype)
    // console.log(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(createError('data harus jpg atau png'))
    }
  }

})

module.exports = { upload }
