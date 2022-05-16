CREATE TABLE order_items(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP,
    modifed_at TIMESTAMP
);

INSERT INTO order_items (order_id, product_id, quantity)VALUES(1, 2, 2);

SELECT * FROM order_details.id, user.name FROM order_details INNER JOIN user on order_details.user_id = user.id;