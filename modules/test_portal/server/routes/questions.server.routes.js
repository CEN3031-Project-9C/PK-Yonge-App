'use strict';

/**
 * Module dependencies.
 */
var questions = require('../controllers/questions.server.controller');
var user_sessions = require('../controllers/choose-test.server.controller');


module.exports = function (app) {
	
	// Articles collection routes
	app.route('/api/questions/')
    	.get(questions.list); //method in questions.server.controller

	// Single article routes
	app.route('/api/questions/:questionId')
    	.get(questions.read);

	app.route('/api/questionsByTestID/:testID')
		.get(questions.allQuestionsWithTestID);
	
	app.route('/api/user_session/:user_sessionId')
		.get(user_sessions.read)
		.put(user_sessions.update);
	
	// Finish by binding middleware
	app.param('questionId', questions.questionByID);
	app.param('user_sessionId', user_sessions.userSessionById);
	
};
