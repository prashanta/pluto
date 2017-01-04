/*jshint esversion: 6 */

import Joi from 'joi';
import Boom from 'boom';
import UserService from '../../service/user';
import tracer from 'tracer';
import config from '../../config';
import _ from 'underscore';

var logger = tracer.console({level:config.logLevel});

export default [
    // Get all peers
    {
        method: 'GET',
        path: '/api/v1/users',
        handler: function(request, reply){
            var uid = request.auth.credentials.uid;
            var user = new UserService();

            user.getPeers(uid)
            .then(function(result){
                reply(result);
            })
            .catch(function(error){
                reply(Boom.badImplementation());
            });

        },
        config:{
            auth:{
                strategy: 'jwt',
                scope: ['admin']

            }
        }
    },

    // Add new user
    {
        method: 'POST',
        path: '/api/v1/users',
        handler: function(request, reply){
            var uid = request.auth.credentials.uid;
            var user = new UserService();
            user.isUserExist(request.payload.email)
            .then(function(result){
                if(result === 0){
                    user.getTenantId(uid)
                    .then(function(result){
                        var data = Object.assign(request.payload, {tenantId: result});
                        user.addUser(data)
                        .then(function(result){
                            reply(result);
                        })
                        .catch(function(error){
                            reply(Boom.badImplementation());
                        });
                    })
                    .catch(function(error){
                        reply(Boom.badImplementation());
                    });
                }
                else{
                    reply(Boom.conflict('E-mail already exist.'));
                }
            })
            .catch(function(error){
                reply(Boom.badImplementation());
            });
        },
        config:{
            validate:{
                payload:{
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string().required(),
                    phone: Joi.string().required(),
                    password: Joi.string().trim().min(8).required()
                }
            },
            auth:{
                strategy: 'jwt',
                scope: ['admin']
            }
        }
    }
];
