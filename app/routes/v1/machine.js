/*jshint esversion: 6 */
import getCompanies from '../../service/companies';

var version = 'v1';

var machine = [
    // Get machines
    {   method: 'GET',
        path: `/api/${version}/machine`,
        handler: function(request, reply){
            console.log("handle stuffs here");
            getCompanies()
            .then(function(result){
                reply(result);
            });
        }
    },
    // Get machine with ID
    {   method: 'GET',
        path: `/api/${version}/machine/{id}`,
        handler: function(request, reply){
            console.log("get workcell information for: " + request.param.id);
        }
    }
];

export default machine;
