'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  User_Session = mongoose.model('User_Session'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, user_session;

/**
 * User_Session routes tests
 */
describe('User Session CRUD tests', function () {
  this.timeout(10000);

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {

    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new user session
    user.save(function () {
      user_session = {
        user_id: user.id,
        test_id: '525a8422f6d0f87f0e407a33',
        time: 0,
        complete: false,
        user_notepad: String[10],
        user_answer: String[10],
        review: Boolean[10]
      };

      done();
    });
  });

  it('should be able to save a user_session', function (done) {
    // Get the userId
    var userId = user.id;

    // Save a new user_session
    agent.post('/api/user_session')
      .send(user_session)
      .expect(200)
      .end(function (userSessionSaveErr, userSessionSaveRes) {
        // Handle user_session save error
        if (userSessionSaveErr) {
          return done(userSessionSaveErr);
        }

        // Get a list of articles
        agent.get('/api/user_session')
          .end(function (userSessionGetErr, userSessionGetRes) {
            // Handle user_session save error
            if (userSessionGetErr) {
              return done(userSessionGetErr);
            }

            // Get articles list
            var user_sessions = userSessionGetRes.body;

            // Set assertions
            (user_sessions[0].user_id).should.equal(userId);
            (user_sessions[0].test_id).should.match('525a8422f6d0f87f0e407a33');

            // Call the assertion callback
            done();
          });
      });
  });

  // it('should be able to save a user_session if logged in', function (done) {
  //   agent.post('/api/auth/signin')
  //     .send(credentials)
  //     .expect(200)
  //     .end(function (signinErr, signinRes) {
  //       // Handle signin error
  //       if (signinErr) {
  //         return done(signinErr);
  //       }

  //       // Get the userId
  //       var userId = user._id;

  //       // Save a new user_session
  //       agent.post('/api/user_sessions')
  //         .send(user_session)
  //         .expect(200)
  //         .end(function (userSessionSaveErr, userSessionSaveRes) {
  //           // Handle user_session save error
  //           if (userSessionSaveErr) {
  //             return done(userSessionSaveErr);
  //           }

  //           // Get a list of articles
  //           agent.get('/api/user_sessions')
  //             .end(function (userSessionGetErr, userSessionGetRes) {
  //               // Handle user_session save error
  //               if (userSessionGetErr) {
  //                 return done(userSessionGetErr);
  //               }

  //               // Get articles list
  //               var user_sessions = userSessionGetRes.body;

  //               // Set assertions
  //               (user_sessions[0].user._id).should.equal(userId);
  //               (user_sessions[0].test_id).should.match('525a8422f6d0f87f0e407a33');

  //               // Call the assertion callback
  //               done();
  //             });
  //         });
  //     });
  // });

  // it('should not be able to save an user_session if not logged in', function (done) {
  //   agent.post('/api/user_sessions')
  //     .send(user_session)
  //     .expect(403)
  //     .end(function (articleSaveErr, articleSaveRes) {
  //       // Call the assertion callback
  //       done(articleSaveErr);
  //     });
  // });

  // it('should not be able to save an user_session if no title is provided', function (done) {
  //   // Invalidate title field
  //   user_session.title = '';

  //   agent.post('/api/auth/signin')
  //     .send(credentials)
  //     .expect(200)
  //     .end(function (signinErr, signinRes) {
  //       // Handle signin error
  //       if (signinErr) {
  //         return done(signinErr);
  //       }

  //       // Get the userId
  //       var userId = user.id;

  //       // Save a new user_session
  //       agent.post('/api/user_sessions')
  //         .send(user_session)
  //         .expect(400)
  //         .end(function (articleSaveErr, articleSaveRes) {
  //           // Set message assertion
  //           (articleSaveRes.body.message).should.match('Title cannot be blank');

  //           // Handle user_session save error
  //           done(articleSaveErr);
  //         });
  //     });
  // });

  it('should be able to update a user_session', function (done) {
    // Get the userId
    var userId = user.id;

    // Save a new user_session
    agent.post('/api/user_session')
      .send(user_session)
      .expect(200)
      .end(function (userSessionSaveErr, userSessionSaveRes) {
        // Handle user_session save error
        if (userSessionSaveErr) {
          return done(userSessionSaveErr);
        }

        // Update user_session title
        user_session.time = 100;

        // Update an existing user_session
        agent.put('/api/user_session/' + userSessionSaveRes.body._id)
          .send(user_session)
          .expect(200)
          .end(function (userSessionUpdateErr, userSessionUpdateRes) {
            // Handle user_session update error
            if (userSessionUpdateErr) {
              return done(userSessionUpdateErr);
            }

            // Set assertions
            (userSessionUpdateRes.body._id).should.equal(userSessionSaveRes.body._id);
            (userSessionUpdateRes.body.time).should.match(100);

            // Call the assertion callback
            done();
          });
      });
  });

  it('should be able to get a list of user sessions', function (done) {
    // Create new user_session model instance
    var userSessionObj = new User_Session(user_session);

    // Save the user_session
    userSessionObj.save(function () {
      // Request articles
      request(app).get('/api/user_session')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single user_session', function (done) {
    // Create new user_session model instance
    var userSessionObj = new User_Session(user_session);

    // Save the user_session
    userSessionObj.save(function () {
      request(app).get('/api/user_session/' + userSessionObj.id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('user_id', user_session.user_id);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single user_session with an invalid Id', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/user_session/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Session is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single user_session which doesnt exist', function (done) {
    // This is a valid mongoose Id but a non-existent user_session
    request(app).get('/api/user_session/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No user_session with that ID has been found');

        // Call the assertion callback
        done();
      });
  });

  //Never Deleting user sessions currently

  // it('should be able to delete an user_session if signed in', function (done) {
  //   agent.post('/api/auth/signin')
  //     .send(credentials)
  //     .expect(200)
  //     .end(function (signinErr, signinRes) {
  //       // Handle signin error
  //       if (signinErr) {
  //         return done(signinErr);
  //       }

  //       // Get the userId
  //       var userId = user.id;

  //       // Save a new user_session
  //       agent.post('/api/user_sessions')
  //         .send(user_session)
  //         .expect(200)
  //         .end(function (userSessionSaveErr, userSessionSaveRes) {
  //           // Handle user_session save error
  //           if (userSessionSaveErr) {
  //             return done(userSessionSaveErr);
  //           }

  //           // Delete an existing user_session
  //           agent.delete('/api/user_sessions/' + userSessionSaveRes.body._id)
  //             .send(user_session)
  //             .expect(200)
  //             .end(function (userSessionDeleteErr, userSessionDeleteRes) {
  //               // Handle user_session error error
  //               if (userSessionDeleteErr) {
  //                 return done(userSessionDeleteErr);
  //               }

  //               // Set assertions
  //               (userSessionDeleteRes.body._id).should.equal(userSessionSaveRes.body._id);

  //               // Call the assertion callback
  //               done();
  //             });
  //         });
  //     });
  // });

  // it('should not be able to delete an user_session if not signed in', function (done) {
  //   // Set user_session user
  //   user_session.user = user;

  //   // Create new user_session model instance
  //   var articleObj = new User_Session(user_session);

  //   // Save the user_session
  //   articleObj.save(function () {
  //     // Try deleting user_session
  //     request(app).delete('/api/user_sessions/' + articleObj._id)
  //       .expect(403)
  //       .end(function (articleDeleteErr, articleDeleteRes) {
  //         // Set message assertion
  //         (articleDeleteRes.body.message).should.match('User is not authorized');

  //         // Handle user_session error error
  //         done(articleDeleteErr);
  //       });

  //   });
  // });

  afterEach(function (done) {
    //User.remove().exec(function () {
      User_Session.remove().exec(done);
    //});
  });
});
