
/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';
import tracer from 'tracer';

var logger = tracer.console();

export default class Machine{
    constructor(){

    }

    // Add new machine to a workcell
    addMachine(data){
        return new Promise(function(resolve, reject){
            models.machine.create({
                workcellId: data.workcellId,
                code: data.code,
                serialNumber: data.serialNumber? data.serialNumber : null,
                model: data.model,
                manufacturer: data.manufacturer? data.manufacturer : null,
                description: data.description? data.description : null,
                type: data.type? data.type : null
            })
            .then(function(result){
                resolve({message: 'Machine added'});
            })
            .catch(function(error){
                if(error) logger.error(error);
                reject();
            });
        });
    }

    // Get workcell machines
    getWorkcellMachines(tenantId, workcellId){
        return new Promise(function(resolve,reject){
            models.machine.findAll({
                attributes: ['umid','code','serialNumber','model','manufacturer','description','type'],                where: {workcellId: workcellId},
                include: [{
                    model: models.workcell,
                    attributes : [],
                    include:[{
                        model: models.tenant,
                        attributes : [],
                        where: {id: tenantId}
                    }]
                }]
            })
            .then(function(result){
                resolve(result);
            })
            .catch(function(error){
                if(error) logger.error(error);
                reject();
            });
        });
    }

    // Get company machines
    getAllMachines(tenantId){
        return new Promise(function(resolve,reject){
            models.workcell.findAll({
                attributes: ['id','code','name','description'],
                where: {tenantId: tenantId, active: 1},
                include: [{model: models.machine, attributes:['umid','code','serialNumber','model','manufacturer','description','type']}]
            })
            .then(function(result){
                resolve(result);
            })
            .catch(function(error){
                if(error) logger.error(error);
                reject();
            });
        });
    }

    // Check if workcell exists
    isMachineExist(tenantId, code){
        return new Promise(function(resolve, reject) {
            models.machine.findAndCountAll({
                where: {code: code},
                include: [{
                    model: models.workcell, attributes:[],
                    include: [{
                        model: models.tenant, attributes:[], where:{id: tenantId}
                    }]
                }]
            })
            .then(function(result){
                if(result.count > 0)
                    resolve(1);
                else
                    resolve(0);
            })
            .catch(function(error){
                if(error) logger.error(error);
                reject();
            });
        });
    }
}
