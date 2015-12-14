'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  User_Session = mongoose.model('User_Session');

/**
 * Globals
 */
var user, user_session;

/**
 * Unit tests
 */
describe('User_Session Model Unit Tests:', function () {
  this.timeout(100000);

  beforeEach(function (done) {

    //make a dumby user and a dumby session
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    });

    user.save(function () {
      user_session = new User_Session({
        user_id: user.id,
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

    //Try to save a new user_session
    //Fail if there's an error
    it('should be able to save without problems', function (done) {
      this.timeout(100000);
      return user_session.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    //Try to save without test_id
    //Fails if it saves successfully
    it('should be able to show an error when try to save without test_id', function (done) {
      user_session.test_id = '';

      return user_session.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });
  
  //Cleanup the dumby data
  afterEach(function (done) {
    User_Session.remove().exec(function () {
      User.remove().exec(done);
    });
  });
});