'use strict';

// Articles controller
angular.module('test_portal').controller('QuestionsController', [
	'$scope', 
	'$stateParams', 
	'$location', 
	'Authentication', 
	'questionsService', 
	'sessionService',
	function ($scope, $stateParams, $location, Authentication, questionsService, sessionService) {
	  	
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}
			
		// get the session ID and test ID
		var userSID = sessionService.getSessionID();
		var testID = sessionService.getTestID();
		
		// for front-end display (testing) purposes
		$scope.userSID = userSID;
		$scope.testID = testID;
		
		var testContainer = {
			questions: []	 // we will push each retrieved question (via query) onto this
		};
		
		// Find a list of questions
		$scope.find = function () {
		  	$scope.questions = questionsService.query(); //Get singular, query is array.
		};
		
		// Find an existing question (based off of questionId)
		$scope.findOne = function () {
			$scope.questions = questionsService.get({
				questionId: $stateParams.questionId
		  	});
		};
		
	}
]);
