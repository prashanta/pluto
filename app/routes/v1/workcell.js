/*jshint esversion: 6 */

var version = 'v1';

var workcell = [

    {   method: 'GET',
        path: `/api/${version}/workcell`,
        handler: function(request, reply){
            reply("handle stuffs here");
        }
    },

    {   method: 'GET',
        path: `/api/${version}/workcell/{id}`,
        handler: function(request, reply){
            reply("get workcell information for: " + request.params.id);
        }
    }
];

export default workcell;
