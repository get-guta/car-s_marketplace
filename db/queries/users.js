const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};
const getUserById = (user_id) => {
  return db.query('SELECT * FROM users WHERE id = $1', [user_id])
  .then(data => {
    console.log(data.rows);
    return data.rows[0];
  })
  .catch(error => {
    console.log(error.message);
  })
}

module.exports = { getUsers, getUserById };
