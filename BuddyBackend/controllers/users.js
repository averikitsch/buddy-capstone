import User from '../models/User';

export const index = (req, res, next) => {
  // Find all movies and return json response
  User.find().lean().exec((err, users) => res.json(
    // Iterate through each movie
    { movies: users.map(user => ({
      ...user,
    }))}
  ));
};
