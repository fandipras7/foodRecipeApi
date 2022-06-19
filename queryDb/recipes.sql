CREATE TABLE recipes(
    id VARCHAR(64) NOT NULL,
    title VARCHAR(64) NOT NULL,
    image VARCHAR(200),
    ingredients VARCHAR (300) NOT NULL,
    video VARCHAR(64),
    id_user VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

INSERT INTO recipes (id, title, ingredients, id_user)VALUES('first_recipes', 'Kupat Tahu', 'bawang 3 biji, cabai, kacang', 'first_user');

INSERT INTO recipes (id, title, ingredients, id_user)VALUES('second_recipes', 'Mie Pedas', 'Indomie, cabai 10 biji, bon cabai', 'first_user');

SELECT recipes.*, users.name FROM recipes INNER JOIN users on recipes.id_user = users.id;