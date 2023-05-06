const express = require('express');
const router  = express.Router();
const carsQuery = require('../db/queries/cars');

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  if (!user_id) {
    res.send("Protected page! Please login to access the cars");
  }
  res.render('cars');
});

module.exports = router;
