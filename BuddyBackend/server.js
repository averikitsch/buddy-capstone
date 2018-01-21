const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/user_router');
const bodyParser = require('body-parser');
const User = require('./models/User');
// const MongoClient = require('mongodb').MongoClient;
const db = require('./db');

const app = express();
const port = 8000;


const URL = db.url;
mongoose.Promise = global.Promise;
mongoose.connect(URL);

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
