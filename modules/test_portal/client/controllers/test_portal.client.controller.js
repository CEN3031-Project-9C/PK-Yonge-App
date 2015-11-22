'use strict';

// Questions controller
angular.module('test_portal').controller('QuestionsController', [
	'$scope', 
	'$stateParams', 
	'$location', 
	'Authentication', 
	'sessionService',
	'questionsService', 
	'questionsByTestIDService',
	'takeTestService',
	function ($scope, $stateParams, $location, Authentication, sessionService, questionsService, questionsByTestIDService, takeTestService) {
	  	
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}
				
		$scope.currentPage = 0;
		
		$scope.formData = {
			answer: String
		};
		
		$scope.numberOfPages = function() {
			return $scope.testQuestions.questions.length;
		};
		
		var testContainer = {
			questions: [],	// we will store retrieved questions in this array
			answers: []		// we will store the user's answers in this array
		};
		
		$scope.testQuestions = {
			questions: []
		};
				
		$scope.loadQuestions = function() {
						
			testContainer.questions = questionsByTestIDService.query( // Use query() instead of get() because result will be an array
				{testID: sessionService.getTestID()},
				function() {

					takeTestService.setQuestions(testContainer.questions);
					$scope.testQuestions.questions = testContainer.questions;
					
				}
			);
			
		};
		
		$scope.saveAnswer = function() {
			
			testContainer.answers[$scope.currentPage] = $scope.formData.answer;
			
			/*
			// For testing purposes
			console.log("testContainer...");
			console.log(testContainer);
			console.log("testContainer.answers...");
			console.log(testContainer.answers);
			console.log("$scope.formData.answer...");
			console.log($scope.formData.answer);
			*/
			
		};

		$scope.previousQuestion = function() {
			$scope.saveAnswer();
			$scope.currentPage = $scope.currentPage - 1;	// Update pagination (show requested question)
		
			if(testContainer.answers[$scope.currentPage] !== 0) {
				$scope.formData.answer = testContainer.answers[$scope.currentPage]; // Retrieve the user's answer for this question
			} else {
				$scope.formData.answer = "";	// Leave selection blank if user has not chosen (and saved) an answer yet
			}
			
			// To-do, save this answer to the DB on question switch
		
		};
		
		$scope.nextQuestion = function() {
			$scope.saveAnswer();
			$scope.currentPage = $scope.currentPage + 1;	// Update pagination (show requested question)
			
			if(testContainer.answers[$scope.currentPage] !== 0) {
				$scope.formData.answer = testContainer.answers[$scope.currentPage]; // Retrieve the user's answer for this question
			} else {
				$scope.formData.answer = "";	// Leave selection blank if user has not chosen (and saved) an answer yet
			}
			
			// To-do, save this answer to the DB on question switch
			
		};

		$scope.submitTest = function() {
			//maybe an "are you sure?" alert
			//save back to DB
		};

	}
]);
