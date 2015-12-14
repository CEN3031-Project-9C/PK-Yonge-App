'use strict';

/**
 * Module dependencies.
 */
var user_sessions = require('../controllers/review-test.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/user_sessions/')
    .get(user_sessions.list);

  // Single article routes
  app.route('/api/user_sessions/:user_sessionId')
    .get(user_sessions.read);

	app.route('/api/user_sessionsByUserID/:userID')
		.get(user_sessions.allUser_sessionsWithUserID);

  // Finish by binding middleware
  app.param('user_sessionId', user_sessions.user_sessionByID);
};
