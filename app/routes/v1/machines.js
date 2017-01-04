/*jshint esversion: 6 */
import Joi from 'joi';
import Boom from 'boom';
import tracer from 'tracer';
import config from '../../config';
import MachineService from '../../service/machine';
import WorkcellService from '../../service/workcell';
import UserService from '../../service/user';

var logger = tracer.console({level:config.logLevel});

export default [

    // Get machines in a workcell
    {
        method: 'GET',
        path: '/api/v1/workcells/{wid}/machines',
        handler: function(request, reply){
            var uid = request.auth.credentials.uid;
            var machine = new MachineService();
            var user = new UserService();
            user.getTenantId(uid)
            .then(function(result){
                if(result){
                    machine.getWorkcellMachines(result, request.params.wid)
                    .then(function(result){
                        reply(result);
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
                reply(Boom.badImplementation());
            });
        },
        config:{
            validate:{
                params:{
                    wid: Joi.number().integer()
                }
            },
            auth:{
                strategy: 'jwt',
                scope: ['admin','user']
            }
        }
    },
    // Get machines in all workcells
    {
        method: 'GET',
        path: '/api/v1/machines',
        handler: function(request, reply){
            var uid = request.auth.credentials.uid;
            var machine = new MachineService();
            var user = new UserService();
            user.getTenantId(uid)
            .then(function(result){
                if(result){
                    machine.getAllMachines(result)
                    .then(function(result){
                        reply(result);
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
    // Add machine to workcell
    {
        method: 'POST',
        path: '/api/v1/workcells/{wid}/machines',
        handler: function(request, reply){
            var uid = request.auth.credentials.uid;
            var data = Object.assign(request.payload, {workcellId: request.params.wid});
            var machine = new MachineService();
            var user = new UserService();
            var workcell = new WorkcellService();
            var tenantId = null;
            // Get user's tenantId
            user.getTenantId(uid)
            // Get workcell's tenantId
            .then(function(result){
                if(result){
                    tenantId = result;
                    return workcell.getTenantId(data.workcellId);
                }
                else
                    return Promise.reject(Boom.badImplementation());
            })
            // Check if machine exists
            .then(function(result){
                if(result){
                    if(tenantId === result)
                        return machine.isMachineExist(tenantId, data.code);
                    else{
                        return Promise.reject(Boom.unauthorized('Cannot add machine in unauthorized workcell'));
                    }
                }
                else
                    return Promise.reject(Boom.badRequest('Invalid workcell'));
            })
            // Add machine
            .then(function(result){
                logger.log(result);
                if(result === 0)
                    return machine.addMachine(data);
                else
                    return Promise.reject(Boom.conflict('Machine already exist'));
            })
            .then(function(result){
                reply(result);
            })
            .catch(function(error){
                if(error) logger.error(error);
                if(error.isBoom)
                    reply(error);
                else
                    reply(Boom.badImplementation());
            });
        },
        config:{
            validate:{
                params:{
                    wid: Joi.number().integer()
                },
                payload:{
                    code: Joi.string().trim().max(100).required(),
                    seriallNumber: Joi.string().trim().max(100),
                    model: Joi.string().trim().max(100).required(),
                    manufacturer: Joi.string().trim().max(100).required(),
                    description: Joi.string().trim().max(100),
                    type: Joi.string().trim().max(100)
                }
            },
            auth:{
                strategy: 'jwt',
                scope: ['admin']
            }
        },
    }
];
