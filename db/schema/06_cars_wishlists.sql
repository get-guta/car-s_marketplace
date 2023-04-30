CREATE TABLE car_wishlist (
    id SERIAL PRIMARY KEY,
    wishlist_id INT REFERENCES wishlist(id),
    car_id INT REFERENCES car(id),
    date_created TIMESTAMP DEFAULT NOW()
);
