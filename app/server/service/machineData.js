
/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';
import tracer from 'tracer';
import _config from 'config';
const config = _config.default;

var logger = config.logger;

export function addMachineData(data){
  return new Promise(function(resolve, reject){
    models.machineData.create({
      timestamp: data.timestamp,
      machineId: data.machineId,
      command: data.command,
      output: data.output
    })
    .then(function(result){
      resolve();
    })
    .catch(function(error){
      if(error) logger.error(error);
      reject();
    });
  });
}

export function getMachineData(machineId, from, to){
  return new Promise(function(resolve, reject){
  });
}
