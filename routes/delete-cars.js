const express = require('express');
const router = express.Router();
const carUpdate = require('../db/queries/cars');

router.post('/', (req, res) => {
  const car_id = req.body.carid;
  const rows = carUpdate.DeleteCar( car_id);
  if (rows){
    res.send(rows);
  }else{
    res.send('Failed to delete the car.');
  }
});

module.exports = router;
