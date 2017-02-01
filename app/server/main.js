/*jshint esversion: 6 */

import Hapi from 'hapi';
import _config from 'config';
//import config from './config';
import Inert from 'inert';
import Routes from './routes';
import Msg from './msg';
import pjson from '../../package.json';
import Good from 'good';
import jwtauth from 'hapi-auth-jwt';

var config = _config.default;

const logger = config.logger;
const server = new Hapi.Server();
// const server = new Hapi.Server({debug:{request:['error']}});
const msg = new Msg();

logger.info(`Starting application ... ${config.name} - ${config.version}`);

server.connection({host:'localhost', port: config.port});

server.start((err)=>{
    if(err) throw err;
    logger.info(`Server running at ${server.info.uri}`);
});


server.register([Inert, jwtauth], err=>{
    if(err) throw err;

    var validate = function (request, decodedToken, callback) {
        var error, credentials = decodedToken || null;
        if (!credentials) {
            return callback(error, false, credentials);
        }
        return callback(error, true, credentials);
    };

    server.auth.strategy('jwt', 'jwt',
        {
            key: config.tsecret,
            validateFunc: validate,
            verifyOptions: {
                algorithms: ['HS256']
            }
        }
    );

    // REGISTER ROUTES
    Routes(server);

    // SUBSCRIBE TO CHANNELS
    msg.subscribeMDCs();

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            var ip = request.headers['x-forwarded-for'] || request.info.remoteAddress;
            reply.file('app/public/index.html');
        }
    });
});

export default server;
