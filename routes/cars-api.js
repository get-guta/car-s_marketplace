const express = require('express');
const router  = express.Router();
const carsQueries = require('../db/queries/cars');

router.get('/', (req, res) => {
  carsQueries.getAllCars()
    .then(cars => {
      res.json({ cars });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
