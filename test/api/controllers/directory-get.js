var should = require('should');
var request = require('supertest');
const server = require('../../../app');
// const nock = require('nock')
const querystring = require('querystring')
const assert = require('assert')

// nock('http://localhost:8080', {allowUnmocked: true})
// nock('http://localhost:10010', {allowUnmocked: true})
// nock('http://iped-queue')
//   .persist()
//   .get(/.*/)
//   .reply(400, {message: 'not found'})

describe('controllers', function() {
  describe('directory', function() {
    describe('GET', function() {
      it('should confirm allowed path', function(done) {
        request(server)
          .get('/v2/directory')
          .query({path: '/operacoes/celulares/'})
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.subroutines.should.eql(
              ['mkdvd', 'mv']
            );
            done();
        });
      });
    });
  });
});
