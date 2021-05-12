let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const userDetails = require('./userDetails.json');

chai.should();

chai.use(chaiHttp);

describe('forgot Password', () => {
  it('GivenEmailId_whenValid_shouldSendMail', (done) => {
    let userInfo = userDetails.user.ValidEmail;
    chai.request(server)
      .put('/forgotPassword')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('GivenEmailId_whenInvalide_shouldNotSendMail', (done) => {
    let userInfo = userDetails.user.ValidEmail;
    chai.request(server)
      .put('/forgotPassword')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  
  it('GivenEmailId_whenInvalide_shouldNotSendMail', (done) => {
    let userInfo = userDetails.user.PasswordInvalideEmail;
    chai.request(server)
      .put('/forgotPassword')
      .send(userInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
})