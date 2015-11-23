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
			answer: undefined
		};
		
		$scope.numberOfPages = function() {
			return $scope.testQuestions.questions.length;
		};
		
		var testContainer = {
			questions: [],	// we will store retrieved questions in this array
			answers: []	// we will store the user's answers in this array
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

		//Next 2 methods are from code duplicated in the body of BOTH previousQuestion and nextQuestion, extracted to be their own methods
		//(if you ever were to edit the code, reduces chance of updating code in one place but missing where it's duplicated elsewhere)
		$scope.saveAnswer = function() 
		{			
			testContainer.answers[$scope.currentPage] = $scope.formData.answer;						
			// For testing purposes
			/*
			console.log("testContainer...");
			console.log(testContainer);
			console.log("testContainer.answers...");
			console.log(testContainer.answers);
			console.log("$scope.formData.answer...");
			console.log($scope.formData.answer);
			*/	
		};
		$scope.reloadSaved = function()
		{

			$scope.formData.answer = testContainer.answers[$scope.currentPage];

			//^Previously this statement was in the below "if," but I don't think it needs to be. value will just be "undefined" if nothing has been entered.
			/*
			 if(testContainer.answers[$scope.currentPage] !== 0) { //************I think it goes in here every time. (if they haven't saved an answer, I believe it's undefined rather than 0)
			 	$scope.formData.answer = testContainer.answers[$scope.currentPage]; // Retrieve the user's answer for this question
			 } 
			 else{ //never enters
			 	$scope.formData.answer = "";	// Leave selection blank if user has not chosen (and saved) an answer yet
			 }

			/*test to show that it's undefined when no answer has been filled out
			if(testContainer.answers[$scope.currentPage] === undefined)
			{
				console.log("undefined at " + ($scope.currentPage+1));
			}
			*/

			// To-do: save this answer to the DB on question switch

			//insert code here to also reload things like notepad & marking for review, once those are set up in v3-test-portal-features branch
		};

		$scope.previousQuestion = function() {
			$scope.saveAnswer();
			$scope.currentPage = $scope.currentPage - 1;	// Update pagination (show requested question)	
			$scope.reloadSaved();
		};
		
		$scope.nextQuestion = function() {
			$scope.saveAnswer();
			$scope.currentPage = $scope.currentPage+1;	// Update pagination (show requested question)
			$scope.reloadSaved();			
		};

		$scope.checkUnanswered = function() {
			var unanswered = ""; //String to represent all of the unanswered questions so they can be reported to the user.
			for (var i = 0; i < $scope.testQuestions.questions.length; i++)
			{
				if (testContainer.answers[i] === undefined)
				{
					unanswered += (i+1);
					if (i !== $scope.testQuestions.questions.length-1)
					{
						unanswered += ", ";
					}
				}
			}
			if (unanswered !== "") //If the string is not empty, then they DO have unanswered questions.
			{ //Display confirmation box letting them know which questions they haven't answered and making them choose whether or not to proceed
				var proceed = confirm("You have yet to select an answer for the following questions: \n" + unanswered + ". \n Are you sure you want to submit?");
				if (proceed === true) 
				{
					return true; //They want to submit anyways.
				} 
				else 
				{
					return false; //They want to cancel & go back to their test.
				}
			}
			else
			{
				return true; //If the string WAS empty, then they don't need the confirmation box. proceed regardless
			}
		};

		$scope.submitTest = function() {
			$scope.saveAnswer(); //If the user has selected an answer for that question, we want it to be stored.
			
			var proceed = $scope.checkUnanswered(); //Check whether they have unanswered questions.
			////Returns true if they had no unanswered questions, or if they DID have unanswered questions but chose to continue

			if (proceed === true) 
			{
				// do test-ending things(save back to DB?)
				console.log("submitted test");
			}
			else
			{
				console.log("cancel & go back to test");
				//continue with test
			}
		};

	}
]);