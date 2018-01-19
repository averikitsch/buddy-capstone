const userRoutes = require('./user_router');

module.exports = function(app, db) {
  userRoutes(app, db);
}
