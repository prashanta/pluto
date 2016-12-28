
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
            this.isMachineExist(data.workcellId, data.code)
            .then(function(result){
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
                    resolve("Machine added");
                })
                .catch(function(){
                    reject('Could not add machine');
                });
            })
            .catch(function(error){
                reject(error);
            });

        }.bind(this));
    }

    // Get workcell machines
    getWorkcellMachines(workcellId){
        return new Promise(function(resolve,reject){
            models.machine.findAll({
                attributes: ['code','serialNumber','model','manufacturer','description','type'],
                where: {workcellId: workcellId, active: 1}
            })
            .then(function(result){
                resolve(result);
            })
            .catch(function(error){
                logger.log(error);
                reject('something went wrong');
            });
        });
    }

    // Get company machines
    getCompanyMachines(companyId){
        return new Promise(function(resolve,reject){
            models.workcell.findAll({
                attributes: ['id','code','name','description'],
                where: {companyId: companyId, active: 1},
                include: [{model: models.machine, attributes:['id','code','serialNumber','model','manufacturer','description','type']}]
            })
            .then(function(result){
                resolve(result);
            })
            .catch(function(error){
                logger.log(error);
                reject('something went wrong');
            });
        });
    }

    // Get workcell information
    getWorkcellInfo(companyId, id){
        return new Promise(function(resolve,reject){
            models.workcell.findOne({
                attributes: ['code','name','description'],
                where: {id: id, companyId: companyId, active: 1}
            })
            .then(function(result){
                resolve(result);
            })
            .catch(function(error){
                logger.log(error);
                reject('something went wrong');
            });
        });
    }

    // Check if workcell exists
    isMachineExist(workcellId, code){
        return new Promise(function(resolve, reject) {
            models.machine.findAndCountAll({where: {code: code, workcellId: workcellId}})
            .then(function(result){
                if(result.count > 0)
                    reject("Machine already exist");
                else
                    resolve();
            })
            .catch(function(error){
                reject(error);
            });
        });
    }
}
