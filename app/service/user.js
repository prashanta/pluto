/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';
import tracer from 'tracer';
import bcrypt from 'bcrypt';
import config from '../config';

var logger = tracer.console({level:config.logLevel});

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
                models.user.create({
                    tenantId: data.tenantId,
                    passwordHash: hash,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    type: type
                })
                .then(function(result){
                    resolve({message:'User created'});
                })
                .catch(function(){
                    reject();
                });
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
    getPeers(uid){
        return new Promise(function(resolve,reject){
            this.getTenantId(uid)
            .then(function(result){
                logger.log(result);
                if(result === null)
                    reject();
                else{
                    models.user.findAll({
                        attributes: ['email','uid','firstName','lastName','type'],
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
                attributes: ['email','uid','firstName','lastName','type'],
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

    getTenantId(uid){
        return new Promise(function(resolve,reject){
            models.user.findOne({
                where:{uid: uid},
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
                attributes: ['passwordHash', 'uid', 'type'],
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

    isUserAdmin(uid){
        return new Promise(function(resolve, reject) {
            models.user.findOne({attributes: ['type'], where: {uid: uid, active: 1}})
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
                if(result.count > 0)
                    resolve(1);
                else
                    resolve(0);
            })
            .catch(function(error){
                logger.log(error);
                reject();
            });
        });
    }
}
