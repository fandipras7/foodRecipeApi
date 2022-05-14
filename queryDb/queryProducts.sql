CREATE TABLE products(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    brand VARCHAR(64) NOT NULL,
    size VARCHAR(64) NOT NULL,
    color VARCHAR(32) NOT NULL,
    conditon VARCHAR(32) NOT NULL,
    description VARCHAR(128) NOT NULL,
    stock INT,
    price INT NOT NULL,
    id_category INT NOT NULL
)