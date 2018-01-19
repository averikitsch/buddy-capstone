const mongoose = require('mongoose');
import User from '../models/User';

// export const index = (req, res, next) => {
//   // Find all movies and return json response
//   User.find().lean().exec((err, users) => res.json(
//     // Iterate through each movie
//     { movies: users.map(user => ({
//       ...user,
//     }))}
//   ));
// };

// Works
exports.get_lists = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user)
  })
}

// Get all
exports.get_info = function(req, res) {
  User.find(function(err, users){
    if(err) {
        res.status(500).send({message: "Some error occurred while retrieving notes."});
    } else {
        res.send(users);
    }
  })
}

exports.create_user = function(req, res) {
  const new_user = new User(req.body); //{username: req.body.username, userId: req.body.userId}
  // console.log(req.params)
  console.log('user', req.body)
  // User.create(req.body)
  new_user.save( function(err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user);
  });
};

exports.update_lists = function(req, res) {
  User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};
