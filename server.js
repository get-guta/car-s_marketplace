// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const db = require('./db/connection');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan('dev'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

// Mount all resource routes
// responds data
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
const userApiRoutes = require('./routes/users-api');
const carApiRoutes = require('./routes/cars-api');
const priceApiRoutes = require('./routes/price-api');
const wishlistApiRoutes = require('./routes/wishlist-api');


app.use('/api/users', userApiRoutes);
app.use('/api/cars', carApiRoutes);
app.use('/api/price-filter', priceApiRoutes);
app.use('/api/wishlist', wishlistApiRoutes);

//page routes
const carsRoutes = require('./routes/cars');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');

app.use('/cars', carsRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);

app.get('/', (req, res) => {
  const user_id = req.session.user_id;
  db.query('SELECT * FROM users WHERE id = $1', [user_id])
  .then(data => {
    const userinfo = data.rows[0];
    console.log(userinfo);
    res.render('cars',{userinfo});
  })
  .catch(error => {
    console.log(error.message);
  })

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
