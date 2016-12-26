
/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';
import tracer from 'tracer';

var logger = tracer.console();

export default class User{
    constructor(){
        logger.log("User constructor");
    }

    // Add new user as administrator
    addAdmin(data){
        return new Promise(function(resolve, reject){
            models.user.create({
                companyId: data.companyId,
                firstName: data.firstName,
                middleName: data.middleName? data.middleName : null,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                type: 'admin'
            })
            .then(function(result){
                resolve();
            });
        });
    }

    // Get list of users
    getUsers(uid){
        return new Promise(function(resolve,reject){
            models.user.findOne({attributes:['companyId'], where: {uid: uid}})
            .then(function(result){
                if(result === null)
                    reject();
                else{
                    models.user.findAll({
                        attributes: ['email','uid','firstName','lastName'],
                        where: {companyId: result.getDataValue('companyId')}
                    })
                    .then(function(result){
                        resolve(result);
                    });
                }
            });
        });
    }

    // Get list of users for a company
    getUsersForCompany(id){
        return new Promise(function(resolve,reject){
            models.user.findAll({
                attributes: ['email','uid','firstName','lastName'],
                where: {companyId: id}
            })
            .then(function(result){
                resolve(result);
            });
        });
    }
}
