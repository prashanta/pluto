/*jshint esversion: 6 */

import Hapi from 'hapi';
import config from './config';
import Inert from 'inert';
import Routes from './routes';
import pjson from '../package.json';
import Good from 'good';

const server = new Hapi.Server({debug:{request:['error']}});

console.log(`Starting application ... ${config.name} - ${config.version}`);

server.connection({host:'localhost', port: config.port});

server.start((err)=>{
    if(err){
        throw err;
    }
    console.log(`Server running at ${server.info.uri}`);
});

Routes(server);

server.register(Inert, err=>{
    if(err)
        throw err;
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('app/public/index.html');
        }
    });
});
