
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
}
