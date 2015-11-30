'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  User_session = mongoose.model('User_session');

/**
 * Globals
 */
var user, user_session;

/**
 * Unit tests
 */
describe('User Session Model Unit Tests:', function () {
  this.timeout(10000);

  beforeEach(function (done) {
    user.save(function () {
      user_session = new User_session({
        test_id: '525a8422f6d0f87f0e407a33',
        time: 300,
        complete: false,
        user_notepad: String[10],
        user_answer: String[10],
        review: Boolean[10]
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      return user_session.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without test', function (done) {
      user_session.test_id = '';

      return user_session.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save with a negative time', function (done) {
      user_session.time = -1;

      return user_session.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    User_session.remove().exec(done);
  });
});
