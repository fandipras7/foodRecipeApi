CREATE TABLE users(
    id VARCHAR(64) NOT NULL,
    name VARCHAR(32),
    email VARCHAR(64) NOT NULL,
    phone_number VARCHAR (32) NOT NULL,
    password VARCHAR(64) NOT NULL,
    role_id VARCHAR(32),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

INSERT INTO users (id, name, email, phone_number, password)VALUES('first_user', 'fandi', 'fandi@gmail.com', 0812, '12345');