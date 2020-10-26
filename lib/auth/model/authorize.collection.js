'use strict';

const bcrypt = require('bcrypt')

class UserMongo{
    constructor(model){
        this.model = model;
    }

    save(object){
        const user = new this.model(object);
        return bcrypt.hash(user.password, 10)
        .then(results => {
            console.log(results);
            user.password = results;
            console.log(user);
            return user.save();
            
        })
    }

    find(object){
        return this.model.find(object);
    }

}

module.exports = UserMongo;