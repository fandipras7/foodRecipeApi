const createError = require('http-errors')
const categoryModels = require('../models/category')
const errorMessage = new createError.InternalServerError()

const categoryController = {
  getData: (req, res, next) => {
    categoryModels.selectCategory()
      .then((result) => {
        res.json({
          data: result
        })
      })
      .catch(() => {
        next(errorMessage)
      })
  },
  addData: (req, res, next) => {
    const { name } = req.body
    const data = name
    categoryModels.insertCategory(data)
      .then(() => {
        res.json({
          message: 'Data berhasil ditambahkan'
        })
      })
      .catch(() => {
        next(errorMessage)
      })
  },
  updateData: (req, res, next) => {
    const id = req.params.idCategory
    const { name } = req.body
    const data = {
      id,
      name
    }
    categoryModels.updateCategory(data)
      .then((result) => {
        console.log(result)
        if (result.rowCount) {
          res.json({
            data,
            message: 'data diatas berhasil di update'
          })
        } else {
          next(new Error('id tidak ditemukan tidak ada data yang dihapus'))
        }
      })
      .catch(() => {
        next(errorMessage)
      })
  },
  deleteData: (req, res, next) => {
    const id = req.params.id
    // console.log(id)
    categoryModels.deleteCategory(id)
      .then((result) => {
        if (result.rowCount) {
          res.json({
            message: 'Data berhasil dihapus'
          })
        } else {
          next(new Error('id tidak ditemukan tidak ada data yang dihapus'))
        }
      })
      .catch(() => {
        next(errorMessage)
      })
  }
}
module.exports = categoryController
