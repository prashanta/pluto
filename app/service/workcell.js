
/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';
import tracer from 'tracer';

var logger = tracer.console();

export default class Workcell{
    constructor(){

    }

    // Add new workcell to a company
    addWorkcell(data){
        return new Promise(function(resolve, reject){
            models.workcell.create({
                tenantId: data.tenantId,
                code: data.code,
                name: data.name,
                description: data.description
            })
            .then(function(result){
                resolve({message: "Workcell added"});
            })
            .catch(function(){
                reject();
            });
        });
    }

    // Get workcells
    getWorkcells(tenantId){
        return new Promise(function(resolve,reject){
            models.workcell.findAll({
                attributes: ['id','code','name','description'],
                where: {tenantId: tenantId, active: 1}
            })
            .then(function(result){
                resolve(result);
            })
            .catch(function(){
                reject();
            });
        });
    }

    // Get workcell's tenantId
    getTenantId(id){
        return new Promise(function(resolve,reject){
            models.workcell.findOne({
                where:{id: id},
                attributes:['tenantId']
            })
            .then(function(result){
                if(result)
                    resolve(result.get('tenantId'));
                else
                    resolve(null);
            })
            .catch(function(error){
                logger.error(error);
                reject();
            });
        });
    }

    // Get workcell information
    getWorkcellInfo(tenantId, id){
        return new Promise(function(resolve,reject){
            models.workcell.findOne({
                attributes: ['code','name','description'],
                where: {id: id, tenantId: tenantId, active: 1}
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
    isWorkcellExist(tenantId, code){
        return new Promise(function(resolve, reject) {
            models.workcell.findAndCountAll({where: {code: code, tenantId: tenantId}})
            .then(function(result){
                if(result.count > 0)
                    resolve(1);
                else
                    resolve(0);
            })
            .catch(function(){
                reject();
            });
        });
    }
}
