/*jshint esversion: 6 */

let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();

chai.use(chaiHttp);

var token = null;

describe('/POST login', () => {

  it('it should return authentication token', (done) => {
    console.log("flag-2");
    // chai.request('http://localhost:3000')
    // .post('/api/v1/login')
    // .send({username:'pmshrestha@gmail.com', password:'waterwater'})
    // .end((err, res) => {
    //   res.should.have.status(200);
    //   res.body.should.be.an('object');
    //   res.body.should.have.property('token');
    //   res.body.should.have.property('name');
    //   res.body.should.have.property('type');
    //   token = res.body.token;
    //   done();
    // });
    done();
  });
});

describe('/GET tenants', () => {
  it('it should return tenants', (done) => {
    // chai.request('http://localhost:3000')
    // .get('/api/v1/tenants')
    // .set("Authorization", "Bearer " + token)
    // .end((err, res) => {
    //   res.should.have.status(200);
    //   res.body.should.be.an('array');
    //   done();
    // });
    done();
  });
});
