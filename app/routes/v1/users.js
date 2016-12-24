/*jshint esversion: 6 */

import getCompanies from '../../service/companies';
import tracer from 'tracer';

var logger = tracer.console({level:'warn'});

var users = [
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
    {   method: 'POST',
        path: '/api/v1/users',
        handler: function(request, reply){
            reply('done');
        }
    }
];

export default users;
