/*jshint esversion: 6 */

import path from 'path';
import tracer from 'tracer';
import pkg from '../package.json';

var rootPath = path.normalize(__dirname + '/../..');

export default {
  // APP NAME
  name : pkg.name,
  // APP VERSION
  version : pkg.version,
  // APP ROOT PATH
  root : rootPath,
  // SERVER PORT
  port : 3000,
  // SECRET FOR TOKEN GEN
  tsecret : 'hotsauce',

  // DATABASE
  db : {
    username : "root",
    password : "root",
    database : "charon",
    options :{
      host : "127.0.0.1",
      port : 3306,
      dialect : "mysql",
      pool : {
        max : 5,
        min : 0,
        idle : 10000
      }
    }
  },
  // ABLY PUBLICATION KEY
  MSG_PUB_KEY : process.env.PLUTO_PUBNUB_PUB_KEY || 'pub-c-eb0569b1-bf91-435e-a900-01919ee97a73',
  // ABLY SUBSCRIPTION KEY
  MSG_SUB_KEY : process.env.PLUTO_PUBNUB_SUB_KEY || 'sub-c-2b758292-d85c-11e6-b9cf-02ee2ddab7fe',
  // ABLY LOG CHANNGEL NAME
  MSG_CH_LOG : 'sys_log',
  // LOGGER
  logger : tracer.colorConsole({
    level: 'log',
    format : "[{{timestamp}}] <{{title}}> ({{file}}:{{line}}) {{message}}",
    dateformat : "dd.mmm.yy-HH:MM:ss(L)o",
  })
};
