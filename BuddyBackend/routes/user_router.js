
module.exports = function(app) {
  const user = require('../controllers/users');
  
  app.route('/users')
    .get(user.get_info)
    .post(user.create_user);

  app.route('/users/:userId')
    .get(user.get_lists)
    .put(user.update_lists);

  // app.post('/users', (req, res) => {
  //   const user = {username: req.body.username, userId: req.body.userId}
  //   db.collection('users').insert(user, (err, result) => {
  //     if (err) {
  //       res.send({ 'error': 'An error has occurred' });
  //     } else {
  //       res.send(result.ops[0]);
  //     }
  //   });
  // });
};
