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
	function ($scope, $stateParams, $location, Authentication, sessionService, questionsService, questionsByTestIDService) {
	  	
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}
		
		// get the session ID and test ID
		var tempUserSID = sessionService.getSessionID();
		var tempTestID = sessionService.getTestID();
		
		// for front-end display (testing) purposes
		$scope.userSID = tempUserSID;
		$scope.testID = tempTestID;
		
		var testContainer = {
			questions: []	 // we will store retrieved questions in this array
		};
		
		$scope.loadQuestions = function() {
			
			testContainer.questions = questionsByTestIDService.query( // Use query() instead of get() because result will be an array
				{testID: $scope.testID},
				function() {}
			);
			
			// For testing purposes
			console.log(testContainer.questions);

		};
		
		$scope.testQuestions = testContainer.questions;

	}
]);
