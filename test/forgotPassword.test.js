let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const EmailId = require('./userDetails.json');

chai.should();

chai.use(chaiHttp);

describe('User login', () => {
  it('GivenEmailId_whenValid_shouldSendMail', (done) => {
    const PasswordInfo = EmailId.user.forgotPassword;
    chai
      .request(server)
      .put('/forgotPassword')
      .send(PasswordInfo)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('GivenEmailId_whenInvalide_shouldNotSendMail', (done) => {
    const PasswordInfo = EmailId.user.forgotPasswordInvalideEmail;
    chai
      .request(server)
      .put('/forgotPassword')
      .send(PasswordInfo)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
})