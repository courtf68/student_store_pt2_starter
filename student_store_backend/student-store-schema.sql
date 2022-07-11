CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  password    TEXT NOT NULL,
  name        TEXT NOT NULL,
  username    TEXT NOT NULL UNIQUE,
  email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
  is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  category    TEXT NOT NULL,
  image       IMAGE,
  description TEXT NOT NULL,
  price       BIGINT
);


CREATE TABLE orders (
  id          SERIAL PRIMARY KEY,
  customer_id  INTEGER NOT NULL, 
  FOREIGN KEY   (customer_id) REFERENCES users(id)  ON DELETE CASCADE, 
  --idk y delete cascade tho... ^ need to b named foreign key?
  created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
);

CREATE TABLE order_detail (
  order_id     INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE, 
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE, 
  --can fix foreign keys here^
  quantity    INTEGER DEFAULT 1,
  discount   INTEGER, 
  PRIMARY KEY   (order_id, product_id)
);

