const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

describe('Firebase Functions', () => {
  describe('POST /api_v2/api/login', () => {
    it('should return 200 OK and user data on successful login', (done) => {
      chai.request(app)
        .post('/api_v2/api/login')
        .send({ email: 'user@example.com', password: 'password' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('uid');
          res.body.should.have.property('email');
          done();
        });
    });

    it('should return 401 Unauthorized on invalid credentials', (done) => {
      chai.request(app)
        .post('/api_v2/api/login')
        .send({ email: 'user@example.com', password: 'wrongpassword' })
        .end((err, res) => {
          res.should.have.status(401);
          res.text.should.equal('Invalid email or password');
          done();
        });
    });
  });

  describe("POST /api_v2/kyc/user")}