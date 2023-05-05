const db = require('../connection');


const AddToWishlist = (user_id, car_id) => {

  const query = {
    text: 'INSERT INTO wishlist(users_id, cars_id) values ($1, $2)',
    values: [user_id, car_id]
  };
  return db.query(query, (err, result) => {
    if(err){
      console.log(err.message);
    }else {
      console.log(result.rowCount);
      return result.rowCount;
    }
  })
};

const filterFavouriteCars = (userId)  =>{
  const query = {
    text: 'SELECT * FROM wishlist JOIN cars ON wishlist.cars_id = cars.id WHERE wishlist.users_id = $1',
    values: [userId]
  };
  return db.query(query)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

module.exports = { AddToWishlist, filterFavouriteCars };
