'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});


userSchema.statics.authenticateBasic = function(user, pass) {
    return this.findOne({"name": user})
    .then(results => {
      return this.comparePassword(pass, results.password, results)
    })
    // .then(results => {
    //     console.log(results)
    //     return bcrypt.compare(pass, results.password)
    // })
  }

userSchema.statics.generateToken = function(userName){
    let token = jwt.sign({ "username": userName }, 'SECRET_STRING');
    return token;
}

userSchema.statics.comparePassword = function(pass, pass2, object){
    const compare = bcrypt.compare(pass, pass2);
    if(compare){
        return object;
    }
    else{
        return null;
    }
}

module.exports = mongoose.model('Users', userSchema);