const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const multer = require('multer');
const path = require('path');

// Set up file upload using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const model = req.body.model.toLowerCase().replace(/ /g, '_');
    cb(null, model + ext);
  }
});
const upload = multer({ storage: storage });

// handle POST requests to add a new car
router.post('/', upload.single('image'), (req, res) => {
  const { model, price, description } = req.body;

  const image = req.file ? req.file.filename : '';
  const sold =false;
  const user_id = req.session.user_id;
  console.log(model, description, price, sold, user_id, image);
  // add the new car to the database
  const query = 'INSERT INTO cars (model, price, description, image, is_sold, users_id) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [model, parseFloat(price),description,  image, sold, user_id];
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
