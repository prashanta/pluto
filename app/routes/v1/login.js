/*jshint esversion: 6 */

import Joi from 'joi';
import Boom from 'boom';
import AuthService from '../../service/authenticate';
import UserService from '../../service/user';
import tracer from 'tracer';
import config from '../../config';
import _ from 'underscore';

var logger = tracer.console({level:config.logLevel});

export default [
    // Login
    {
        method: 'POST',
        path: '/api/v1/login',
        handler: function(request, reply){
            var auth = new AuthService();
            auth.login(request.payload)
            .then(function(result){
                if(result){
                    reply(result);
                }
                else{
                    reply(Boom.unauthorized('Invalid Username or Password'));
                }
            })
            .catch(function(){
                reply(Boom.badImplementation());
            });
        },
        config:{
            validate:{
                payload:{
                    username: Joi.string().trim().email().required(),
                    password: Joi.string().trim().min(8).required(),
                }
            }
        }
    }
];
