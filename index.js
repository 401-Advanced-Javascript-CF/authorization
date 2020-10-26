'use strict';

const server = require('./lib/server.js');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('connected to server and database');
    server.start();
   });