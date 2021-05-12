let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const userDetails = require('./userDetails.json');

chai.should();

chai.use(chaiHttp);

describe('userRegistration', () => {
  it('GivenUserDetails_WhenValid_ShouldSaveInDatabase', (done) => {
    let userInfo = userDetails.user.createUser;
      chai.request(server)
      .post('/userRegistration')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('GivenUserDetails_whenInvalide_shouldNotSaveInDB', (done) => {
    let userInfo = userDetails.user.InvalideDetails;
    chai.request(server)
      .post('/userRegistration')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  
  it('GivenUserDetails_whenInvalide_shouldNotSaveInDB', (done) => {
    let userInfo = userDetails.user.EmailMissing;
    chai.request(server)
      .post('/userRegistration')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
})
