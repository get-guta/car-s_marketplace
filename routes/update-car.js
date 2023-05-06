const express = require('express');
const router = express.Router();
const carUpdate = require('../db/queries/cars');

router.post('/', (req, res) => {
  const price = req.body.price;
  const car_id = req.body.carid;
  const sold = req.body.is_sold;
  const isSold = sold === '1' ? true : false;

  const rows = carUpdate.UpdateCar( car_id, parseFloat(price), isSold);
  if (rows){
    res.send(rows);
  }else{
    res.send('Failed to add car to wishlist.');
  }
});

module.exports = router;
