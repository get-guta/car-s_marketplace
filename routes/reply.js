const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

// handle POST requests to add a new car
router.post('/', (req, res) => {
  const user_id = req.session.user_id;
  if (!user_id) {
    res.send("Protected page! Please login to access this service");
  }
  const { cars_id, message_text } = req.body;
  // add the new car to the database
  const query = 'INSERT INTO messages (users_id, cars_id, message_text) VALUES ($1, $2, $3)';
  const values = [user_id, cars_id, message_text];
  db.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error adding car to database');
    } else {
      res.redirect('/admin');
    }
  });
});
module.exports = router;
