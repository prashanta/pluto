/*jshint esversion: 6 */

import Hapi from 'hapi';
import config from './config';
import Inert from 'inert';
import Routes from './routes';
import pjson from '../package.json';
import Good from 'good';
import jwtauth from 'hapi-auth-jwt';
import geoip from 'geoip-lite';


const server = new Hapi.Server({debug:{request:['error']}});

console.log(`Starting application ... ${config.name} - ${config.version}`);

server.connection({host:'localhost', port: config.port});

server.start((err)=>{
    if(err){
        throw err;
    }
    console.log(`Server running at ${server.info.uri}`);
});


server.register([Inert, jwtauth], err=>{
    if(err)
        throw err;

    server.auth.strategy('jwt', 'jwt',
        {
            key: config.tsecret,
            verifyOptions: {
                algorithms: ['HS256']
            }
        }
    );

    Routes(server);

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            var ip = request.headers['x-forwarded-for'] || request.info.remoteAddress;
            console.log(geoip.lookup(ip));
            console.log(ip);
            reply.file('app/public/index.html');
        }
    });
});
