import mongoose, { Schema } from 'mongoose';

// Define movie schema
var userSchema = new Schema({
  username: String,
  userId: String,
  LogList: String,
  WishList: String,
});


export default mongoose.model('user', userSchema);
