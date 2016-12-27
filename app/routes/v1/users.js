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
        path: '/api/v1/users/{uid}/peers',
        handler: function(request, reply){
            var uid = request.params.uid;
            var user = new UserService();

            user.isUserAdmin(uid)
            .then(function(result){
                user.getPeers(uid)
                .then(function(result){
                    reply(result);
                })
                .catch(function(error){
                    reply(Boom.notFound());
                });
            })
            .catch(function(error){
                reply(Boom.forbidden('User does not have authorization'));
            });


        }
    },
    // Get list of users for a company
    {
        method: 'GET',
        path: '/api/v1/companies/{id}/users',
        handler: function(request, reply){
            var user = new UserService();
            user.getUsersForCompany(request.params.id)
            .then(function(result){
                reply(result);
            })
            .catch(function(error){
                reply(Boom.serverUnavailable(error));
            });
        }
    },
    // Add new user
    {
        method: 'POST',
        path: '/api/v1/companies/{id}/users',
        handler: function(request, reply){
            var data = Object.assign(request.payload, {companyId: request.params.id});
            var user = new UserService();

            user.addUser(data)
            .then(function(result){
                reply(result);
            })
            .catch(function(error){
                reply(Boom.serverUnavailable(error));
            });
        },
        config:{
            validate:{
                payload:{
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string().required(),
                    phone: Joi.string().required()
                }
            }
        }
    }
];
