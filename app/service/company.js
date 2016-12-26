
/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';
import tracer from 'tracer';

var logger = tracer.console();

export default class Company{
    constructor(){
    }

    // Add new company
    addCompany(data){
        return new Promise(function(resolve, reject){
            var _emailDomain = data.emailDomain? data.emailDomain : data.email.substring(data.email.indexOf('@')+1);
            models.company.create({
                name: data.companyName,
                address1: data.address1,
                address2: data.address2,
                city: data.city,
                country: data.country,
                postalCode: data.postalCode,
                emailDomain: _emailDomain,
                website: data.website? data.website : null
            })
            .then(function(comp){
                resolve(comp);
            });
        });
    }

    // Get list of all companies
    getCompanies(){
        return new Promise(function(resolve, reject){
            models.company.findAll({attributes: ['name']})
            .then(function(result) {
                resolve(result);
            });
        });
    }
}
