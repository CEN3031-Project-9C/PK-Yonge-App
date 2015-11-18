'use strict';

angular.module('test_portal').factory('takeTestService', function() {
	
	var questionContainer = {
		questions: []
	};
	
	questionContainer.setQuestions = function(arrayOfQuestions) {
		if(arrayOfQuestions !== null) {
			questionContainer.questions = arrayOfQuestions;
		} else {
			console.log("The provided array was invalid");
			return;
		}
	};
	
	questionContainer.updateQuestions = function(index, singleQuestion) {
		if(index <= questionContainer.questions.length) {
			questionContainer.questions[index] = singleQuestion;
		} else {
			console.log("index ("+ index + ") was out of bounds!");
			return;
		}
	};
	
	questionContainer.retrieveQuestions = function() {
		return questionContainer.questions;
	};
	
	return (questionContainer);
  
});