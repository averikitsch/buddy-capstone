
module.exports = function(app) {
  const user = require('../controllers/users');

  app.route('/users/provider/:provider')
    .post(user.find_user);

  app.route('/users/:userId')
    .get(user.get_user)
    .put(user.update_user);

  app.route('/users')
    .get(user.get_all)
    .post(user.create_user);
};
