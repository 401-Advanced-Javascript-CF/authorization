'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'admin', 'editor', 'user'] }
});

userSchema.statics.capabilities = {
  admin: ['read', 'create', 'update', 'delete'],
  writer: ['read', 'create'],
  editor: ['read', 'create','update'],
  user: ['read'],
};

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.statics.authenticateBasic = function(user, pass) {
    return this.findOne({ "name" : user})
    .then(results => {
      return this.comparePassword(pass, results.password, results)
    })
    // .then(results => {
    //     console.log(results)
    //     return bcrypt.compare(pass, results.password)
    // })
  }

userSchema.statics.generateToken = function(userName){
  let token = jwt.sign({ "username": userName, role: this.capabilities[this.role] }, 'SECRET_STRING');
  console.log(`i am the token ${token}`)
    return token;
}

userSchema.statics.validateToken = async function(token){
  console.log(token);
  let validation = await jwt.verify(token, 'SECRET_STRING');
  console.log(` i am validation ${validation}`)
  if(validation){
    return validation;
  }
  else{
    return Promise.reject('false');
  }
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