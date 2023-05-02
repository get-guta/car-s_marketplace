/* new_listing */

const express = require('express');
const router = express.Router();

// New listing form route
router.get('/listings/new', (req, res) => {
  res.render('new_listing');
});

// New listing submission route
router.post('/listings/new', (req, res) => {
  // Code to handle the form submission would go here
  res.send('Your new listing has been submitted!');
});

module.exports = router;
