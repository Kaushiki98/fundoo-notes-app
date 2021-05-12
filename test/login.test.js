let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const userDetails = require('./userDetails.json');

chai.should();

chai.use(chaiHttp);

describe('User login', () => {
  it('GivenLoginDetails_whenValid_shouldBeAbleToLogin', (done) => {
    let userInfo = userDetails.user.loginUser;
    chai.request(server)
      .post('/userLogin')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('GivenLoginDetails_whenInValid_shouldnotBeAbleToLogin', (done) => {
    let userInfo = userDetails.user.InvalideLoginDetails;
    chai.request(server)
      .post('/userLogin')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  
  it('GivenLoginDetails_whenInValid_shouldnotBeAbleToLogin', (done) => {
    let userInfo = userDetails.user.MissingEmail;
    chai.request(server)
      .post('/userLogin')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});