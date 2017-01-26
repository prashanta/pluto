
/*jshint esversion: 6 */

import Boom from 'boom';
import Promise from 'bluebird';
import tracer from 'tracer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from './user';
import _config from 'config';
const config = _config.default;

var logger = config.logger;


// Login
export function login(data){
  return new Promise(function(resolve, reject){
    var user = new UserService();
    user.getPasswordHash(data.username)
    .then(function(hash){
      if(hash){
        // Compare password
        bcrypt.compare(data.password, hash.passwordHash)
        .then(function(result){
          // If password ok
          if(result){
            // Create token
            var token = this.createToken(data.username, hash.uuid, hash.type);
            // Get user detail
            user.getUserDetail(data.username)
            .then(function(result){
              resolve(Object.assign({token: token},result));
            })
            .catch(function(){
              reject();
            });
          }
          else{
            resolve(null);
          }
        }.bind(this));
      }
      else
      resolve(null);
    }.bind(this))
    .catch(function(error){
      reject();
    });
  }.bind(this));
}

export function createToken(username, uuid, type){
  var params = {username: username, uuid: uuid, scope: [type]};
  return jwt.sign(
    params,
    config.tsecret,
    {algorithm: 'HS256', expiresIn: "1h"}
  );
}

export function createMachineToken(machineId){
  var params = {machineId: machineId};
  return jwt.sign(
    params,
    config.tsecret,
    {algorithm: 'HS256'}
  );
}
