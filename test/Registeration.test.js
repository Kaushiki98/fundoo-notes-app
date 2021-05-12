let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const registrationDetails = require('./userDetails.json');

chai.should();

chai.use(chaiHttp);

describe('userRegistration', () => {
  it('GivenUserDetails_WhenValid_ShouldSaveInDatabase', (done) => {
    const userInfo = registrationDetails.user.userRegistration;
      chai.request(server)
      .post('/userRegistration')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('GivenUserDetails_whenInvalide_shouldNotSaveInDB', (done) => {
    const userInfo = registrationDetails.user.InvalideUserRegistration;
    chai.request(server)
      .post('/InvalideUserRegistration')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
})
