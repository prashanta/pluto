/*jshint esversion: 6 */
import Joi from 'joi';
import Boom from 'boom';
import tracer from 'tracer';
import _config from 'config';
import * as MachineService from '../../service/machine';
import WorkcellService from '../../service/workcell';
import UserService from '../../service/user';
import * as ActivateService from '../../service/activate';
import * as AuthService from '../../service/authenticate';

var config = _config.default;
var logger = tracer.console({level:config.logLevel});

export default [

    // Get machines in a workcell
    {
        method: 'GET',
        path: '/api/v1/workcells/{wid}/machines',
        handler: function(request, reply){
            var uuid = request.auth.credentials.uuid;
            var user = new UserService();
            user.getTenantId(uuid)
            .then(function(result){
                if(result){
                    MachineService.getWorkcellMachines(result, request.params.wid)
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
            var uuid = request.auth.credentials.uuid;
            var user = new UserService();
            user.getTenantId(uuid)
            .then(function(result){
                if(result){
                    MachineService.getAllMachines(result)
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
            var uuid = request.auth.credentials.uuid;
            var data = Object.assign(request.payload, {workcellId: request.params.wid});
            var user = new UserService();
            var workcell = new WorkcellService();
            var tenantId = null;
            // Get user's tenantId
            user.getTenantId(uuid)
            // Get workcell's tenantId
            .then(function(result){
                if(result){
                    tenantId = result;
                    return workcell.getTenantId(data.workcellId);
                }
                else
                    return Promise.reject(Boom.badImplementation());
            })
            // Check if tenantId match
            .then(function(result){
                if(result){
                    return (tenantId === result)? Promise.resolve() :
                    Promise.reject(Boom.unauthorized('Cannot add machine in unauthorized workcell'));
                }
                else
                    return Promise.reject(Boom.badRequest('Invalid workcell'));
            })
            // Check if machine exist
            .then(function(){
                return MachineService.isMachineExist(tenantId, data.code);
            })
            // Add machine (if machine does not exist)
            .then(function(result){
                if(result === 0)
                    return MachineService.addMachine(data);
                else
                    return Promise.reject(Boom.conflict('Machine already exist'));
            })
            // Send response
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
        }
    },
    // Get activation code
    {
        method: 'GET',
        path: '/api/v1/machines/{id}/activate',
        handler: function(request, reply){
            var activationCode;
            var uuid = request.auth.credentials.uuid;

            //TODO Check if machine id belongs to tenant context

            ActivateService.genMachineActivationCode()
            .then(function(result){
                activationCode = result;
                return ActivateService.storeMachineActivationCode(request.params.id, result);
            })
            .then(function(){
                reply({code: activationCode});
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
                    id: Joi.number().integer()
                }
            },
            auth:{
                strategy: 'jwt',
                scope: ['admin','user']
            }
        }
    },
    // Validate activation code
    {
        method: 'GET',
        path: '/api/v1/machines/activate/{code}',
        handler: function(request, reply){
            var output = {};

            ActivateService.validateMachineActivationCode(request.params.code)
            .then(function(result){
                if(result){
                    output.machineId = result.machineId;
                    return MachineService.getChannelId(result.machineId);
                }
                else
                    reply(Boom.badRequest('Could not validate machine'));
            })
            .then(function(result){
                if(result){
                    output.channelId = result.channelId;
                    output.token = AuthService.createMachineToken(output.machineId);
                    logger.log(output);
                    reply(output);
                }
            });
        },
        config:{
            validate:{
                params:{
                    code: Joi.number().integer()
                }
            }
        }
    }


];
