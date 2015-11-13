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
		
		$scope.formData = {
			selectedAnswers: []
		};
		
		$scope.currentPage = 0;
		
		$scope.numberOfPages = function() {
			return $scope.testQuestions.questions.length;
		}
		
		//var tempUserSID = sessionService.getSessionID();
		//var tempTestID = sessionService.getTestID();
		
		var testContainer = {
			questions: []	 // we will store retrieved questions in this array
		};
		
		$scope.testQuestions = {
			questions: []
		};
		
		$scope.testContainer = testContainer;
		
		$scope.loadQuestions = function() {
			
			var tempTestID = sessionService.getTestID();
			
			testContainer.questions = questionsByTestIDService.query( // Use query() instead of get() because result will be an array
				{testID: sessionService.getTestID()},
				function() {

					takeTestService.setQuestions(testContainer.questions);
					$scope.testQuestions.questions = testContainer.questions;
					
				}
			);
			
		};
		
		$scope.saveAnswer = function() {
			console.log("$scope.formData ...");
			console.log($scope.formData);
			console.log("$scope.formData.answerChoice ...");
			console.log($scope.formData.answerChoice);
			alert('chose: '+$scope.formData.answerChoice+'');
		};

	}
]);
