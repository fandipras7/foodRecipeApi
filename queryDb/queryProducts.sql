CREATE TABLE products(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    id_category INT NOT NULL,
    name VARCHAR(64) NOT NULL,
    brand VARCHAR(64) NOT NULL,
    size VARCHAR(64) NOT NULL,
    color VARCHAR(32) NOT NULL,
    photo VARCHAR(150),
    condition VARCHAR(32) NOT NULL,
    description VARCHAR(128),
    stock INT,
    price INT NOT NULL
);