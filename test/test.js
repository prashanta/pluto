/*jshint esversion: 6 */

import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../app/server/models';

var should = chai.should();

chai.use(chaiHttp);

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

    describe('Tenant API', function () {
      console.log("flag-1");
      require('./tenants');
    });

    describe('Samples', function() {
      it('should list ALL blobs on /blobs GET', function (){
        console.log("flag-3");
        return null;
      });

      it('should list a SINGLE blob on /blob/<id> GET', function (done){
        setTimeout(function () {
          done();
        }, 2000);
      });

      it('should add a SINGLE blob on /blobs POST', function (done){
        setTimeout(function () {
          done();
        }, 2000);
      });

      it('should update a SINGLE blob on /blob/<id> PUT', function (done){
        done();
      });

      it('should delete a SINGLE blob on /blob/<id> DELETE', function (done){
        done();
      });
    });


  });
});
