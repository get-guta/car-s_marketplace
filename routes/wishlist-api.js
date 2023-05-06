const express = require('express');
const router = express.Router();
const wishlist = require('../db/queries/wishlist');

router.post('/', (req, res) => {
  const uid = req.session.user_id;
  if (!uid) {
    res.send("Protected page! Please login to access the cars");
  }
  const user_id = req.body.user_id;
  const car_id = req.body.car_id;
  // console.log("params", user_id, car_id);
  const rows = wishlist.AddToWishlist(user_id, car_id);
  if (rows){
    res.send(rows);
  }else{
    res.send('Failed to add car to wishlist.');
  }
});

module.exports = router;
