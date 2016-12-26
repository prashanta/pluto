/*jshint esversion: 6 */

import Joi from 'joi';
import CompanyService from '../../service/company';
import UserService from '../../service/user';
import tracer from 'tracer';
import config from '../../config';

var logger = tracer.console({level:config.logLevel});
var comp = new CompanyService();
export default [
    // Get list of companies
    {
        method: 'GET',
        path: '/api/v1/companies',
        handler: function(request, reply){
            comp.getCompanies()
            .then(function(result){
                reply(result);
            });
        }
    },
    // Get list of users for a company
    {
        method: 'GET',
        path: '/api/v1/companies/{id}/users',
        handler: function(request, reply){
            var user = new UserService();
            user.getUsersForCompany(request.params.id)
            .then(function(result){
                reply(result);
            });
        }
    },
    // Add new company - first add company then add admin user
    {
        method: 'POST',
        path: '/api/v1/companies',
        handler: function(request, reply){
            var data = request.payload;
            var user = new UserService();
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
