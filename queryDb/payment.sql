CREATE TABLE payment(
    id BIGSERIAL NOT NULL,
    order_id INT,
    amount INT NOT NULL,
    provider VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL,
    created_at TIMESTAMP,
    modifed_at TIMESTAMP
);

INSERT INTO payment (id, order_id, amount, provider, status)VALUES(1, 001, 120000, 'GOPAY', 'paid off');