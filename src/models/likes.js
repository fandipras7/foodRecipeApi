const pool = require('../config/food_recipesDB')

exports.selectLikes = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT likes.id, recipes.title, recipes.image FROM likes 
        INNER JOIN recipes on likes.id_recipe = recipes.id WHERE likes.id_user = $1`, [id], (err, result) => {
      if (!err) {
        resolve(result.rows)
      } else {
        reject(new Error(err))
      }
    })
  })
}
