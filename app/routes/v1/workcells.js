/*jshint esversion: 6 */

import Joi from 'joi';
import Boom from 'boom';
import tracer from 'tracer';
import config from '../../config';
import WorkcellService from '../../service/workcell';

var logger = tracer.console({level:config.logLevel});

export default [
    // Get workcells for a company
    {
        method: 'GET',
        path: '/api/v1/companies/{id}/workcells',
        handler: function(request, reply){
            var workcell = new WorkcellService();
            workcell.getWorkcells(request.params.id)
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
    // Add new workcell to a company
    {
        method: 'POST',
        path: '/api/v1/companies/{id}/workcells',
        handler: function(request, reply){
            var workcell = new WorkcellService();
            var data = Object.assign(request.payload, {companyId: request.params.id});
            workcell.addWorkcell(data)
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
                    name: Joi.string().trim().max(100).required(),
                    description: Joi.string().trim().max(100).required()
                }
            },
            auth:{
                strategy: 'jwt'
            }
        }
    },
    // Get workcell data
    {
        method: 'GET',
        path: '/api/v1/companies/{companyId}/workcells/{id}',
        handler: function(request, reply){
            var workcell = new WorkcellService();
            workcell.getWorkcellInfo(request.params.companyId, request.params.id)
            .then(function(result){
                reply(result);
            });
        },
        config:{
            auth:{
                strategy: 'jwt'
            }
        }
    }

];
