//Service used to store grading information for communication with other modules
'use strict';

angular.module('review-test').factory('gradeTestService', function(sessionServiceV3, takeTestService) {
	
	var gradingContainer = {
		testQuestions: {},
		userAnswers: {}
	};
		
	gradingContainer.setQuestions = function(questionsArray) {
		gradingContainer.testQuestions = questionsArray;
	};
	
	gradingContainer.getQuestions = function() {
		return gradingContainer.testQuestions;
	};
	
	gradingContainer.setUserAnswers = function(userAnswersArray) {
		gradingContainer.userAnswers = userAnswersArray;
	};
	
	gradingContainer.getUserAnswers = function() {
		return gradingContainer.userAnswers;
	};
	
	// Make the properties and functions of this service available
	return (gradingContainer);

});