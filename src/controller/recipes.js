const createError = require('http-errors')
const { response } = require('../helper/common')
const modelRecipes = require('../models/recipes')
const errorMessage = new createError.InternalServerError()

const recipesController = {
  getData: async (req, res, next) => {
    const id = req.params.idRecipe
    try {
      if (!id) {
        // const query = req.query.search
        // const sortby = req.query.sortby
        // const sort = req.query.sort
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit
        const result = await modelRecipes.select(limit, offset)

        // pagination
        // const {rows: [count]} = await modelRecipes.countProduct()
        const { rows: [count] } = await modelRecipes.countRecipes()
        const totalData = parseInt(count.total)
        const totalPage = Math.ceil(totalData / limit)

        const pagination = {
          currentPage: page,
          limit,
          totalData,
          totalPage
        }

        return response(res, result, 200, 'GET DATA FROM DATABASE', pagination)
      }

      const { rows: [recipe] } = await modelRecipes.selectById(id)
      // client.setEx(`produk/${id}`, 60 * 60, JSON.stringify(product))
      response(res, recipe, 200, 'Berhasil mengambil data dari database')
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },

  addData: (req, res, next) => {
    const image = `http://${req.get('host')}/img/${req.files.image[0].filename}` || null
    const video = `http://${req.get('host')}/video/${req.files.video[0].filename}` || null
    const { title, ingredients } = req.body
    console.log(req.body)

    const data = {
      title,
      image,
      ingredients,
      video,
      idUser: 'first_user'
    }

    console.log(data)

    modelRecipes.insertData(data)
      .then(() => {
        response(res, data, 201, 'Produk berhasil ditambahkan')
      })
      .catch((error) => {
        console.log(error)
        next(errorMessage)
      })
  },

  updateData: async (req, res, next) => {
    try {
      const idRecipes = req.params.id
      const image = `http://${req.get('host')}/img/${req.files.image[0].filename}` || null
      const video = `http://${req.get('host')}/video/${req.files.video[0].filename}` || null
      const { title, ingredients } = req.body
      const data = {
        id: idRecipes,
        title,
        image,
        ingredients,
        video,
        idUser: 'first_user'
      }

      const result = await modelRecipes.updateData(data)
      if (result.rowCount) {
        response(res, data, 201, 'Data berhasil di update')
      } else {
        next(new Error('Id tidak ditemukan'))
      }
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },

  deleteData: (req, res, next) => {
    const id = req.params.id
    modelRecipes.removeData(id)
      .then(() => {
        response(res, null, 200, 'Data berhasil di hapus')
      })
      .catch((error) => {
        console.log(error);
        next(errorMessage)
      })
  }
}

module.exports = recipesController
