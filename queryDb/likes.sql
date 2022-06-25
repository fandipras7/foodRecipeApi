CREATE TABLE likes(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    id_user VARCHAR(64),
    id_recipe INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

INSERT INTO likes (id_user, id_recipe)VALUES('first_user', 10);
SELECT likes.id, recipes.title, recipes.image FROM likes 

SELECT * FROM recipes WHERE recipes.id_user = 'first_user'
INNER JOIN recipes on likes.id_recipe = recipes.id WHERE likes.id_user = '1abbd09b-296a-44f3-b5af-35c471430ea8';

SELECT likes.id, recipes.title, recipes.image, users.name FROM likes 
INNER JOIN recipes on likes.id_recipe = recipes.id 
INNER JOIN users on likes.id_user = users.id;