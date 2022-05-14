const createError = require('http-errors')
const modelProducts = require('../models/product')
const commonHelper = require('../helper/common')
const modelsProduct = require('../models/product')
const errorMessage = new createError.InternalServerError()

const productsController = {
  getData: async (req, res, next) => {
    try {
      const query = req.query
      const key = req.query.search
      const sortby = req.query.sortby
      const sort = req.query.sort
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 3
      const offset = (page - 1) * limit
      let result = await modelProducts.select(limit, offset)

      // console.log(query)
      for (const keyObject in query) {
        if (keyObject === 'search') {
          const queryResult = await modelsProduct.search(key, limit, offset)
          result = queryResult.rows
        } else if (keyObject === 'sort' || keyObject === 'sortby') {
          const queryResult = await modelsProduct.sort(sortby, sort, limit, offset)
          result = queryResult.rows
        }
      }

      // pagination
      const { rows: [count] } = await modelsProduct.countProduct()
      // console.log(count)
      const totalData = parseInt(count.total)
      const totalPage = Math.ceil(totalData / limit)

      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage
      }

      commonHelper.response(res, result, 200, 'Data berhasil didaptakan', pagination)
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },
  addData: (req, res, next) => {
    const { name, brand, size, color, condition, stock, price, id_category: idCategory } = req.body
    const data = {
      name,
      brand,
      size,
      color,
      condition,
      stock,
      price,
      idCategory
    }

    modelProducts.insert(data)
      .then((result) => {
        res.json({
          message: 'produk berhasil ditambahkan'
        })
      })
      .catch(() => {
        next(errorMessage)
      })
  },
  updateData: async (req, res, next) => {
    try {
      const id = req.params.id
      const { name, brand, size, color, condition, description, stock, price, id_category: idCategory } = req.body
      const data = {
        name,
        brand,
        size,
        color,
        condition,
        description,
        stock,
        price,
        idCategory,
        id
      }
      const result = await modelProducts.update(data)
      if (result.rowCount) {
        commonHelper.response(res, data, 200, 'Data berhasil ditambahkan')
      } else {
        res.json({
          message: 'Input id yang anda masukan tidak ditemukan'
        })
      }
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },
  deleteData: (req, res, next) => {
    const id = req.params.idProduct
    modelProducts.delete(id)
      .then(() => {
        res.json({
          message: 'Data berhasil dihapus'
        })
      })
      .catch(() => {
        next(errorMessage)
      })
  }
  // searchProduct: (req, res, next) => {
  //   const key = req.query.search
  //   modelProducts.
  // }
}

module.exports = productsController
