
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
            this.isWorkcellExist(data.companyId, data.code)
            .then(function(result){
                models.workcell.create({
                    companyId: data.companyId,
                    code: data.code,
                    name: data.name,
                    description: data.description
                })
                .then(function(result){
                    resolve("Workcell added");
                })
                .catch(function(){
                    reject('Could not add workcell');
                });
            })
            .catch(function(error){
                reject(error);
            });

        }.bind(this));
    }

    // Get workcells
    getWorkcells(companyId){
        return new Promise(function(resolve,reject){
            models.workcell.findAll({
                attributes: ['code','name','description'],
                where: {companyId: companyId, active: 1}
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
    isWorkcellExist(companyId, code){
        return new Promise(function(resolve, reject) {
            models.workcell.findAndCountAll({where: {code: code, companyId: companyId}})
            .then(function(result){
                if(result.count > 0)
                    reject("Workcell already exist");
                else
                    resolve();
            })
            .catch(function(error){
                reject(error);
            });
        });
    }
}
