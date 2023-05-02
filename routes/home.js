
const routes = require('./new_Listing');

routes.get('/', (req, res) => {
  res.render('home');
});

module.exports = routes;

