/*jshint esversion: 6 */
import Joi from 'joi';
import tracer from 'tracer';
import config from '../../config';

var logger = tracer.console({level:config.logLevel});

export default [

    // Get machines
    {   method: 'GET',
        path: '/api/v1/machine',
        handler: function(request, reply){
            reply("to be implemented");
        }
    },

    // Get machine with ID
    {   method: 'GET',
        path: '/api/v1/machine/{id}',
        handler: function(request, reply){
            console.log("get workcell information for: " + request.param.id);
        }
    }
];
