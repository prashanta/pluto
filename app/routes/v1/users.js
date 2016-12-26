/*jshint esversion: 6 */

import getCompanies from '../../service/company';
import tracer from 'tracer';

var logger = tracer.console({level:'warn'});

export default [
    // Get all users
    {   method: 'GET',
        path: '/api/v1/users',
        handler: function(request, reply){
            logger.log("Getting list of companies...");
            getCompanies()
            .then(function(result){
                reply(result);
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
