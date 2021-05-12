let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const loginDetails = require('./userDetails.json');

chai.should();

chai.use(chaiHttp);

describe('User login', () => {
  it('GivenLoginDetails_whenValid_shouldBeAbleToLogin', (done) => {
    const loginInfo = loginDetails.user.login;
    chai
      .request(server)
      .post('/userLogin')
      .send(loginInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('GivenLoginDetails_whenInValid_shouldnotBeAbleToLogin', (done) => {
    const loginInfo = loginDetails.user.InvalideLogin;
    chai
      .request(server)
      .post('/userLogin')
      .send(loginInfo)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

});