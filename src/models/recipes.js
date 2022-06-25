const pool = require('../config/food_recipesDB')

const modelRecipes = {
  select: (limit, offset) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM recipes LIMIT $1 OFFSET $2', [limit, offset], (err, result) => {
        if (!err) {
          resolve(result.rows)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  selectMyRecipe: (id) =>{
    return pool.query('SELECT * FROM recipes WHERE recipes.id_user = $1', [id])
  },

  insertData: ({ title, image, ingredients, video, idUser }) => {
    return pool.query('INSERT INTO recipes ( title, image, ingredients, video, id_user)VALUES($1,$2,$3,$4,$5)', [title, image, ingredients, video, idUser])
  },

  updateData: ({title, image, ingredients, video, idUser, id}) => {
    return pool.query('UPDATE recipes SET title = $1, image = $2, ingredients = $3, video = $4, id_user = $5 WHERE id = $6', [title, image, ingredients, video, idUser, id])
  },

  removeData: (id)=>{
    return pool.query('DELETE FROM recipes WHERE id = $1', [id])
  },

  selectById: (id) => {
    return pool.query('SELECT*FROM recipes WHERE id = $1', [id])
  },

  countRecipes: () => {
    return pool.query('SELECT COUNT(*) AS total from recipes')
  }
}

module.exports = modelRecipes
