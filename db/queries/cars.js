const db = require('../connection');

const getAllCars = () => {
  return db.query('SELECT * FROM cars;')
    .then(data => {
      return data.rows;
    });
};

// const filterByPrice = (min, max)  =>{
//   const query = {
//     text: 'SELECT * FROM cars WHERE price BETWEEN $1 AND $2',
//     values: [parseFloat(min), parseFloat(max)]
//   };
//   return db.query(query)
//     .then(data => {
//       return data.rows;
//     });
// };

module.exports = { getAllCars };
