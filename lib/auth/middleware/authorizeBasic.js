'use strict';

const Schema = require('../model/authorize.schema.js');
// const Collection = require('../model/authorize.collection.js');

// const stuff = new Collection(Schema);
const base64 = require('base-64');




function authorizeBasic(req, res, next){
    // console.log(req.body);
    // return stuff.find({"name": req.body.name})
    // .then(results => {
    //     console.log(`results ${results}`);
console.log(req.headers)
    const decodedString = base64.decode(req.headers.authorization.split(' ')[1]);

  // short hand destructuring
    let [user, pass] = decodedString.split(':');

        return Schema.authenticateBasic(user, pass)
        .then(results => {
            // console.log(`results2 ${results}`)
            console.log(results);
            isValid(results);
        })

    // })
    function isValid(username){
        // console.log(username);
        if(username){
            req.body.password = username.password;
            req.body.token = Schema.generateToken(username.name);
            next();
        }
        else {
            next('User not Valid');
        } 
    }
}

module.exports = authorizeBasic;
