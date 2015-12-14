'use strict';

/**
 * Module dependencies.
 */
var user_sessions = require('../controllers/choose-test.server.controller');

module.exports = function (app) {
  // Sessions collection routes
  app.route('/api/user_session/')
    .get(user_sessions.list) //methods in choose-test.server.controller.js
    .post(user_sessions.create);

  // Single user session routes
  app.route('/api/user_session/:user_sessionId')
    .get(user_sessions.read)
	.put(user_sessions.update);
  
  // Finish by binding the article middleware
  app.param('user_sessionId', user_sessions.userSessionById);
};
