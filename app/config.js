import path from 'path';

var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var _config = {

  development: {
    root: rootPath,
    app: {
      name: 'pluto'
    },
    port: 3000,
  },

  production: {
    root: rootPath,
    app: {
      name: 'pluto'
    },
    port: 80,
  }
};

export default config = _config[env];
