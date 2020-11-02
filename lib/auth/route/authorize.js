'use strict';

const express = require('express');
const router = express.Router();
const UserMongo = require('../model/authorize.collection.js');
const Model = require('../model/authorize.schema.js');
const authorize = require('../middleware/authorizeBasic.js');
const verify = require('../middleware/acl.js');
const DB = new UserMongo(Model);

function handleAuthorized(req, res, next){
    res.send('Authorized');
}


router.post('/user/signUp', (req, res, next) => {
    try {
        let user = req.body;
        DB.save(user).then(results => {
            req.body.token = Model.generateToken(req.body.name)
                console.log(req.body.token);
                res.status(200).json(results);
                next();

        })
    } catch (error) {
        console.error(error)
    }
})

router.post('/user/signIn', authorize, handleAuthorized);

router.get('/user/read', authorize, verify('read'), handleAuthorized);

router.put('/user/update', authorize, verify('update'), handleAuthorized);

router.post('/user/create', authorize, verify('create'), handleAuthorized);

router.delete('/user/delete', authorize, verify('delete'), handleAuthorized);


module.exports = router;