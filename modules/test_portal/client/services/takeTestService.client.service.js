'use strict';
//into the test portal
angular.module('test_portal').factory('takeTestService', function() {
	//initialize questions
	var questionContainer = {
		questions: []
	};
	//populates array with questions
	questionContainer.setQuestions = function(arrayOfQuestions) {
		if(arrayOfQuestions !== null) {
			questionContainer.questions = arrayOfQuestions;
		} else {
			console.log("The provided array was invalid");
			return;
		}
	};
	//keeps track of amount of questions, doesn't allow index above 
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