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
            res.status(200).json(results);
            next();
        })
    } catch (error) {
        console.error(error)
    }
})

router.post('/user/signIn', authorize, verify('read'));

module.exports = router;