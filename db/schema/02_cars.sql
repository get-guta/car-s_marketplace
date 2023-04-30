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
