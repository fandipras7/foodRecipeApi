const createError = require('http-errors')
const multer = require('multer')
// const checkImage = (req, res, next) => {
//   // console.log(req.file)
//   next()
// }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, './imgUpload')
    } else {
      cb(null, './video')
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1])
  }

})

const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    // console.log(file.fi)
    const filetypes = /jpg|png|jpeg|mp4/
    // console.log(filetypes)
    const extname = filetypes.test(file.originalname)
    // console.log(extname)
    const mimetype = filetypes.test(file.mimetype)
    // console.log(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(createError('data harus jpg atau png atau video'))
    }
  }

}).fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }])

module.exports = { upload }
