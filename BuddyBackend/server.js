const express = require('express');
import mongoose from 'mongoose';
import routes from './routes/user_router';
const bodyParser = require('body-parser');
import User from './models/User';
// const MongoClient = require('mongodb').MongoClient;
// const db = require('/data/db/');

const app = express();
const port = 8000;


const url = 'mongodb://localhost/users';
mongoose.Promise = global.Promise;
mongoose.connect(url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });

routes(app);

const server = app.listen( port, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
