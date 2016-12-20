var path = require('path');

var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var _config = {

  development: {
    root: rootPath,
    app: {
      name: 'pluto'
    },
    port: 3000,
    db: {
        username: "root",
        password: "root",
        database: "hydra",
        config:{
            host: "127.0.0.1",
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
    root: rootPath,
    app: {
      name: 'pluto'
    },
    port: 80,
    db: {
        username: "root",
        password: "root",
        database: "hydra",
        config:{
            host: "127.0.0.1",
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

module.exports =  _config[env];
