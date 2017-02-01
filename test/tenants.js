/*jshint esversion: 6 */

let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();

chai.use(chaiHttp);

describe('POST tenants', () => {

  it('it should create new tenant', (done) => {
    chai.request('http://localhost:3000')
    .post('/api/v1/tenants')
    .send({
      firstName:'John',
      lastName:'Doe',
      email: 'j@doe.com',
      phone: '1221223',
      password: 'secret123',
      tenantName: 'Doe',
      address1: 'ad',
      address2: 'asd',
      city: 'City',
      country: 'Country',
      postalCode: '12221'
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.all.keys(['name', 'id']);
      done();
    });
  });

  it('it should NOT create new tenant', (done) => {
    chai.request('http://localhost:3000')
    .post('/api/v1/tenants')
    .send({
      firstName:'John',
      lastName:'Doe',
      email: 'j@doe.com',
      phone: '1221223',
      password: 'secret123',
      tenantName: 'Doe',
      address1: 'ad',
      address2: 'asd',
      city: 'City',
      country: 'Country',
      postalCode: '12221'
    })
    .end((err, res) => {
      res.should.have.status(409);
      done();
    });
  });
});

describe('POST login', () => {
  it('it should NOT authenticate user', (done) => {
    chai.request('http://localhost:3000')
    .post('/api/v1/login')
    .send({
      username: 'j@doe.com',
      password: 'secret123ad'
    })
    .end((err, res) => {
      res.should.have.status(401);
      done();
    });
  });

  it('it should authenticate user', (done) => {
    chai.request('http://localhost:3000')
    .post('/api/v1/login')
    .send({
      username: 'j@doe.com',
      password: 'secret123'
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.should.have.all.keys(['token', 'name', 'type']);
      done();
    });
  });
});
