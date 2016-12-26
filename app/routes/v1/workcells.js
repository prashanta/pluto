/*jshint esversion: 6 */

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
