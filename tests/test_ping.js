var chai = require('chai');
var chaiHTTP = require('chai-http');
var app = require('../app');

chai.use(chaiHTTP);
chai.should();

describe('/api/ping', () => {
  describe('GET /', () => {
    it('returns success', (done) => {
      chai.request(app)
        .get('/api/ping')
        .end((err, res) => {
          chai.expect(res.status).to.equal(200)
          chai.expect(res.body).to.deep.equal({
            success: true
          });
          done();
        });
    });
  });
});
