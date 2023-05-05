const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const user_id = req.session.user_id;
  db.query('SELECT * FROM cars WHERE users_id=$1',[user_id])
    .then(data => {
      let cars = data.rows;
      res.render('manage_cars',{cars});
    });
});

module.exports = router;
