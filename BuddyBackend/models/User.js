import mongoose, { Schema } from 'mongoose';

var logSchema = new Schema({
  name: String,
  brand: String,
  type: String,
  product: Number,
  quantity: Number,
  flavors: Array,
  activity: Number,
  duration: Number,
  ranking: Number,
  data: String,
});

// Define movie schema
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  provider: {
    type: String,
  },
  LogList: Array,
  WishList: Array, //[logSchema]
});


export default mongoose.model('user', userSchema);
