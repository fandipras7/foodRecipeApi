const createError = require('http-errors')
const { response } = require('../helper/common')
const modelRecipes = require('../models/recipes')
const errorMessage = new createError.InternalServerError()
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dbpfwb5ok',
  api_key: '117781545328253',
  api_secret: '1nAdMge0mf1KjuDwJi8CWPWpHx8'
})

const recipesController = {
  getData: async (req, res, next) => {
    const id = req.params.idRecipe
    console.log('apakah jalan')
    try {
      if (!id) {
        const search = req.query.search
        const sortby = req.query.sortby
        const sort = req.query.sort
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit
        let result = await modelRecipes.select(limit, offset)
        if (search) {
          const { rows } = await modelRecipes.searchRecipes(search, limit, offset)
          result = [...rows]
        }

        if (sortby && sort) {
          const { rows } = await modelRecipes.sortRecipes(sortby, sort, limit, offset)
          result = [...rows]
        }
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

  getMyRecipe: async (req, res, next) => {
    try {
      const id = req.user.id
      console.log(id)
      const { rows } = await modelRecipes.selectMyRecipe(id)
      const myrecipe = rows
      response(res, myrecipe, 200, 'Berhasil mengambil data dari database')
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },

  addData: async (req, res, next) => {
    try {
      const idUser = req.user.id
      const [imageFile] = req.files.image
      const [videoFile] = req.files.video
      const image = await cloudinary.uploader.upload(imageFile.path, { folder: 'recipe/images' })
      const video = await cloudinary.uploader.upload(videoFile.path, { folder: 'recipe/videos', resource_type: 'video' })
      // const image = `http://${req.get('host')}/img/${req.files.image[0].filename}` || null
      // const video = `http://${req.get('host')}/video/${req.files.video[0].filename}` || null
      const { title, ingredients } = req.body
      console.log(req.body)

      const data = {
        title,
        image: image.secure_url,
        ingredients,
        video: video.secure_url,
        idUser
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
    } catch (error) {
      console.log(error)
    }
  },

  updateData: async (req, res, next) => {
    try {
      const idUser = req.user.id
      const idRecipes = req.params.id
      console.log('apakah ini jalan')
      const [imageFile] = req.files.image
      const [videoFile] = req.files.video
      const image = await cloudinary.uploader.upload(imageFile.path, { folder: 'recipe/images' })
      const video = await cloudinary.uploader.upload(videoFile.path, { folder: 'recipe/videos', resource_type: 'video' })
      // const image = `http://${req.get('host')}/img/${req.files.image[0].filename}` || null
      // const video = `http://${req.get('host')}/video/${req.files.video[0].filename}` || null
      const { title, ingredients } = req.body
      const data = {
        id: idRecipes,
        title,
        image: image.secure_url,
        ingredients,
        video: video.secure_url,
        idUser
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
        console.log(error)
        next(errorMessage)
      })
  }
}

module.exports = recipesController
