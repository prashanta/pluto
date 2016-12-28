/*jshint esversion: 6 */

import path from 'path';
import pkg from '../package.json';

var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var _config = {
    development: {
        port: 3000, // server port
        logLevel: 'log',
        tsecret: 'hotsauce',
        db: {
            username: "root",
            password: "root",
            database: "charon",
            options:{
                host: "127.0.0.1",
                port: 3306,
                dialect: "mysql",
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            }
        }
    },

    production: {
        port: 80,
        logLevel: 'warn',
        tsecret: process.env.JWT_SECRET,
        db: {
            username: "root",
            password: "root",
            database: "charon",
            options:{
                host: "127.0.0.1",
                port: 3306,
                dialect: "mysql",
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            }
        }
    }
};

var config = _config[env];
console.log("Loading configurations for:", env);

config.name = pkg.name;
config.version = pkg.version;
config.root = rootPath;

export default config;
