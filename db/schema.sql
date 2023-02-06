CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE
);

CREATE TABLE boats (
    uid SERIAL PRIMARY KEY,
    name VARCHAR(255),
    status_id INT REFERENCES status(id)
);

INSERT INTO status (title) VALUES
    ('Docked'),
    ('Inbound to Harbor'),
    ('Outbound to Sea'),
    ('Maintenance');