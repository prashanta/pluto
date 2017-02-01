/*jshint esversion: 6 */

import Joi from 'joi';
import Boom from 'boom';
import tracer from 'tracer';
import WorkcellService from '../../service/workcell';
import UserService from '../../service/user';
import _config from 'config';
import Err from '../../error';
const config = _config.default;

var logger = config.logger;

export default [
  // Get workcells for a tenant
  {
    method: 'GET',
    path: '/api/v1/tenants/{id}/workcells',
    handler: function(request, reply){
      var workcell = new WorkcellService();
      workcell.getWorkcells(request.params.id)
      .then(function(result){
        reply(result);
      })
      .catch(function(){
        reply(Boom.badImplementation());
      });
    },
    config:{
      validate:{
        params:{
          id: Joi.number().integer()
        }
      },
      auth:{
        strategy: 'jwt',
        scope: ['master']
      }
    }
  },
  // Get workcells
  {
    method: 'GET',
    path: '/api/v1/workcells',
    handler: function(request, reply){
      var uuid = request.auth.credentials.uuid;
      var workcell = new WorkcellService();
      var user = new UserService();
      user.getTenantId(uuid)
      .then(function(result){
        if(result){
          workcell.getWorkcells(result)
          .then(function(result){
            reply(result);
          })
          .catch(function(error){
            reply(Boom.badImplementation());
          });
        }
        else
        reply(Boom.badImplementation());
      })
      .catch(function(error){
        reply(Boom.badImplementation());
      });
    },
    config:{
      auth:{
        strategy: 'jwt',
        scope: ['admin','user']
      }
    }
  },
  // Get workcell data
  {
    method: 'GET',
    path: '/api/v1/workcells/{id}',
    handler: function(request, reply){
      var uuid = request.auth.credentials.uuid;
      var workcell = new WorkcellService();
      var user = new UserService();
      user.getTenantId(uuid)
      .then(function(result){
        if(result){
          workcell.getWorkcellInfo(result, request.params.id)
          .then(function(result){
            if(result)
            reply(result);
            else
            reply(Boom.notFound('Workcell not found'));
          });
        }
        else
        reply(Boom.badImplementation());
      })
      .catch(function(error){
        if(error) logger.error(error);
        reply(Boom.badImplementation());
      });
    },
    config:{
      validate:{
        params:{
          id: Joi.number().integer()
        }
      },
      auth:{
        strategy: 'jwt',
        scope: ['admin','user']
      }
    }
  },
  // Add new workcell to a tenant
  {
    method: 'POST',
    path: '/api/v1/workcells',
    handler: function(request, reply){
      var uuid = request.auth.credentials.uuid;
      var workcell = new WorkcellService();
      var user = new UserService();

      user.getTenantId(uuid)
      .then(function(result){
        if(result){
          var data = Object.assign(request.payload, {tenantId: result});
          workcell.isWorkcellExist(data.tenantId, data.code)
          .then(function(result){
            workcell.addWorkcell(data)
            .then(function(result){
              reply(result);
            })
            .catch(function(error){
              if(error) logger.error(error);
              reply(Boom.badImplementation());
            });
          })
          .catch(Err.WorkcellExistError, function(error){
            reply(Boom.conflict(error.message));
          })
          .catch(function(error){
            if(error) logger.error(error);
            reply(Boom.badImplementation());
          });
        }
        else
        reply(Boom.badImplementation());
      })
      .catch(function(error){
        if(error) logger.error(error);
        reply(error);
      });
    },
    config:{
      validate:{
        payload:{
          code: Joi.string().trim().max(100).required(),
          name: Joi.string().trim().max(100).required(),
          description: Joi.string().trim().max(100)
        }
      },
      auth:{
        strategy: 'jwt',
        scope: ['admin']
      }
    }
  }

];
