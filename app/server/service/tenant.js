/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';
import tracer from 'tracer';
import _config from 'config';
const config = _config.default;

var logger = config.logger;

export default class Tenant{
  constructor(){
  }

  // Add new tenant
  addTenant(data){
    return new Promise(function(resolve, reject){
      var _emailDomain = data.emailDomain? data.emailDomain : data.email.substring(data.email.indexOf('@')+1);
      models.tenant.create({
        name: data.tenantName,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        country: data.country,
        postalCode: data.postalCode,
        emailDomain: _emailDomain,
        website: data.website? data.website : null
      })
      .then(function(tenant){
        resolve(tenant);
      })
      .catch(function(){
        reject();
      });
    });
  }

  // Get list of all tenants
  getTenants(){
    return new Promise(function(resolve, reject){
      models.tenant.findAll({attributes: ['name', 'id']})
      .then(function(result) {
        resolve(result);
      })
      .catch(function(){
        reject();
      });
    });
  }

  getChannelIds(){
    return new Promise(function(resolve, reject){
        models.tenant.findAll({attributes: ['channelId']})
        .then(function(result) {
            let channels = result.map(tenant=>tenant.channelId);
            resolve(channels);
        })
        .catch(function(error){
            reject(error);
        });
    });
  }
}
