'use strict';

const Schema = require('../model/authorize.schema.js');
function authorizeBasic(req, res, next){
    return Schema.authenticateBasic(req.body.name, req.body.password)
    .then(results => {
        isValid(results);
    })
    function isValid(username){
        if(username){
            req.body.user = username;
            req.body.token = username.generateToken(username.name);
            next();
        }
        else {
            next('User not Valid');
        } 
    }
}

module.exports = authorizeBasic;
