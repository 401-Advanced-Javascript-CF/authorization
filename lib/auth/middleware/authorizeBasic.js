'use strict';

const Schema = require('../model/authorize.schema.js');
// const Collection = require('../model/authorize.collection.js');

// const stuff = new Collection(Schema);
const base64 = require('base-64');




function authorizeBasic(req, res, next){

// console.log(req.headers.authorization.split(' '))
let encodedString = req.headers.authorization.split(' ')[1];
let decodedString = base64.decode(encodedString);
    let user = decodedString.split(':')[0];
    let pass = decodedString.split(':')[1];

    // let decodedString = req.headers.authorization.split(' ');
    // let user = decodedString[1];
    // let pass = decodedString[3];
    
    console.log(`i am the decoded string ${user} ${pass} ${decodedString}`);
    // Basic YnJ5YW50IDogSV9BTV9hX3NjcnVi
    // YnJ5YW50OklfQU1fYV9zY3J1Yg==
    // let user = decodedString[1];
    // let pass = decodedString[3];
    
            return Schema.authenticateBasic(user, pass)
            .then(results => {
                console.log(`i am the results from authenticateBasic ${results}`);
                isValid(results);
            })

    // })
    function isValid(username){
        console.log('i am the isValid username object');
        console.log(username);
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
