'use strict';

const Schema = require('../model/authorize.schema.js');
// const Collection = require('../model/authorize.collection.js');

// const stuff = new Collection(Schema);
const base64 = require('base-64');
const router = require('../route/discord.route.js');

function routes(req, res, next){
    let encodedString = req.headers.authorization.split(' ')[0]
    if(encodedString === 'Basic'){
        return authorizeBasic(req, res, next);
    }
    else if(encodedString === "Bearer"){
        return bearerBasic(req, res, next);
    }
    else{
        next('not a valid header');
    }

}

async function bearerBasic(req, res, next){
    let tokenString = req.headers.authorization.split(' ')[1];
try {
    let token = await Schema.validateToken(tokenString);
    if(token){
        let user = await Schema.findOne({"name":token.username})
        req.body.user = user; 
    }

    console.log(req.body.user)
    next()
    
} catch (error) {
    console.log(error);
    next(error)
}
}

function authorizeBasic(req, res, next){
'Basic bryant:I_Am_A_scrub'
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
            console.log(`i am the token ${req.body.token}`)
            next();
        }
        else {
            next('User not Valid');
        } 
    }
}

module.exports = routes;
