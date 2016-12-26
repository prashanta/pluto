/*jshint esversion: 6 */

import Joi from 'joi';
import Boom from 'boom';
import User from '../../service/user';
import tracer from 'tracer';
import config from '../../config';

var logger = tracer.console({level:config.logLevel});

var logger = tracer.console({level:config.logLevel});
var user = new User();

export default [
    // Get all users for a company
    {   method: 'GET',
        path: '/api/v1/users/{uid}',
        handler: function(request, reply){
            user.getUsers(request.params.uid)
            .then(function(result){
                reply(result);
            })
            .catch(function(error){
                reply(Boom.notFound());
            });
        }
    },
    // Create new user
    {   method: 'POST',
        path: '/api/v1/users',
        handler: function(request, reply){
            reply('done');
        }
    }
];
