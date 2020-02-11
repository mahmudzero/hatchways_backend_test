var chai = require('chai');
var chaiHTTP = require('chai-http');
var app = require('../app');

chai.use(chaiHTTP);
chai.should();

// describe('/api/ping', () => {
//   describe('GET /', () => {
//     it('returns success', (done) => {
//       chai.request(app)
//         .get('/api/ping')
//         .end((err, res) => {
//           chai.expect(res.status).to.equal(200)
//           chai.expect(res.body).to.deep.equal({
//             success: true
//           });
//           done();
//         });
//     });
//   });
// });

describe('/api/post', () => {
  const base_url = '/api/posts';
  const ERROR_NAME__INVALID_PARAM = 'invalid_param';
  describe('GET /', () => {
    describe('when tags is not present', () => {
      it('returns an error', (done) => {
        chai.request(app)
          .get(base_url)
          .end((err, res) => {
            chai.expect(res.status).to.equal(400);
            chai.expect(res.body).to.deep.equal({
              error: 'Tags parameter is required'
            });
            done();
          });
      });
    });

    describe('when tags is empty', () => {
      it('returns an error', (done) => {
        chai.request(app)
          .get(base_url + '?tags=')
          .end((err, res) => {
            chai.expect(res.status).to.equal(400);
            chai.expect(res.body).to.deep.equal({
              error: 'Tags parameter is required'
            });
            done();
          });
      });
    });

    describe('when tags is only commas', () => {
      it('returns an error', (done) => {
        chai.request(app)
          .get(base_url + '?tags=,,')
          .end((err, res) => {
            chai.expect(res.status).to.equal(400);
            chai.expect(res.body).to.deep.equal({
              error: 'Tags parameter is required'
            });
            done();
          });
      });
    });

    describe('when tags is valid and sortBy is not present and direction is not present', () => {
      it('returns success', (done) => {
        chai.request(app)
          .get(base_url + '?tags=tech')
          .end((err, res) => {
            chai.expect(res.status).to.equal(200);
            chai.expect(res.body).to.be.an('object');
            done();
          });
      });
    });

    describe('when sortBy is valid', () => {
      it('returns success', (done) => {
        chai.request(app)
          .get(base_url + '?tags=tech&sortBy=likes')
          .end((err, res) => {
            chai.expect(res.status).to.equal(200);
            chai.expect(res.body).to.be.an('object');
            done();
          });
      });
    });

    describe('when sortBy is invalid', () => {
      it('returns an error', (done) => {
        chai.request(app)
          .get(base_url + '?tags=tech&sortBy=like')
          .end((err, res) => {
            chai.expect(res.status).to.equal(400);
            chai.expect(res.body).to.be.deep.equal({
              error: 'sortBy parameter is invalid'
            });
            done();
          });
      });
    });

    describe('when sortBy is empty', () => {
      it('returns an error', (done) => {
        chai.request(app)
          .get(base_url + '?tags=tech&sortBy=')
          .end((err, res) => {
            chai.expect(res.status).to.equal(400);
            chai.expect(res.body).to.be.deep.equal({
              error: 'sortBy parameter is invalid'
            });
            done();
          });
      });
    });

    describe('when direction is empty', () => {
      it('returns an error', (done) => {
        chai.request(app)
          .get(base_url + '?tags=tech&direction=')
          .end((err, res) => {
            chai.expect(res.status).to.equal(400);
            chai.expect(res.body).to.be.deep.equal({
              error: 'direction parameter is invalid'
            });
            done();
          });
      });
    });

    describe('when direction is invalid', () => {
      it('returns an error', (done) => {
        chai.request(app)
          .get(base_url + '?tags=tech&direction=dd')
          .end((err, res) => {
            chai.expect(res.status).to.equal(400);
            chai.expect(res.body).to.be.deep.equal({
              error: 'direction parameter is invalid'
            });
            done();
          });
      });
    });

    describe('when direction is valid', () => {
      it('returns an error', (done) => {
        chai.request(app)
          .get(base_url + '?tags=tech&direction=asc')
          .end((err, res) => {
            chai.expect(res.status).to.equal(200);
            chai.expect(res.body).to.be.an('object');
            done();
          });
      });
    });

  })
});
