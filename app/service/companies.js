
/*jshint esversion: 6 */

import models from '../models';
import Promise from 'bluebird';

function getCompanies(){
    return new Promise(function(resolve, reject){
        models.company.findAll()
        .then(function(result) {
            resolve(result);
        });
    });

}

export default getCompanies;
