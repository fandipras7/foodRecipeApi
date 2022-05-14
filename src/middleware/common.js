const createError = require('http-errors')
const pool = require('../config/db')

const searchProduct = (req, res, next) => {
  const key = req.query.search
  const query = req.query // objek query
  const queryKey = Object.keys(query)
  const [resultQuery] = Object.keys(query)
  // console.log(resultQuery)
  // console.log('ini punya search')
  if (resultQuery === 'search' && queryKey.length === 1) {
    pool.query('SELECT * FROM products WHERE name ILIKE $1', [`%${key}%`])
      .then((result) => {
        // console.log(result)
        if (result.rowCount) {
          return res.json({
            data: result.rows
          })
        } else {
          return res.json({
            message: 'Tidak ada produk yang anda cari'
          })
        }
      })
      .catch((error) => {
        console.log(error)
        next(new createError.InternalServerError())
      })
    // console.log('ini punya search product')
  } else {
    // if (resultQuery === undefined) {
    //   next(new createError.NotFound())
    // } else {
    //   next()
    // }
    // console.log('ini punya search product')
    next()
  }
}

const sortingProduct = (req, res, next) => {
  const sortby = req.query.sortby
  const sort = req.query.sort
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 3
  const offset = (page - 1) * limit
  const queryKey = req.query
  const [query1, query2] = Object.keys(queryKey)
  // console.log(query1)
  // console.log(sortby)
  // console.log(sort)

  if (query1 === 'sortby' && query2 === 'sort') {
    pool.query(`SELECT products.*, category.name FROM products JOIN category ON products.id_category = category.id ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`, [limit, offset])
      .then((result) => {
        res.json({
          data:
          result.rows.map(({ id, name, price }) => {
            return {
              id,
              name,
              price
            }
          })
        })
      })
      .catch((error) => {
        console.log(error)
        next(new createError.InternalServerError())
      })
    // console.log('ini punya sort product')
  } else {
    next()
    // if (query1 === undefined && query2 === undefined) {
    //   next()
    // } else {
    //   // console.log('test')
    //   next(new createError.NotFound())
    // }
  }
}

const searchAndSort = (req, res, next) => {
  const key = req.query.search
  const sortby = req.query.sortby
  const sort = req.query.sort
  const query = req.query
  const [query1, query2, query3] = Object.keys(query)
  // console.log(query1, query2, query3)
  // console.log('ini punya search')
  if (query1 === 'search' && query2 === 'sortby' && query3 === 'sort') {
    let resultQuery
    pool.query(`SELECT products.*, category.name FROM products JOIN category ON products.id_category = category.id
    WHERE products.name ILIKE $1 ORDER BY ${sortby} ${sort}`, [`%${key}%`])
      .then((result) => {
        resultQuery = result
        // console.log(result)
        if (result.rowCount) {
          return res.json({
            data: result.rows
          })
        } else {
          return res.json({
            message: 'Tidak ada produk yang anda cari'
          })
        }
      })
      .catch((error) => {
        console.log(error)
        next(new createError.InternalServerError())
      })
    // console.log('apakah ini dijalankan')
    return resultQuery
  } else {
    next()
  }
}

module.exports = {
  sorting: sortingProduct,
  search: searchProduct,
  sortAndSearch: searchAndSort
}
