const mongoose = require('mongoose');
import User from '../models/User';


// Works
exports.get_user = function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user)
  })
}

// Get all
exports.get_all = function(req, res) {
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

exports.update_user = function(req, res) {
  console.log(req.body.LogList)
  User.findOneAndUpdate({_id: req.params.userId}, {$set:{LogList: req.body.LogList, WishList: req.body.WishList}}, {new: true}, function(err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

// Find user id //, provider: req.params.provider
exports.find_user = function(req, res) {
  User.find({userId: req.body.userId}, function(err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user[0])
  })
}
