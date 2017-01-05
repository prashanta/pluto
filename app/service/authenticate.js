
/*jshint esversion: 6 */

import models from '../models';
import Boom from 'boom';
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

    // Login
    login(data){
        return new Promise(function(resolve, reject){
            var user = new UserService();
            user.getPasswordHash(data.username)
            .then(function(hash){
                if(hash){
                    // Compare password
                    bcrypt.compare(data.password, hash.passwordHash)
                    .then(function(result){
                        // If password ok
                        if(result){
                            // Create token
                            var token = this.createToken(data.username, hash.uid, hash.type);
                            // Get user detail
                            user.getUserDetail(data.username)
                            .then(function(result){
                                resolve(Object.assign({token: token},result));
                            })
                            .catch(function(){
                                reject();
                            });
                        }
                        else{
                            resolve(null);
                        }
                    }.bind(this));
                }
                else
                resolve(null);
            }.bind(this))
            .catch(function(error){
                reject();
            });
        }.bind(this));
    }

    createToken(username, uid, type){
        var params = {username: username, uid: uid, scope: [type]};
        return jwt.sign(
            params,
            config.tsecret,
            {algorithm: 'HS256', expiresIn: "1h"}
        );
    }
}
