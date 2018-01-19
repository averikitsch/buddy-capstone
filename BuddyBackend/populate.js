import mongoose from 'mongoose';
import Log from './models/Log';
import User from './models/User'

const users = [
  {
    username: 'averik',
    userId: '40fg',
    LogList: 'logs',
      // {id: 1, name: 'Lemon Drop', brand: "Dawg Star", product: 1, date:'01/01/2018', duration: 1, ranking: 3, activity: 3, type: 'hybrid', flavors: { spicy: true, sweet: false, sour: true, earthy: false }, quantity: 1},
      // {id: 2,  name: 'GG #4', brand: "Dawg Star", product: 1, date:'01/01/2018', duration: 1, ranking: 3, activity: 3, type: 'indica', flavors: { spicy: true, sweet: true, sour: false, earthy: false }, quantity: 1},
      // {id: 3, name: 'LA Confidential', brand: "Dawg Star", product: 1, date:'01/02/2018', duration: 1, ranking: 3, activity: 3, type: 'sativa', flavors: { spicy: true, sweet: true, sour: false, earthy: false }, quantity: 1},
      // {id: 4, name: 'Frosted Flakes', brand: "Dawg Star", product: 1, date:'01/03/2018', duration: 1, ranking: 3, activity: 3, type: 'hybrid', flavors: { spicy: false, sweet: false, sour: false, earthy: true }, quantity: 1},

    WishList: 'wish',
  }
];


mongoose.connect('mongodb://localhost/users');

// Go through each movie
users.map(data => {
  console.log(data)
  // Initialize a model with movie data
  const user = new User(data);
  // and save it into the database
  user.save();
});
