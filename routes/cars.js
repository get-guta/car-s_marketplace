const express = require('express');
const router  = express.Router();
const carsQuery = require('../db/queries/cars');

router.get('/', (req, res) => {
  res.render('cars');
});

module.exports = router;
