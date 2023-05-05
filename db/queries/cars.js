const db = require('../connection');

const getAllCars = () => {
  return db.query('SELECT * FROM cars;')
    .then(data => {
      return data.rows;
    });
};

// const getCarByUser = (uid) => {
//   return db.query('SELECT * FROM cars WHERE users_id=$1',[uid])
//     .then(data => {
//       return data.rows;
//     });
// };
const filterByPrice = (min, max)  =>{
  const query = {
    text: 'SELECT * FROM cars WHERE price BETWEEN $1 AND $2',
    values: [parseFloat(min), parseFloat(max)]
  };
  return db.query(query)
    .then(data => {
      return data.rows;
    });
};

const UpdateCar = (car_id, price, sold) => {
  console.log("query: ", car_id, sold, price);
  const query = {
    text: 'UPDATE cars set price = $1, is_sold =$2 WHERE id = $3',
    values: [price, sold, car_id]
  };
  return db.query(query, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(result.rowCount);
      return result.rowCount;
    }
  })
};

const DeleteCar = (car_id) => {
  const query = {
    text: 'DELETE FROM cars WHERE id = $1',
    values: [car_id]
  };
  return db.query(query, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(result.rowCount);
      return result.rowCount;
    }
  })
};

module.exports = { getAllCars, filterByPrice, UpdateCar, DeleteCar };
