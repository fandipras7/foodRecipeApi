const client = require('../config/redis')
const { response } = require('../helper/common')

const hitCacheProductDetail = async (req, res, next) => {
  const idProduct = req.params.idProduct
  const product = await client.get(`produk/${idProduct}`)
  console.log(product)
  if (product) {
    return response(res, JSON.parse(product), 200, 'get data dari redis')
  }
  next()
}

const clearCacheProductDetail = (req, res, next) => {
  const idProduct = req.params.idProduct
  client.del(`produk/${idProduct}`)
}

module.exports = {
  hitCacheProductDetail,
  clearCacheProductDetail

}
