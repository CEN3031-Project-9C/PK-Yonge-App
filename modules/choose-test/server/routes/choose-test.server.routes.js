'use strict';

/**
 * Module dependencies.
 */
var rest = require('../controllers/choose-test.server.controller');

module.exports = function (app) {
  // Sessions collection routes
  app.route('/api/user_session/')
    .get(rest.list)
    .post(rest.create);

  // Single user session routes
  app.route('/api/user_session/:user_sessionId')
    .get(rest.read);
  //  .put(sessions.update)

  // Finish by binding the article middleware
  app.param('user_sessionId', rest.user_sessionByID);
};
