'use strict';

const model = require('../model/authorize.schema.js');

function capabable(capability){
    return function (req, res, next){
        const role = req.body.user.role;
        const array = model.capabilities[role];

        if(array.includes(capability)){
            next();
        }
        else {
            next('Not Authorized')
        }
        }
    
}

module.exports = capabable;
