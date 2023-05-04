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
module.exports = { AddToWishlist };
