/*jshint esversion: 6 */

import Joi from 'joi';
import Company from '../../service/company';
import User from '../../service/user';
import tracer from 'tracer';

var logger = tracer.console({level:'warn'});
var comp = new Company();
export default [
    // Get list of companies
    {   method: 'GET',
        path: '/api/v1/companies',
        handler: function(request, reply){
            comp.getCompanies()
            .then(function(result){
                reply(result);
            });
        }
    },
    // Add new company - first add company then add admin user
    {   method: 'POST',
        path: '/api/v1/companies',
        handler: function(request, reply){
            var data = request.payload;
            var user = new User();
            comp.addCompany(data)
            .then(function(result){
                data.companyId = result.getDataValue('id');
                user.addAdmin(data)
                .then(function(result){
                    reply("Company Added");
                });
            });
        },
        config:{
            validate:{
                payload:{
                    // User data validation
                    firstName: Joi.string().trim().max(100).required(),
                    lastName: Joi.string().trim().max(100).required(),
                    email: Joi.string().trim().email().max(100).required(),
                    phone: Joi.string().trim().max(100).required(),
                    // Company data validation
                    companyName: Joi.string().trim().max(200).required(),
                    address1: Joi.string().trim().max(200).required(),
                    address2: Joi.string().trim().max(200).required(),
                    city: Joi.string().trim().max(100).required(),
                    country: Joi.string().trim().max(100).required(),
                    postalCode: Joi.string().trim().max(100).required(),
                    website: Joi.string().trim().max(100).uri()
                }
            }
        }
    }
];
