'use strict';

function capabable(capability){
    return route(req, res, next);
    function route(req, res, next){
    if(req.user.capabilities.includes(capability)){
        next();
    }
    else {
        next('Not Authorized')
    }
    }
}

module.exports(capabable);
