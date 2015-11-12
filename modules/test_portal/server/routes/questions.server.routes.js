'use strict';

/**
 * Module dependencies.
 */
var questions = require('../controllers/questions.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/questions/')
    .get(questions.list);
    //.post(questions.create);	// not creating questions via the front-end at this point in time

  // Single article routes
  app.route('/api/questions/:questionId')
    .get(questions.read);
	//.put(questions.update);
    //.delete(questions.delete); 	// not deleting questions via the front-end at this point in time

	app.route('/api/questionsByTestID/:testID')
		.get(questions.allQuestionsWithTestID);

  // Finish by binding middleware
  app.param('questionId', questions.questionByID);
  //app.param('testID', questions.allQuestionsWithTestID);
};
