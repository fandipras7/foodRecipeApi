const createError = require('http-errors')
const { response } = require('../helper/common')
const { selectLikes } = require('../models/likes')
const errorMessage = new createError.InternalServerError()

const likesController = {
  getData: async (req, res, next) => {
    try {
      const id = req.user.id
      const result = await selectLikes(id)
      console.log(result)
      response(res, result, 200, 'Berhasil mengambil data dari database')
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },

  addData: async (req, res, next) => {
    try {
      const id = req.user.id
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = likesController
