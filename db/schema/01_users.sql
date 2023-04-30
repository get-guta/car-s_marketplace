-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT false
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) NOT NULL,
    cars_id INTEGER REFERENCES Cars(car_id) NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT NOW(),
    message_text TEXT NOT NULL,
    receiver_id INTEGER REFERENCES Users(id) NOT NULL
);

CREATE TABLE wishlist (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(id) NOT NULL,
    car_id INTEGER REFERENCES Cars(car_id) NOT NULL,

);


CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    is_new BOOLEAN NOT NULL DEFAULT false,
    image VARCHAR(255),
    date_created TIMESTAMP NOT NULL DEFAULT NOW(),
    is_sold BOOLEAN NOT NULL DEFAULT false,
    user_id INTEGER REFERENCES Users(id) NOT NULL

);

CREATE TABLE car_wishlist (
    id SERIAL PRIMARY KEY,
    wishlist_id INT REFERENCES wishlist(id),
    car_id INT REFERENCES car(id),
    date_created TIMESTAMP DEFAULT NOW()
);
