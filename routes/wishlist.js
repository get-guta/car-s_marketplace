const express = require('express');
const router  = express.Router();
const wishlistQueries = require('../db/queries/wishlist');

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  if (!user_id) {
    res.send("Protected page! Please login to access the cars");
  }

  const uid = req.query.userId;

  console.log(uid);
  wishlistQueries.filterFavouriteCars(uid)
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
