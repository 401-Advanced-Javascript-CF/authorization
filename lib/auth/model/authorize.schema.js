'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Collection = require('../model/authorize.collection.js')


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});
const model = mongoose.model('Categories', userSchema);

const db = new Collection(model);

userSchema.static.authenticateBasic = function(user, pass) {
    return db.find({name: user})
    .then(results => {
        return bcrypt.compare(pass, results.password)
    })
  }

userSchema.methods.generateToken = function(userName){
    let token = jwt.sign({ "username": userName }, 'SECRET_STRING');
    return token;
}

module.exports = model;