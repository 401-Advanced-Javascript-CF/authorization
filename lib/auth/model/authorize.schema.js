'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});


userSchema.statics.authenticateBasic = function(user, pass) {
  console.log(`i am the schema user and pass ${typeof user} ${typeof pass}`);
    return this.findOne({ "name" : user})
    .then(results => {
      console.log(`i am the result of findOne ${results}`);
      return this.comparePassword(pass, results.password, results)
    })
    // .then(results => {
    //     console.log(results)
    //     return bcrypt.compare(pass, results.password)
    // })
  }

userSchema.statics.generateToken = function(userName){
  let token = jwt.sign({ "username": userName }, 'SECRET_STRING');
  console.log(userName);
    return token;
}

userSchema.statics.comparePassword = function(pass, pass2, object){
  console.log(pass);
  console.log(pass2);  
  return bcrypt.compare(pass, pass2)
    .then(results => {
      console.log(`i am the result of bcrypt compare ${results}`);
      console.log(`i am the object parameter passed in ${object}`);
      // console.log(`i am compare variable ${compare}`);
      if(results){
          return object;
      }
      else{
          return null;
      }

    })
    // return object;
}

module.exports = mongoose.model('Users', userSchema);