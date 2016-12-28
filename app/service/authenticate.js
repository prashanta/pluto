
/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';
import tracer from 'tracer';
import config from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from './user';

var logger = tracer.console({level:config.logLevel});

export default class Authenticate{
    constructor(){

    }

    // Add new user
    login(data){
        return new Promise(function(resolve, reject){
            var user = new UserService();
            user.getPasswordHash(data.username)
                .then(function(hash){
                logger.log(hash);
                bcrypt.compare(data.password, hash)
                .then(function(result){
                    if(result)
                        resolve(this.createToken(data.username));
                    else
                        reject("Login failed");
                }.bind(this));
            }.bind(this))
            .catch(function(error){
                reject(error);
            });
        }.bind(this));
    }

    createToken(username){
        return jwt.sign(
            {username: username},
            config.tsecret,
            {algorithm: 'HS256', expiresIn: "1m"}
        );
    }
}
