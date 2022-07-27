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

  selectMyRecipe: (id) => {
    // return pool.query('SELECT * FROM recipes WHERE recipes.id_user = $1', [id])
    return pool.query('SELECT recipes.*, users.name FROM recipes INNER JOIN users on recipes.id_user = users.id WHERE recipes.id_user = $1', [id])
  },

  insertData: ({id, title, image, ingredients, video, idUser }) => {
    return pool.query('INSERT INTO recipes (id, title, image, ingredients, video, id_user)VALUES($1,$2,$3,$4,$5,$6)', [id, title, image, ingredients, video, idUser])
  },

  updateData: ({ title, image, ingredients, video, id }) => {
    // eslint-disable-next-line quotes
    return pool.query(`UPDATE recipes SET 
    title = COALESCE($1, title),
    image = COALESCE($2, image),
    ingredients = COALESCE($3, ingredients),
    video = COALESCE($4, video),
    WHERE id = $5`, [title, image, ingredients, video, id])
  },

  removeData: (id) => {
    return pool.query('DELETE FROM recipes WHERE id = $1', [id])
  },

  selectById: (id) => {
    return pool.query('SELECT*FROM recipes WHERE id = $1', [id])
  },

  countRecipes: () => {
    return pool.query('SELECT COUNT(*) AS total from recipes')
  },

  searchRecipes: (key, limit, offset) => {
    return pool.query('SELECT * FROM recipes WHERE title ILIKE $1 LIMIT $2 OFFSET $3', [`%${key}%`, limit, offset])
  },

  sortRecipes: (sortby, sort, limit, offset) => {
    return pool.query(`SELECT * FROM recipes ORDER BY ${sortby} ${sort} LIMIT $1 OFFSET $2`, [limit, offset])
  }
}

module.exports = modelRecipes
