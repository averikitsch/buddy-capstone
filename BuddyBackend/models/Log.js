import mongoose, { Schema } from 'mongoose';

// Define movie schema
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

// Export Mongoose model
export default mongoose.model('log', logSchema);
