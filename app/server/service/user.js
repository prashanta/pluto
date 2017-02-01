/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';
import tracer from 'tracer';
import bcrypt from 'bcrypt';
import _config from 'config';
import Err from '../error';
const config = _config.default;

var logger = config.logger;

export default class User{
  constructor(){
  }

  // Add new user
  addUser(data, type = 'user'){
    return new Promise(function(resolve, reject){
      // Hash password
      bcrypt.hash(data.password, 10)
      .then(function(hash){
        // Create user in database
        return models.user.create({
          tenantId: data.tenantId,
          passwordHash: hash,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          type: type
        });
      })
      .then(function(result){
        resolve({name: `${data.firstName} ${data.lastName}`, id: data.tenantId});
      })
      .catch(function(){
        reject();
      });
    });
  }

  // Add new user as administrator
  addAdmin(data){
    return this.addUser(data, 'admin');
  }

  // Get list of peers
  getPeers(uuid){
    return new Promise(function(resolve,reject){
      this.getTenantId(uuid)
      .then(function(result){
        logger.log(result);
        if(result === null)
        reject();
        else{
          models.user.findAll({
            attributes: ['email','uuid','firstName','lastName','type'],
            where: {tenantId: result, active: 1}
          })
          .then(function(result){
            resolve(result);
          })
          .catch(function(error){
            logger.error(error);
            reject();
          });
        }
      })
      .catch(function(){
        reject();
      });
    }.bind(this));
  }

  // Get list of users for a tenant
  getUsersForTenant(id){
    return new Promise(function(resolve,reject){
      models.user.findAll({
        attributes: ['email','uuid','firstName','lastName','type'],
        where: {tenantId: id, active: 1}
      })
      .then(function(result){
        resolve(result);
      })
      .catch(function(){
        reject('something went wrong');
      });
    });
  }

  getUserDetail(username){
    return new Promise(function(resolve,reject){
      models.user.findOne({
        where:{email: username},
        attributes:['firstName', 'lastName', 'type']
      })
      .then(function(result){
        resolve({
          name: `${result.get('firstName')} ${result.get('lastName')}`,
          type: result.get('type')
        });
      });
    });
  }

  getTenantId(uuid){
    return new Promise(function(resolve,reject){
      models.user.findOne({
        where:{uuid: uuid},
        attributes:['tenantId']
      })
      .then(function(result){
        if(result)
        resolve(result.get('tenantId'));
        else
        resolve(null);
      })
      .catch(function(error){
        logger.error(error);
        reject();
      });
    });
  }

  getPasswordHash(username){
    return new Promise(function(resolve,reject){
      models.user.findOne({
        attributes: ['passwordHash', 'uuid', 'type'],
        where: {email: username}
      })
      .then(function(result){
        if(result)
        resolve(result.get());
        else
        resolve(null);
      })
      .catch(function(error){
        reject();
      });
    });
  }

  isUserAdmin(uuid){
    return new Promise(function(resolve, reject) {
      models.user.findOne({attributes: ['type'], where: {uuid: uuid, active: 1}})
      .then(function(result){
        if(result.getDataValue('type') == 'admin')
        resolve(1);
        else
        reject(0);
      })
      .catch(function(error){
        reject();
      });
    });
  }

  isUserExist(email){
    return new Promise(function(resolve, reject) {
      models.user.findAndCountAll({where: {email: email}})
      .then(function(result){
        if(result.count > 0){
          var err = new Err.UserExistError("User already exist");
          reject(err);
          //resolve(1);
        }
        else
          resolve(0);
      })
      .catch(function(error){
        logger.log(error.message);
        reject(error);
      });
    });
  }
}
