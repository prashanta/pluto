/*jshint esversion: 6 */

import path from 'path';
import tracer from 'tracer';
import pkg from '../package.json';

var rootPath = path.normalize(__dirname + '/../..');

console.log("Loading....test config ");

export default {
  db : {
    username : "root",
    password : "root",
    database : "charon-test",
    options :{
      host : "127.0.0.1",
      port : 3306,
      dialect : "mysql",
      pool : {
        max : 5,
        min : 0,
        idle : 10000
      },
      logging: false
    }
  },
  logger : tracer.colorConsole({
    level: 'warn',
    format : "[{{timestamp}}] <{{title}}> ({{file}}:{{line}}) {{message}}",
    dateformat : "dd.mmm.yy-HH:MM:ss(L)o",
  })
};
