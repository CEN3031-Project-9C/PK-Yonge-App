'use strict';

// Questions controller
angular.module('review-test').controller('ReviewController', [
	'$scope', 
	'$window', 
	'$document',
	'$stateParams', 
	'$location',
	'$modal',
	'$log', 
	'Authentication', 
	'reviewTestService',
	'user_sessionsService', 
	'user_sessionsByUserIDService',
	function ($scope, $window, $document, $stateParams, $location, $modal, $log, Authentication, reviewTestService, user_sessionsService, user_sessionsByUserIDService) {
		$scope.authentication = Authentication;
		
		// If user is not signed in then redirect them back home
		if (!Authentication.user) {
			$location.path('/');
		}

		var user_sessionContainer = {
			user_sessions: []	// we will store retrieved sessions in this array
			// answers: [],	// we will store the user's answers in this array
			// review: [],		// we will store whether or not questions are marked for review in this array
			// notes: []		// we will store the notes for the selected question in this array
		};
		
		$scope.oldTests = {
			tests: []
		};

		//Dealing with question load/display
		$scope.loadSessions = function() {
			user_sessionContainer.user_sessions = user_sessionsByUserIDService.query( // Use query() instead of get() because result will be an array
				{userID: Authentication.user._id},
				function() {
				console.log("user_sessionContainer sessions inside: " + user_sessionContainer.user_sessions);
					reviewTestService.setUser_sessions(user_sessionContainer.user_sessions);		// Save the questions locally
				console.log("user_sessionContainer sessions inside after: " + user_sessionContainer.user_sessions);
					$scope.oldTests.tests = user_sessionContainer.user_sessions;	// Make the questions available to the front-end
					//^^^^^^^^^^^^^^^^^^^^^^^^^CHANGE THIS LINE TO BE THE NAMES OF THE TESTS ASSOCIATED WITH SESSIONS
				}
			);
		};

	}
]);