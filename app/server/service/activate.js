
/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';
import tracer from 'tracer';

var logger = tracer.console();


// Generatate machine activation code
export function genMachineActivationCode(){
  var totCount = 1;
  var loop = new Promise(function(resolve, reject){
    var code = genRandomNumber();
    models.machineActivate.findAndCountAll({where: {code: code}})
    .then(function(result){
      totCount++;
      logger.log(result);
      if(result.count === 0)
      resolve(code);
      else if(totCount > -1)
      reject();
      else
      return loop();
    }.bind(this));
  }.bind(this));

  return loop;
}

// Generate random number
export function genRandomNumber(){
  var min = 100000, max = 999999;
  return Math.floor(Math.random() * (max - min)) + min;
}

// Store machine activation code in database
export function storeMachineActivationCode(machineId, code){
  return new Promise(function(resolve, reject){
    var date = new Date();
    var exp = new Date(date.getTime() + 3600000); // expires in one hour
    models.machineActivate.create({
      machineId: machineId,
      code: code,
      expiresOn: exp
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

// Validate machine activation code
export function validateMachineActivationCode(code){
  return new Promise(function(resolve, reject){
    models.machineActivate.findOne({
      where:{code: code},
      attributes: ['id','machineId', 'expiresOn']
    })
    .then(function(result){
      if(result){
        var exp = new Date(result.get('expiresOn'));
        var now = new Date();
        if(now > exp){
          logger.error("Activation code has expired.");
          resolve(null);
        }
        else{
          resolve({machineId: result.get('machineId')});
          //result.destroy();
        }
      }
      else
      resolve(null);
    })
    .catch(function(error){
      if(error) logger.error(error);
      reject();
    });
  });
}
