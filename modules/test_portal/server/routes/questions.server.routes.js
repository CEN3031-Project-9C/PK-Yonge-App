'use strict';

/**
 * Module dependencies.
 */
var questions = require('../controllers/questions.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/questions/')
    .get(questions.list)
    .post(questions.create);

  // Single article routes
  app.route('/api/questions/:questionId')
    .get(questions.read)
    .put(questions.update)
    .delete(questions.delete);

  // Finish by binding the article middleware
  app.param('questionId', questions.questionByID);
};
