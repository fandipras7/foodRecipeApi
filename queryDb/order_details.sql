CREATE TABLE order_details(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    users_id VARCHAR(64),
    total DECIMAL NOT NULL,
    payment_id INT NOT NULL,
    creted_at TIMESTAMP,
    modified_at TIMESTAMP
);

INSERT INTO order_details (id, users_id, total, payment_id)VALUES(1, "ff2578d9-aada-449d-ba9f-9be5e4a519cf", 120000, 1);

SELECT order_details.id, total, provider, users.name FROM order_details INNER JOIN users on order_details.users_id = users.id INNER JOIN payment on order_details.payment_id = payment.id;