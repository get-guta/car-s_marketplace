
/* show_car.js */

const express = require('express');
const router = express.Router();

// GET /cars/show/:id
router.get('/:id', (req, res) => {
  const car = {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2019,
    color: 'white',
    price: 25000
  };

  res.render('show_car', { car });
});

module.exports = router;
