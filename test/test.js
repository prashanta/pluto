/*jshint esversion: 6 */

import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../app/server/models';

var should = chai.should();

chai.use(chaiHttp);

var token = null;

describe('Init', function () {
  // CLEAR DATABASE
  before('Clear database', function (done) {
    var _models = Object.keys(models).filter(model=>{ if(model!='sequelize' && model != 'Sequelize') return model; });
    var tasks = [];
    _models.forEach(function(model){
      if(model != 'sequelize' && model != 'Sequelize'){
        tasks.push(models[model].destroy({where:{}, truncate:true, force: true}));
      }
    });
    Promise.all(tasks)
    .then(function (){
      done();
    });
  });

  describe('REST API', function () {

    before(function(){
      require('../app/server/main');
    });

    describe('TENANT API', function () {
      require('./tenants');
    });
    //
    describe('WORKCELL API TEST', function () {
      require('./workcells');
    });

  });

});
