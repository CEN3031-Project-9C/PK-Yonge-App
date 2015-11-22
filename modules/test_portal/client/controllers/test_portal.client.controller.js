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
			answers: [],	// we will store the user's answers in this array
			review: []		// we will store whether or not questions are marked for review in this array
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

		$scope.markForReview = function() {
			testContainer.review[$scope.currentPage] = $scope.formData.review;
		};

		//Next 2 methods are code in the body of BOTH previousQuestion and nextQuestion, extracted to be their own methods
		//(if you ever were to edit the code, reduces chance of updating code in one place but not where it's duplicated elsewhere)
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

			// To-do, save this answer to the DB on question switch
		};
		$scope.reloadSaved = function()
		{
			if(testContainer.answers[$scope.currentPage] !== 0) {
				$scope.formData.answer = testContainer.answers[$scope.currentPage]; // Retrieve the user's answer for this question
			} else {
				$scope.formData.answer = "";	// Leave selection blank if user has not chosen (and saved) an answer yet
			}
			if(testContainer.review[$scope.currentPage] !== 0) {
				$scope.formData.review = testContainer.review[$scope.currentPage]; // Retrieve the user's answer for this question
			} else {
				$scope.formData.review = "";	// Leave selection blank if user has not chosen (and saved) an answer yet
			}

			console.log($scope.formData.answer);

			//insert code here to also reload marking for notepad , once that is set up
		};

		$scope.previousQuestion = function() {
			$scope.saveAnswer();
			$scope.currentPage = $scope.currentPage - 1;	// Update pagination (show requested question)	
			$scope.reloadSaved();
		};
		
		$scope.nextQuestion = function() {
			$scope.saveAnswer();
			$scope.currentPage = $scope.currentPage + 1;	// Update pagination (show requested question)
			$scope.reloadSaved();			
		};

		$scope.submitTest = function() {
			//maybe an "are you sure?" alert
			//check to see if any answers[] positions are empty & let them know they have unanswered questions
			//save back to DB
		};

	}
]);
