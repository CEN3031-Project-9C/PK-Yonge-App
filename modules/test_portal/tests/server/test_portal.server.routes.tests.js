'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  Question = mongoose.model('Question'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, question;

/**
 * Article routes tests
 */
describe('Question CRUD tests', function () {
  this.timeout(100000);

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  it('should be able to get a list of questions', function (done) {
    // Request questions
  	request(app).get('/api/questions')
    .end(function (req, res) {
      // Set assertion
      res.body.should.be.instanceof(Array).and.have.lengthOf(7);

      // Call the assertion callback
      done();
    });
  });

  it('should be able to get a single question', function (done) {
  	request(app).get('/api/questions/561cb16ae4b060b59d7cc0aa')
    .end(function (req, res) {
      // Set assertion
      res.body.should.be.instanceof(Object).and.have.property('test_id', "561d199f41c840c42134a825");

      // Call the assertion callback
      done();
    });
  });

  it('should return proper error for single question with an invalid Id', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/questions/random')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Question is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single question which doesnt exist', function (done) {
    // This is a valid mongoose Id but a non-existent question
    request(app).get('/api/questions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No question with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });
});
