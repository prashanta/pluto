
/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';
import tracer from 'tracer';

var logger = tracer.console();

export default class User{
    constructor(){

    }

    // Add new user
    addUser(data, type = 'user'){
        return new Promise(function(resolve, reject){
            this.isUserExist(data.email)
            .then(function(result){
                models.user.create({
                    companyId: data.companyId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    type: type
                })
                .then(function(result){
                    resolve("User added");
                })
                .catch(function(){
                    reject('Could not add user');
                });
            })
            .catch(function(error){
                reject(error);
            });

        }.bind(this));
    }

    // Add new user as administrator
    addAdmin(data){
        return this.addUser(data, 'admin');
    }

    // Get list of peers
    getPeers(uid){
        return new Promise(function(resolve,reject){
            models.user.findOne({attributes:['companyId'], where: {uid: uid}})
            .then(function(result){
                if(result === null)
                    reject();
                else{
                    models.user.findAll({
                        attributes: ['email','uid','firstName','lastName','type'],
                        where: {companyId: result.getDataValue('companyId'), active: 1}
                    })
                    .then(function(result){
                        resolve(result);
                    });
                }
            })
            .catch(function(){
                reject('Somethg went wrong');
            });
        });
    }

    // Get list of users for a company
    getUsersForCompany(id){
        return new Promise(function(resolve,reject){
            models.user.findAll({
                attributes: ['email','uid','firstName','lastName','type'],
                where: {companyId: id, active: 1}
            })
            .then(function(result){
                resolve(result);
            })
            .catch(function(){
                reject('something went wrong');
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
            });
        });
    }

    isUserExist(userEmail){
        return new Promise(function(resolve, reject) {
            models.user.findAndCountAll({where: {email: userEmail}})
            .then(function(result){
                if(result.count > 0)
                    reject("User already exist");
                else
                    resolve();
            })
            .catch(function(error){
                reject(error);
            });
        });
    }
}
