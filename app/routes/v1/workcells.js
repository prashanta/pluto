/*jshint esversion: 6 */

import Joi from 'joi';
import tracer from 'tracer';
import config from '../../config';

var logger = tracer.console({level:config.logLevel});
var version = 'v1';

export default [

    {   method: 'GET',
        path: '/api/v1/workcell',
        handler: function(request, reply){
            reply("handle stuffs here");
        }
    },

    {   method: 'GET',
        path: '/api/v1/workcell/{id}',
        handler: function(request, reply){
            reply("get workcell information for: " + request.params.id);
        }
    }
];
