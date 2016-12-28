/*jshint esversion: 6 */
import Joi from 'joi';
import Boom from 'boom';
import tracer from 'tracer';
import config from '../../config';
import MachineService from '../../service/machine';

var logger = tracer.console({level:config.logLevel});

export default [

    // Get machines in a workcell
    {
        method: 'GET',
        path: '/api/v1/workcells/{wid}/machines',
        handler: function(request, reply){
            var machine = new MachineService();
            machine.getWorkcellMachines(request.params.wid)
            .then(function(result){
                reply(result);
            })
            .catch(function(error){
                reply(error);
            });
        },
        config:{
            auth:{
                strategy: 'jwt'
            }
        }
    },
    // Get machines in all workcells
    {
        method: 'GET',
        path: '/api/v1/companies/{cid}/machines',
        handler: function(request, reply){
            var machine = new MachineService();
            machine.getCompanyMachines(request.params.cid)
            .then(function(result){
                reply(result);
            })
            .catch(function(error){
                reply(error);
            });
        },
        config:{
            auth:{
                strategy: 'jwt'
            }
        }
    },
    // Add machine to workcell
    {
        method: 'POST',
        path: '/api/v1/workcells/{wid}/machines',
        handler: function(request, reply){
            var data = Object.assign(request.payload, {workcellId: request.params.wid});
            var machine = new MachineService();
            machine.addMachine(data)
            .then(function(result){
                reply(result);
            })
            .catch(function(error){
                reply(error);
            });
        },
        config:{
            validate:{
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
                strategy: 'jwt'
            }
        },
    }
];
