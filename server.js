// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
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
// const priceApiRoutes = require('./routes/price-api');

app.use('/api/users', userApiRoutes);
app.use('/api/cars', carApiRoutes);
// app.use('/api/price-filter', priceApiRoutes);

//page routes
const carsRoutes = require('./routes/cars');
const usersRoutes = require('./routes/users');

app.use('/cars', carsRoutes);
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
  res.render('cars');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
