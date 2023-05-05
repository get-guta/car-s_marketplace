const express = require('express');
const router  = express.Router();
const carsQueries = require('../db/queries/cars');

router.get('/', (req, res) => {
  const min = req.query.min_price;
  const max = req.query.max_price;

  carsQueries.filterByPrice(min, max)
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
