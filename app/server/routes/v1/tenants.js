/*jshint esversion: 6 */

import Joi from 'joi';
import Boom from 'boom';
import TenantService from '../../service/tenant';
import UserService from '../../service/user';
import tracer from 'tracer';
import _config from 'config';
import Err from '../../error';
const config = _config.default;

var logger = config.logger;

export default [
  // GET LIST OF TENANTS
  {
    method: 'GET',
    path: '/api/v1/tenants',
    handler: function(request, reply){
      var tenant = new TenantService();
      tenant.getTenants()
      .then(function(result){
        reply(result);
      })
      .catch(function(){
        reply(Boom.badImplementation());
      });
    },
    config:{
      auth:{
        strategy: 'jwt',
        scope: ['master','!user','!admin']
      }
    }
  },
  // ADD NEW TENANT - first add tenant then add admin user
  {
    method: 'POST',
    path: '/api/v1/tenants',
    handler: function(request, reply){
      var data = request.payload;
      var user = new UserService();
      var tenant = new TenantService();

      user.isUserExist(data.email)
      .then(function(result){
        tenant.addTenant(data)
        .then(function(result){
          data.tenantId = result.getDataValue('id');
          user.addAdmin(data)
          .then(function(result){
            reply(result);
          })
          .catch(function(){
            Promise.reject(Boom.badImplementation());
          });
        })
        .catch(function(error){
          reply(Boom.badImplementation());
        });
      })
      .catch(Err.UserExistError, function(error){
        reply(Boom.conflict(error.message));
      })
      .catch(function(error){
        logger.error(error.message);
        reply(Boom.badImplementation());
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
          password: Joi.string().trim().min(8).required(),
          // Tenant data validation
          tenantName: Joi.string().trim().max(200).required(),
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
