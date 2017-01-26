/*jshint esversion: 6 */

import Joi from 'joi';
import Boom from 'boom';
import * as AuthService from '../../service/authenticate';
import UserService from '../../service/user';
import _config from 'config';
import _ from 'underscore';

var config = _config.default;
const logger = config.logger;

export default [
    // Login a user
    {
        method: 'POST',
        path: '/api/v1/login',
        handler: function(request, reply){
            AuthService.login(request.payload)
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
    },
    // Validate a previously granted token
    {
        method: 'GET',
        path: '/api/v1/token/validate',
        handler: function(request, reply){
            reply({result: 1});
        },
        config:{
            auth:{
                strategy: 'jwt'
            }
        }
    }

];
