/*jshint esversion: 6 */

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

var token = null;


describe('WORKCELL', () => {

  before(function(done){
    chai.request('http://localhost:3000')
    .post('/api/v1/login')
    .send({
      username: 'j@doe.com',
      password: 'secret123'
    })
    .end((err, res) => {
      token = res.body.token;
      done();
    });
  });

  describe('POST workcells', () => {
    it('it should create new workcell', (done) => {
      chai.request('http://localhost:3000')
      .post('/api/v1/workcells')
      .set({'Authorization' : `Bearer ${token}`})
      .send({code:'WC01', name:'Workcell-01'})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });

    it('it should NOT create new workcell', (done) => {
      chai.request('http://localhost:3000')
      .post('/api/v1/workcells')
      .set({'Authorization' : `Bearer ${token}`})
      .send({code:'WC01', name:'Workcell-01'})
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
    });
  });

  describe('GET workcells', () => {
    it('it should list workcells', (done) => {
      chai.request('http://localhost:3000')
      .get('/api/v1/workcells')
      .set({'Authorization' : `Bearer ${token}`})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body.should.have.deep.property('[0].code', 'WC01');
        res.body.should.have.deep.property('[0].name', 'Workcell-01');
        done();
      });
    });
  });
});
